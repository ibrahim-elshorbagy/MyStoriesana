<?php

namespace App\Http\Controllers\Frontend\Order;

use App\Http\Controllers\Controller;
use App\Models\Admin\SiteSetting\DeliveryOption;
use App\Models\Admin\SiteSetting\SiteSetting;
use App\Models\Admin\Story\Story;
use App\Models\Order\Order;
use App\Models\Order\Payment;
use App\Models\User;
use App\Http\Controllers\Frontend\Cart\CartController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use App\Services\StripeService;
use App\Http\Resources\Order\OrderResource;
use App\Models\Admin\SiteSetting\Discount;
use App\Models\Admin\SiteSetting\DiscountUsage;
use App\Models\Order\Cart;
use Inertia\Inertia;
use App\Notifications\Orders\Creating\NotifyAdmin;
use App\Notifications\Orders\Creating\OrderConfirmation;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Notification;
use App\Notifications\Orders\Status\PaymentStatusUpdate;

class OrderController extends Controller
{
  protected $stripeService;

  private function resolveOrderLocale(Order $order): string
  {
    $itemLanguage = $order->orderItems()->value('language');

    return match ($itemLanguage) {
      'arabic', 'ar' => 'ar',
      'german', 'de', 'deutsch' => 'de',
      default => 'en',
    };
  }

  public function __construct(StripeService $stripeService)
  {
    $this->stripeService = $stripeService;
  }

  // Show the multi-step form
  public function create(Request $request)
  {
    $storyId = $request->query('story_id');
    $story = null;

    if ($storyId) {
      $story = Story::with('category')->findOrFail($storyId);
      $story = [
        'id' => $story->id,
        'title_value' => $story->title_value,
        'cover_image_ar' => $story->cover_image_ar,
        'cover_image_en' => $story->cover_image_en,
      ];
    }

    $settings = SiteSetting::whereIn('key', ['first_plan_price', 'second_plan_price'/*, 'third_plan_price'*/])
      ->pluck('value', 'key')
      ->map(function ($value) {
        return is_numeric($value) ? (float) $value : 0;
      })
      ->toArray();

    $deliveryOptions = DeliveryOption::all()->map(function ($option) {
      return [
        'id' => $option->id,
        'city_value' => $option->city_value,
        'price' => $option->price,
      ];
    });

    return Inertia::render('Frontend/Order/CreateOrder', [
      'pricing' => $settings,
      'deliveryOptions' => $deliveryOptions,
      'story' => $story,
    ]);
  }

  public function store(Request $request)
  {
    // No validation here - CartController handles it
    $cartController = new CartController();
    $response = $cartController->addToCart($request);
    $responseData = $response->getData(true);

    if ($responseData['success']) {
      return redirect()->route('cart.index')
        ->with('title', __('website_response.item_added_to_cart_title'))
        ->with('message', __('website_response.item_added_to_cart_message'))
        ->with('status', 'success');
    }

    return back()->withErrors([
      'submit' => $responseData['message'] ?? __('website_response.failed_to_add_to_cart')
    ])->withInput();
  }

  // Continue payment for existing order
  public function continuePayment(Order $order)
  {
    // Ensure user owns the order
    if ($order->user_id !== Auth::id()) {
      abort(403);
    }

    // Check if already paid
    if ($order->payments()->where('status', 'paid')->exists()) {
      return redirect()->route('user.orders.show', $order->id)
        ->with('title', __('website_response.already_paid_title'))
        ->with('message', __('website_response.already_paid_message'))
        ->with('status', 'info');
    }

    $order->load(['orderItems.story', 'shippingAddress.deliveryOption', 'payments']);

    return Inertia::render('Frontend/Order/PaymentMethod', [
      'order' => OrderResource::make($order)->toArray(request()),
      'deliveryOptions' => DeliveryOption::all(),
    ]);
  }

  /**
   * Process payment FROM CART (creates new order)
   * Route: POST /orders/process-payment
   */
  public function processPayment(Request $request)
  {


    // Get authenticated user's cart first to check if shipping is needed
    $cart = Cart::where('user_id', Auth::id())
      ->with(['cartItems'])
      ->first();

    // Check if cart exists and has items
    if (!$cart || $cart->cartItems->isEmpty()) {
      return redirect()->route('cart.index')
        ->with('title', __('website_response.cart_empty_title'))
        ->with('message', __('website_response.cart_empty_message'))
        ->with('status', 'error');
    }

    // Build validation rules - shipping is always required for all plans
    $rules = [
      'payment_method' => ['required', 'in:stripe'],
      'delivery_option_id' => ['required', 'exists:delivery_options,id'],
      'first_name' => ['required', 'string', 'max:255'],
      'last_name' => ['required', 'string', 'max:255'],
      'street' => ['required', 'string', 'max:255'],
      'house_number' => ['nullable', 'string', 'max:255'],
      'additional_info' => ['nullable', 'string', 'max:500'],
      'postal_code' => ['required', 'string', 'max:255'],
      'city' => ['required', 'string', 'max:255'],
      'phone' => ['required', 'string', 'max:255'],
      'discount_code' => ['nullable', 'string', 'max:255'], // NEW
    ];

    $validated = $request->validate($rules);

    DB::beginTransaction();

    try {
      // Calculate totals from cart items
      $subtotal = $cart->cartItems->sum('story_price');
      $deliveryTotal = 0;

      if ($validated['delivery_option_id']) {
        $deliveryOption = DeliveryOption::find($validated['delivery_option_id']);
        $deliveryTotal = $deliveryOption ? (float) $deliveryOption->price : 0;
      }

      // Handle discount
      $discountCode = null;
      $discountValue = 0;
      $discountId = null;

      if (!empty($validated['discount_code'])) {
        $discount = Discount::where('code', $validated['discount_code'])->first();

        if ($discount) {
          // Verify user hasn't used it
          $alreadyUsed = DiscountUsage::where('discount_id', $discount->id)
            ->where('user_id', Auth::id())
            ->exists();

          // Verify usage limit
          $currentUsageCount = DiscountUsage::where('discount_id', $discount->id)->count();

          if (!$alreadyUsed && $currentUsageCount < $discount->usage_limit) {
            $discountCode = $discount->code;
            $discountValue = round(($subtotal * $discount->percent) / 100, 2);
            $discountId = $discount->id;
          }
        }
      }

      $totalPrice = $subtotal + $deliveryTotal - $discountValue;

      // Create new order
      $order = Order::create([
        'user_id' => Auth::id(),
        'status' => 'pending',
        'payment_method' => $validated['payment_method'],
        'subtotal' => $subtotal,
        'delivery_total' => $deliveryTotal,
        'discount_code' => $discountCode,
        'discount_value' => $discountValue,
        'total_price' => $totalPrice,
      ]);

      // Convert cart items to order items
      foreach ($cart->cartItems as $cartItem) {
        // Handle child image path migration
        $childImagePath = null;
        $faceSwapImagePath = null;

        if ($cartItem->child_image_path) {
          $newPath = str_replace('/cart/', "/orders/{$order->id}/", $cartItem->child_image_path);
          \Illuminate\Support\Facades\Storage::disk('public')->copy($cartItem->child_image_path, $newPath);
          $childImagePath = $newPath;
        }

        if ($cartItem->face_swap_image_path) {
          $newPath = str_replace('/cart/', "/orders/{$order->id}/", $cartItem->face_swap_image_path);
          \Illuminate\Support\Facades\Storage::disk('public')->copy($cartItem->face_swap_image_path, $newPath);
          $faceSwapImagePath = $newPath;
        }

        // Create order item from cart item
        $orderItem = \App\Models\Order\OrderItem::create([
          'order_id' => $order->id,
          'story_id' => $cartItem->story_id,
          'child_name' => $cartItem->child_name,
          'child_age' => $cartItem->child_age,
          'language' => $cartItem->language,
          'child_gender' => $cartItem->child_gender,
          'format' => $cartItem->format,
          'story_theme' => $cartItem->story_theme,
          'value' => $cartItem->value,
          'custom_value' => $cartItem->custom_value,
          'child_image_path' => $childImagePath,
          'face_swap_image_path' => $faceSwapImagePath,
          'story_price' => $cartItem->story_price,
          'hair_color' => $cartItem->hair_color,
          'hair_style' => $cartItem->hair_style,
          'eye_color' => $cartItem->eye_color,
          'skin_tone' => $cartItem->skin_tone,
          'clothing_description' => $cartItem->clothing_description,
          'customer_note' => $cartItem->customer_note,
          'accessory_description' => $cartItem->accessory_description,
          'personality_traits' => $cartItem->personality_traits,
          'moral_value' => $cartItem->moral_value,
          'status' => 'pending',
        ]);

        // Note: Shipping address is now created at order level, not per item
      }

      // Create ONE shipping address for the entire order
      if ($validated['delivery_option_id']) {
        \App\Models\Order\OrderShippingAddress::create([
          'order_id' => $order->id,
          'delivery_option_id' => $validated['delivery_option_id'],
          'first_name' => $validated['first_name'],
          'last_name' => $validated['last_name'],
          'street' => $validated['street'],
          'house_number' => $validated['house_number'],
          'additional_info' => $validated['additional_info'],
          'postal_code' => $validated['postal_code'],
          'city' => $validated['city'],
          'phone' => $validated['phone'],
        ]);
      }

      // Create payment record
      $payment = Payment::create([
        'order_id' => $order->id,
        'payment_method' => $validated['payment_method'],
        'status' => 'pending',
        'amount' => $order->total_price, // Uses discounted total
      ]);

      // Clear cart after successful order creation
      foreach ($cart->cartItems as $item) {
        if ($item->child_image_path) {
          \Illuminate\Support\Facades\Storage::disk('public')->delete($item->child_image_path);
        }
        if ($item->face_swap_image_path) {
          \Illuminate\Support\Facades\Storage::disk('public')->delete($item->face_swap_image_path);
        }
      }
      $cart->cartItems()->delete();

      DB::commit();

      $order->load(['orderItems.story', 'shippingAddress']);
      $user = Auth::user();
      $emailLocale = $this->resolveOrderLocale($order);


      // Send emails to admin and user
      try {
        if ($order->user) {
          $order->user->notify(new OrderConfirmation($order, $emailLocale));
        }

        $adminEmailSetting = SiteSetting::where('key', 'admin_notification_email')->first();
        if ($adminEmailSetting && $adminEmailSetting->value) {
          Notification::route('mail', $adminEmailSetting->value)
            ->notify(new NotifyAdmin($order, $emailLocale));
        }

      } catch (\Exception $e) {
        Log::error('Failed to send order notifications', [
          'order_id' => $order->id,
          'error' => $e->getMessage(),
          'trace' => $e->getTraceAsString()
        ]);
      }

      // Pass discount ID for later usage tracking
      session(['pending_discount_id' => $discountId]);

      // Check if total is zero or negative - no payment needed
      if ($totalPrice <= 0) {
        // Mark payment as paid
        $payment->update(['status' => 'paid']);

        // Update order status to processing
        $order->update(['status' => 'processing']);

        // Update all order items status to processing
        $order->orderItems()->update(['status' => 'processing']);

        // Record discount usage immediately since no Stripe payment
        if ($discountId) {
          $discount = Discount::find($discountId);
          if ($discount) {
            $discount->decrement('usage_limit');
            DiscountUsage::firstOrCreate([
              'discount_id' => $discount->id,
              'user_id' => Auth::id(),
            ]);
            Log::info('Discount usage recorded for zero total order', [
              'order_id' => $order->id,
              'discount_code' => $discountCode,
              'user_id' => Auth::id(),
            ]);
          }
        }

        // Send payment success notification
        if ($order->user) {
          $order->user->notify(new PaymentStatusUpdate($order, $payment, $emailLocale));
        }

        // Redirect to success page
        return Inertia::render('Frontend/Order/PaymentSuccess', [
          'order' => $order->load(['orderItems.story', 'shippingAddress.deliveryOption'])
        ]);
      }

      // Process payment via Stripe
      return $this->initiateStripePayment($order, $payment);
    } catch (\Exception $e) {
      DB::rollBack();

      return redirect()->route('home')
        ->with('title', __('website_response.payment_error_title'))
        ->with('message', __('website_response.payment_failed'))
        ->with('status', 'error');
    }
  }

  /**
   * Process payment FROM EXISTING ORDER (retry payment)
   * Route: POST /orders/{order}/process-payment
   */
  public function processExistingOrderPayment(Request $request, Order $order)
  {
    // Ensure user owns the order
    if ($order->user_id !== Auth::id()) {
      abort(403, __('website_response.unauthorized_access'));
    }

    // Build validation rules - shipping is always required for all plans
    $rules = [
      'payment_method' => ['required', 'in:stripe'],
      'delivery_option_id' => ['required', 'exists:delivery_options,id'],
      'first_name' => ['required', 'string', 'max:255'],
      'last_name' => ['required', 'string', 'max:255'],
      'street' => ['required', 'string', 'max:255'],
      'house_number' => ['nullable', 'string', 'max:255'],
      'additional_info' => ['nullable', 'string', 'max:500'],
      'postal_code' => ['required', 'string', 'max:255'],
      'city' => ['required', 'string', 'max:255'],
      'phone' => ['required', 'string', 'max:255'],
      'discount_code' => ['nullable', 'string', 'max:255'], // ✅ Removed 'exists' rule - we'll validate manually
    ];

    $validated = $request->validate($rules);

    // Check if order is already paid
    $existingPaidPayment = $order->payments()->where('status', 'paid')->first();
    if ($existingPaidPayment) {
      return redirect()->route('user.orders.show', $order->id)
        ->with('title', __('website_response.already_paid_title'))
        ->with('message', __('website_response.already_paid_message'))
        ->with('status', 'info');
    }

    DB::beginTransaction();

    try {
      // Recalculate delivery total
      $deliveryTotal = 0;
      if ($validated['delivery_option_id']) {
        $deliveryOption = DeliveryOption::find($validated['delivery_option_id']);
        $deliveryTotal = $deliveryOption ? (float) $deliveryOption->price : 0;
      }

      // ✅ Handle discount - Three scenarios:
      // 1. Empty string sent from frontend = User removed discount, don't apply any
      // 2. New discount code sent = Validate and apply new discount
      // 3. Null/not provided = Keep existing discount (if any)

      $discountCode = null;
      $discountValue = 0;
      $discountId = null;

      // Check if discount_code is provided in the request
      if (array_key_exists('discount_code', $validated)) {
        $inputDiscountCode = trim($validated['discount_code'] ?? '');

        // ✅ If empty string sent = User explicitly removed discount
        if ($inputDiscountCode === '') {
          $discountCode = null;
          $discountValue = 0;
          $discountId = null;
        }
        // ✅ If discount code provided = Validate and apply
        else {
          $discount = Discount::where('code', $inputDiscountCode)->first();

          if ($discount) {
            // Verify user hasn't used it
            $alreadyUsed = DiscountUsage::where('discount_id', $discount->id)
              ->where('user_id', Auth::id())
              ->exists();

            // Verify usage limit
            $currentUsageCount = DiscountUsage::where('discount_id', $discount->id)->count();

            if (!$alreadyUsed && $currentUsageCount < $discount->usage_limit) {
              $discountCode = $discount->code;
              $discountValue = round(($order->subtotal * $discount->percent) / 100, 2);
              $discountId = $discount->id;
            } else {
              // ✅ Invalid discount code = Don't apply any discount
              $discountCode = null;
              $discountValue = 0;
              $discountId = null;
            }
          } else {
            // ✅ Discount not found = Don't apply any discount
            $discountCode = null;
            $discountValue = 0;
            $discountId = null;
          }
        }
      }
      // ✅ If discount_code not in request at all = Keep existing discount (backward compatibility)
      else {
        $discountCode = $order->discount_code;
        $discountValue = $order->discount_value ?? 0;
      }

      // Recalculate total price
      $totalPrice = $order->subtotal + $deliveryTotal - $discountValue;

      // Update order with new values
      $order->update([
        'payment_method' => $validated['payment_method'],
        'delivery_total' => $deliveryTotal,
        'discount_code' => $discountCode,
        'discount_value' => $discountValue,
        'total_price' => $totalPrice,
      ]);

      // Update or create shipping address
      if ($validated['delivery_option_id']) {
        $shippingData = [
          'delivery_option_id' => $validated['delivery_option_id'],
          'first_name' => $validated['first_name'],
          'last_name' => $validated['last_name'],
          'street' => $validated['street'],
          'house_number' => $validated['house_number'],
          'additional_info' => $validated['additional_info'],
          'postal_code' => $validated['postal_code'],
          'city' => $validated['city'],
          'phone' => $validated['phone'],
        ];

        $order->shippingAddress()->updateOrCreate(
          ['order_id' => $order->id],
          $shippingData
        );
      }

      // Find or create pending payment
      $payment = $order->payments()
        ->where('status', 'pending')
        ->latest()
        ->first();

      if (!$payment) {
        $payment = Payment::create([
          'order_id' => $order->id,
          'payment_method' => $validated['payment_method'],
          'status' => 'pending',
          'amount' => $order->total_price,
        ]);
      } else {
        // Update existing pending payment
        $payment->update([
          'payment_method' => $validated['payment_method'],
          'amount' => $order->total_price,
        ]);
      }

      DB::commit();

      // ✅ Refresh order to ensure all fields are loaded fresh
      $order->refresh();
      $emailLocale = $this->resolveOrderLocale($order);

      // Pass discount ID for later usage tracking if new discount applied
      if ($discountId) {
        session(['pending_discount_id' => $discountId]);
      } else {
        // ✅ Clear any existing pending discount session if no discount applied
        session()->forget('pending_discount_id');
      }

      // Check if total is zero or negative - no payment needed
      if ($totalPrice <= 0) {
        // Mark payment as paid
        $payment->update(['status' => 'paid']);

        // Update order status to processing
        $order->update(['status' => 'processing']);

        // Update all order items status to processing
        $order->orderItems()->update(['status' => 'processing']);

        // Record discount usage immediately since no Stripe payment
        if ($discountId) {
          $discount = Discount::find($discountId);
          if ($discount) {
            $discount->decrement('usage_limit');
            DiscountUsage::firstOrCreate([
              'discount_id' => $discount->id,
              'user_id' => Auth::id(),
            ]);
            Log::info('Discount usage recorded for zero total existing order', [
              'order_id' => $order->id,
              'discount_code' => $discountCode,
              'user_id' => Auth::id(),
            ]);
          }
        }

        // Send payment success notification
        if ($order->user) {
          $order->user->notify(new PaymentStatusUpdate($order, $payment, $emailLocale));
        }

        // Redirect to success page
        return Inertia::render('Frontend/Order/PaymentSuccess', [
          'order' => $order->load(['orderItems.story', 'shippingAddress.deliveryOption'])
        ]);
      }

      // Process payment via Stripe
      return $this->initiateStripePayment($order, $payment);
    } catch (\Exception $e) {
      DB::rollBack();

      return redirect()->route('user.orders.show', $order->id)
        ->with('title', __('website_response.payment_error_title'))
        ->with('message', __('website_response.payment_failed'))
        ->with('status', 'error');
    }
  }


  /**
   * Helper method to initiate Stripe payment
   * Used by both processPayment and processExistingOrderPayment
   */
  private function initiateStripePayment(Order $order, Payment $payment)
  {
    try {
      $result = $this->stripeService->sendPayment($order);

      if (!$result['status']) {
        return redirect()->route('home')
          ->with('title', __('website_response.payment_error_title'))
          ->with('message', $result['message'])
          ->with('status', 'error');
      }

      // Update payment with Stripe session ID
      $payment->update(['transaction_id' => $result['stripe_session_id']]);

      // Redirect to Stripe checkout
      return redirect($result['url']);
    } catch (\Exception $e) {

      return redirect()->route('home')
        ->with('title', __('website_response.payment_error_title'))
        ->with('message', __('website_response.payment_failed'))
        ->with('status', 'error');
    }
  }
}
