<?php

namespace App\Http\Controllers\Frontend\Cart;

use App\Http\Controllers\Controller;
use App\Http\Resources\Cart\CartResource;
use App\Http\Resources\Cart\CartItemResource;
use App\Models\Order\Cart;
use App\Models\Order\CartItem;
use App\Models\Admin\SiteSetting\DeliveryOption;
use App\Models\Admin\SiteSetting\Discount;
use App\Models\Admin\SiteSetting\DiscountUsage;
use App\Models\Admin\SiteSetting\SiteSetting;
use App\Models\Admin\Story\Story;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use App\Models\Order\Order;
use App\Models\Order\OrderItem;

class CartController extends Controller
{
    public function addToCart(Request $request)
    {
        $validated = $request->validate([
            'story_id' => ['nullable', 'exists:stories,id'],
            'face_swap_result' => ['nullable', 'string'],
            'child_name' => ['required', 'string', 'max:255'],
            'child_age' => ['required', 'integer', 'min:1'],
            'language' => ['required', 'string', 'in:arabic,english,german,turkish,english_german,arabic_german,turkish_german'],
            'child_gender' => ['required', 'string', 'in:boy,girl'],
            'format' => ['required', 'string', 'in:first_plan,second_plan'],
            'story_theme' => ['nullable', 'integer', 'min:1', 'max:10'],
            'value' => ['nullable', 'array', 'min:1'],
            'value.*' => ['string', 'in:honesty,kindness,courage,respect,responsibility,friendship,perseverance,creativity'],
            'custom_value' => ['nullable', 'string', 'max:500'],
            'child_image' => ['nullable', 'file', 'image', 'mimes:jpeg,png,jpg,gif,webp', 'max:5120'],
            'hair_color' => ['nullable', 'string', 'max:255'],
            'hair_style' => ['nullable', 'string', 'max:255'],
            'eye_color' => ['nullable', 'string', 'max:255'],
            'skin_tone' => ['nullable', 'string', 'max:255'],
            'clothing_description' => ['nullable', 'string', 'max:1000'],
            'customer_note' => ['nullable', 'string', 'max:1000'],
            'accessory_description' => ['nullable', 'string', 'max:1000'],
            'personality_traits' => ['nullable', 'string', 'max:1000'],
            'moral_value' => ['nullable', 'string', 'max:500'],
        ]);

        // Calculate prices server-side
        $prices = $this->calculatePrices($validated['format']);

        DB::beginTransaction();

        try {
            $cart = Cart::firstOrCreate(['user_id' => Auth::id()]);

            $cartItem = $cart->cartItems()->create([
                'story_id' => $validated['story_id'] ?? null,
                'child_name' => $validated['child_name'],
                'child_age' => $validated['child_age'],
                'language' => $validated['language'],
                'child_gender' => $validated['child_gender'],
                'format' => $validated['format'],
                'story_theme' => $validated['story_theme'] ?? null,
                'value' => $validated['value'] ?? null,
                'custom_value' => $validated['custom_value'] ?? null,
                'story_price' => $prices['story_price'],
                'hair_color' => $validated['hair_color'] ?? null,
                'hair_style' => $validated['hair_style'] ?? null,
                'eye_color' => $validated['eye_color'] ?? null,
                'skin_tone' => $validated['skin_tone'] ?? null,
                'clothing_description' => $validated['clothing_description'] ?? null,
                'customer_note' => $validated['customer_note'] ?? null,
                'accessory_description' => $validated['accessory_description'] ?? null,
                'personality_traits' => $validated['personality_traits'] ?? null,
                'moral_value' => $validated['moral_value'] ?? null,
            ]);

            // Handle image upload
            if ($request->hasFile('child_image')) {
                $imagePath = $request->file('child_image')->store("users/{$cart->user_id}/cart/{$cartItem->id}/images", 'public');
                $cartItem->update(['child_image_path' => $imagePath]);
            }

            // Handle face swap
            if (!empty($validated['face_swap_result'])) {
                $faceSwapPath = $this->saveFaceSwapImage($validated['face_swap_result'], $cart->user_id, $cartItem->id);
                $cartItem->update(['face_swap_image_path' => $faceSwapPath]);
            }

            DB::commit();

            return response()->json([
                'success' => true,
                'message' => 'Story added to cart successfully',
                'cart_count' => $cart->cartItems()->count(),
            ]);

        } catch (\Exception $e) {
            DB::rollBack();

            return response()->json([
                'success' => false,
                'message' => 'Failed to add story to cart',
            ], 500);
        }
    }

    public function getCartCount()
    {
        $cart = Cart::where('user_id', Auth::id())->withCount('cartItems')->first();
        return response()->json([
            'count' => $cart?->cart_items_count ?? 0,
        ]);
    }

    public function getCart()
    {
        $cart = Cart::where('user_id', Auth::id())
            ->with(['cartItems.story'])
            ->first();

        return Inertia::render('Frontend/Cart/Index', [
            'cart' => $cart ? CartResource::make($cart)->toArray(request()) : null,
        ]);
    }

    public function showCartItem(CartItem $cartItem)
    {
        // Ensure the cart item belongs to the authenticated user
        if ($cartItem->cart->user_id !== Auth::id()) {
            abort(403);
        }

        $cartItem->load(['story']);

        return Inertia::render('Frontend/Cart/Show', [
            'cartItem' => CartItemResource::make($cartItem)->toArray(request()),
        ]);
    }

    public function removeFromCart($cartItemId)
    {
        $cartItem = CartItem::where('id', $cartItemId)
            ->whereHas('cart', fn($q) => $q->where('user_id', Auth::id()))
            ->firstOrFail();

        // Delete images
        if ($cartItem->child_image_path) {
            Storage::disk('public')->delete($cartItem->child_image_path);
        }
        if ($cartItem->face_swap_image_path) {
            Storage::disk('public')->delete($cartItem->face_swap_image_path);
        }

        $cartItem->delete();

        return redirect()->route('cart.index')
            ->with('title', __('website_response.item_removed_title'))
            ->with('message', __('website_response.item_removed_message'))
            ->with('status', 'success');
    }

    public function clearCart()
    {
        $cart = Cart::where('user_id', Auth::id())->first();
        if ($cart) {
            // Delete all images
            foreach ($cart->cartItems as $item) {
                if ($item->child_image_path) Storage::disk('public')->delete($item->child_image_path);
                if ($item->face_swap_image_path) Storage::disk('public')->delete($item->face_swap_image_path);
            }
            $cart->cartItems()->delete();
        }

        return redirect()->route('cart.index')
            ->with('title', __('website_response.cart_cleared_title'))
            ->with('message', __('website_response.cart_cleared_message'))
            ->with('status', 'success');
    }
    public function proceedToPayment()
    {
        $cart = Cart::where('user_id', Auth::id())
            ->with(['cartItems.story'])
            ->first();


        if (!$cart || $cart->cartItems->isEmpty()) {
            return redirect()->route('cart.index')
                ->with('title', __('website_response.cart_empty_title'))
                ->with('message', __('website_response.cart_empty_message'))
                ->with('status', 'error');
        }

        // DON'T create order yet - just pass cart to payment page
        return Inertia::render('Frontend/Order/PaymentMethod', [
            'cart' => CartResource::make($cart)->toArray(request()),
            'deliveryOptions' => DeliveryOption::all(),
        ]);
    }

    public function validateDiscount(Request $request)
    {
        $validated = $request->validate([
            'code' => ['required', 'string', 'max:255'],
        ]);

        $discount = Discount::where('code', $validated['code'])->first();

        // Validation checks
        if (!$discount) {
            return response()->json([
                'success' => false,
                'message' => __('website_response.discount_not_found'),
            ], 404);
        }

        // Check if user already used this discount
        $alreadyUsed = DiscountUsage::where('discount_id', $discount->id)
            ->where('user_id', Auth::id())
            ->exists();

        if ($alreadyUsed) {
            return response()->json([
                'success' => false,
                'message' => __('website_response.discount_already_used'),
            ], 422);
        }

        // Check usage limit
        $currentUsageCount = DiscountUsage::where('discount_id', $discount->id)->count();

        if ($currentUsageCount >= $discount->usage_limit) {
            return response()->json([
                'success' => false,
                'message' => __('website_response.discount_limit_reached'),
            ], 422);
        }

        return response()->json([
            'success' => true,
            'message' => __('website_response.discount_applied'),
            'discount' => [
                'code' => $discount->code,
                'percent' => (float) $discount->percent,
            ],
        ]);
    }

    private function saveFaceSwapImage($imageData, $userId, $cartItemId)
    {
        if (filter_var($imageData, FILTER_VALIDATE_URL)) {
            $contents = file_get_contents($imageData);
        } else {
            $contents = base64_decode(preg_replace('#^data:image/\w+;base64,#i', '', $imageData));
        }

        $path = "users/{$userId}/cart/{$cartItemId}/face_swap";
        $filename = 'face_swap_' . time() . '.png';
        Storage::disk('public')->put("{$path}/{$filename}", $contents);

        return "{$path}/{$filename}";
    }

    private function calculatePrices($format)
    {
        $pricing = SiteSetting::whereIn('key', ['first_plan_price', 'second_plan_price'/*, 'third_plan_price'*/])
            ->pluck('value', 'key')
            ->map(fn($value) => is_numeric($value) ? (float) $value : 0);

        $storyPrice = match($format) {
            'first_plan' => $pricing['first_plan_price'] ?? 0,
            'second_plan' => $pricing['second_plan_price'] ?? 0,
            // 'third_plan' => $pricing['third_plan_price'] ?? 0,
            default => 0,
        };

        return [
            'story_price' => $storyPrice,
        ];
    }
}
