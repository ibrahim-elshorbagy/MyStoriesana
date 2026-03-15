<?php

namespace App\Http\Controllers\Frontend\PaymentGateways;

use App\Http\Controllers\Controller;
use App\Models\Order\Order;
use App\Services\StripeService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use App\Notifications\Orders\Status\PaymentStatusUpdate;

class StripeController extends Controller
{
  protected $stripeService;

  public function __construct(StripeService $stripeService)
  {
    $this->stripeService = $stripeService;
  }

  public function success(Request $request, Order $order)
  {
    // Validate incoming request
    $validated = $request->validate([
      'session_id' => ['required', 'string', 'max:255'],
      'lang' => ['nullable', 'string', 'in:en,ar,de'],
    ]);

    Log::info('Stripe payment success callback', [
      'order_id' => $order->id,
      'session_id' => $validated['session_id']
    ]);

    // Verify order ownership
    if ($order->user_id !== Auth::id()) {
      Log::warning('Unauthorized payment access attempt', [
        'order_id' => $order->id,
        'auth_user' => Auth::id(),
        'order_user' => $order->user_id
      ]);
      abort(403, 'Unauthorized access to order');
    }

    try {
      $payment = $order->payments()->first();

      if (!$payment) {
        Log::error('No payment record found for order: ' . $order->id);
        abort(404, 'Payment record not found');
      }

      // Prevent duplicate processing
      if ($payment->status === 'paid') {
        Log::info('Payment already completed for order: ' . $order->id);
        return Inertia::render('Frontend/Order/PaymentSuccess', [
          'order' => $order->load(['orderItems.story', 'shippingAddress.deliveryOption'])
        ]);
      }

      Log::info('Processing Stripe payment verification', [
        'payment_id' => $payment->id,
        'session_id' => $validated['session_id']
      ]);

      // Verify with Stripe
      $verification = $this->stripeService->verifyPayment($validated['session_id']);

      if (!$verification['status']) {
        Log::error('Stripe verification failed', [
          'order_id' => $order->id,
          'error' => $verification['message'] ?? 'Unknown error'
        ]);
        abort(403, 'Payment verification failed');
      }

      if (!$verification['is_paid']) {
        Log::error('Stripe payment not confirmed', [
          'order_id' => $order->id,
          'payment_status' => $verification
        ]);
        abort(403, 'Payment not completed');
      }

      // Verify order ID matches
      if (isset($verification['order_id']) && $verification['order_id'] != $order->id) {
        Log::error('Order ID mismatch in Stripe session', [
          'url_order_id' => $order->id,
          'stripe_order_id' => $verification['order_id']
        ]);
        abort(403, 'Order verification failed');
      }

      // Update payment and order
      $payment->update([
        'status' => 'paid',
        'transaction_id' => $verification['payment_intent']
      ]);

      // Update order status to processing
      $order->update(['status' => 'processing']);

      // Update all order items status to processing
      $order->orderItems()->update(['status' => 'processing']);

      // ✅ NEW: Record discount usage ONLY on successful payment
      if ($order->discount_code) {
        $discount = \App\Models\Admin\SiteSetting\Discount::where('code', $order->discount_code)->first();

        if ($discount) {
          // Decrement usage limit
          $discount->decrement('usage_limit');

          \App\Models\Admin\SiteSetting\DiscountUsage::firstOrCreate([
            'discount_id' => $discount->id,
            'user_id' => $order->user_id,
          ]);

          Log::info('Discount usage recorded and limit decremented', [
            'order_id' => $order->id,
            'discount_code' => $order->discount_code,
            'user_id' => $order->user_id,
            'remaining_usage' => $discount->usage_limit - 1,
          ]);
        }
      }

      // Send payment success notification
      $locale = $validated['lang'] ?: 'en';
      $order->user->notify(new PaymentStatusUpdate($order, $payment, $locale));

      Log::info('Stripe payment completed successfully', [
        'order_id' => $order->id,
        'payment_intent' => $verification['payment_intent']
      ]);

      return Inertia::render('Frontend/Order/PaymentSuccess', [
        'order' => $order->load(['orderItems.story', 'shippingAddress.deliveryOption'])
      ]);
    } catch (\Illuminate\Validation\ValidationException $e) {
      // Let Laravel handle validation errors naturally
      throw $e;
    } catch (\Throwable $th) {
      Log::error('Payment verification error', [
        'order_id' => $order->id,
        'error' => $th->getMessage(),
        'trace' => $th->getTraceAsString()
      ]);
      abort(500, 'Payment verification failed');
    }
  }

  public function failure(Request $request, Order $order)
  {
    // Validate incoming request
    $validated = $request->validate([
      'lang' => ['nullable', 'string', 'in:en,ar,de'],
    ]);

    // Verify order ownership
    if ($order->user_id !== Auth::id()) {
      abort(403, 'Unauthorized access to order');
    }

    Log::info('Stripe payment cancelled', [
      'order_id' => $order->id,
      'user_id' => Auth::id()
    ]);

    // Update payment status to failed
    $payment = $order->payments()->first();
    if ($payment) {
      $payment->update(['status' => 'failed']);

      // Send payment failure notification
      $locale = $validated['lang'] ?: 'en';
      $order->user->notify(new PaymentStatusUpdate($order, $payment, $locale));
    }

    return Inertia::render('Frontend/Order/PaymentFailed', [
      'order' => $order->load(['orderItems.story', 'shippingAddress.deliveryOption'])
    ]);
  }
}
