<?php

namespace App\Http\Controllers\Frontend\PaymentGateways;

use App\Http\Controllers\Controller;
use App\Models\Order\Order;
use App\Models\Order\Payment;
use App\Services\PaymobService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class PaymobController extends Controller
{
  protected $paymobService;

  public function __construct(PaymobService $paymobService)
  {
    $this->paymobService = $paymobService;
  }


  public function success(Request $request,Order $order)
  {

    Log::info($request->all());

    if ($order->user_id !== Auth::id())
      abort(403);

    try {
      // Load the payments relationship and get the first one
      $payment = $order->payments()->first(); // or latest()

      if (!$payment) {
        Log::error('No payment record found for order: ' . $order->id);
        return abort(403);
      }

      Log::info('Payment found', ['payment_id' => $payment->id, 'transaction_id' => $payment->transaction_id]);

      $paymobOrderId = $payment->transaction_id;

      if (!$paymobOrderId) {
        Log::error('No Paymob order ID found for order: ' . $order->id);
        return abort(403);
      }

      Log::info('Verifying Paymob order: ' . $paymobOrderId);

      // Verify payment with Paymob
      $verification = $this->paymobService->getOrderDetails($paymobOrderId);

      Log::info('Verification result', $verification);

      if (!$verification['status'] || !$verification['is_paid']) {
        Log::error('Payment not confirmed for order: ' . $order->id);
        return abort(403);
      }

      // Update payment and order status
      if ($payment->status !== 'paid') {
        $payment->update(['status' => 'paid']);
        $order->update(['status' => 'completed']);
        Log::info('Payment marked as completed for order: ' . $order->id);
      }

      return Inertia::render('Frontend/Order/PaymentSuccess', [
        'order' => $order->load('shippingAddress')
      ]);

    } catch (\Throwable $th) {
      Log::error('Payment success verification error: ' . $th->getMessage());
      Log::error('Error details: ' . $th->getTraceAsString());
      return abort(403);
    }
  }


  public function failure(Order $order)
  {
    if ($order->user_id !== Auth::id())
      abort(403);

    return Inertia::render('Frontend/Order/PaymentFailed', [
      'order' => $order->load('shippingAddress')
    ]);
  }
}
