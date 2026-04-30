<?php

namespace App\Http\Controllers\Frontend\PaymentGateways;

use App\Http\Controllers\Controller;
use App\Models\Order\Payment;
use App\Services\PaymobService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use App\Notifications\Orders\Status\PaymentStatusUpdate;
use App\Models\Admin\SiteSetting\Discount;
use App\Models\Admin\SiteSetting\DiscountUsage;

class PaymobController extends Controller
{
    protected $paymobService;

    public function __construct(PaymobService $paymobService)
    {
        $this->paymobService = $paymobService;
    }

    private function resolveOrderFromRequest(Request $request): array
    {
        $paymobOrderRef = $request->query('order');

        if (!$paymobOrderRef) {
            Log::error('Paymob callback missing order query param', $request->all());
            abort(404, 'Order reference not found');
        }

        $payment = Payment::where('transaction_id', $paymobOrderRef)->first();

        if (!$payment) {
            Log::error('No payment found for Paymob order ref: ' . $paymobOrderRef);
            abort(404, 'Payment not found');
        }

        return [$payment->order, $payment];
    }

    /**
     * Transaction processed callback
     * Paymob redirects here after SUCCESSFUL payment
     */
    public function processed(Request $request)
    {
        Log::info('Paymob processed callback hit', $request->all());

        [$order, $payment] = $this->resolveOrderFromRequest($request);

        if ($order->user_id !== Auth::id()) {
            Log::warning('Unauthorized Paymob processed callback', [
                'order_id' => $order->id,
                'auth_user' => Auth::id(),
                'order_user' => $order->user_id,
            ]);
            abort(403, 'Unauthorized access to order');
        }

        $locale = $request->query('lang') ?? 'en';

        try {
            // Prevent duplicate processing
            if ($payment->status === 'paid') {
                Log::info('Payment already completed for order: ' . $order->id);
                return Inertia::render('Frontend/Order/PaymentSuccess', [
                    'order' => $order->load(['orderItems.story', 'shippingAddress.deliveryOption'])
                ]);
            }

            $paymobOrderRef = $request->query('order');

            // Verify with Paymob API
            $verification = $this->paymobService->getOrderDetails($paymobOrderRef);

            Log::info('Paymob verification result', $verification);

            if (!$verification['status'] || !$verification['is_paid']) {
                Log::error('Payment not confirmed for order: ' . $order->id);
                abort(403, 'Payment verification failed');
            }

            // Update payment and order
            $payment->update(['status' => 'paid']);
            $order->update(['status' => 'processing']);
            $order->orderItems()->update(['status' => 'processing']);

            // Record discount usage
            if ($order->discount_code) {
                $discount = Discount::where('code', $order->discount_code)->first();
                if ($discount) {
                    $discount->decrement('usage_limit');
                    DiscountUsage::firstOrCreate([
                        'discount_id' => $discount->id,
                        'user_id'     => $order->user_id,
                    ]);
                    Log::info('Discount usage recorded', [
                        'order_id'      => $order->id,
                        'discount_code' => $order->discount_code,
                        'user_id'       => $order->user_id,
                    ]);
                }
            }

            if ($order->user) {
                $order->user->notify(new PaymentStatusUpdate($order, $payment, $locale));
            }

            Log::info('Paymob payment completed successfully', [
                'order_id'        => $order->id,
                'paymob_order_id' => $paymobOrderRef,
            ]);

            return Inertia::render('Frontend/Order/PaymentSuccess', [
                'order' => $order->load(['orderItems.story', 'shippingAddress.deliveryOption'])
            ]);

        } catch (\Throwable $th) {
            Log::error('Paymob processed callback error', [
                'order_id' => $order->id,
                'error'    => $th->getMessage(),
                'trace'    => $th->getTraceAsString(),
            ]);
            abort(500, 'Payment verification failed');
        }
    }

    /**
     * Transaction response callback
     * Paymob redirects here after ANY payment response (success or failure)
     * We check ?success=true/false to determine outcome
     */
    public function response(Request $request)
    {
        Log::info('Paymob response callback hit', $request->all());

        [$order, $payment] = $this->resolveOrderFromRequest($request);

        if ($order->user_id !== Auth::id()) {
            Log::warning('Unauthorized Paymob response callback', [
                'order_id'   => $order->id,
                'auth_user'  => Auth::id(),
                'order_user' => $order->user_id,
            ]);
            abort(403, 'Unauthorized access to order');
        }

        $locale = $request->query('lang') ?? 'en';
        $isSuccess = $request->query('success') === 'true';

        // If already paid (processed callback already handled it)
        if ($payment->status === 'paid') {
            Log::info('Response callback: payment already processed for order: ' . $order->id);
            return Inertia::render('Frontend/Order/PaymentSuccess', [
                'order' => $order->load(['orderItems.story', 'shippingAddress.deliveryOption'])
            ]);
        }

        if (!$isSuccess) {
            Log::info('Paymob payment failed/cancelled for order: ' . $order->id);

            $payment->update(['status' => 'failed']);

            if ($order->user) {
                $order->user->notify(new PaymentStatusUpdate($order, $payment, $locale));
            }

            return Inertia::render('Frontend/Order/PaymentFailed', [
                'order' => $order->load(['orderItems.story', 'shippingAddress.deliveryOption'])
            ]);
        }

        // success=true but processed callback may not have fired yet
        // Do the same verification here as a fallback
        try {
            $paymobOrderRef = $request->query('order');
            $verification = $this->paymobService->getOrderDetails($paymobOrderRef);

            Log::info('Paymob response verification result', $verification);

            if (!$verification['status'] || !$verification['is_paid']) {
                Log::error('Response callback: payment not confirmed for order: ' . $order->id);

                $payment->update(['status' => 'failed']);

                if ($order->user) {
                    $order->user->notify(new PaymentStatusUpdate($order, $payment, $locale));
                }

                return Inertia::render('Frontend/Order/PaymentFailed', [
                    'order' => $order->load(['orderItems.story', 'shippingAddress.deliveryOption'])
                ]);
            }

            $payment->update(['status' => 'paid']);
            $order->update(['status' => 'processing']);
            $order->orderItems()->update(['status' => 'processing']);

            if ($order->discount_code) {
                $discount = Discount::where('code', $order->discount_code)->first();
                if ($discount) {
                    $discount->decrement('usage_limit');
                    DiscountUsage::firstOrCreate([
                        'discount_id' => $discount->id,
                        'user_id'     => $order->user_id,
                    ]);
                }
            }

            if ($order->user) {
                $order->user->notify(new PaymentStatusUpdate($order, $payment, $locale));
            }

            Log::info('Paymob response callback: payment completed', [
                'order_id'        => $order->id,
                'paymob_order_id' => $paymobOrderRef,
            ]);

            return Inertia::render('Frontend/Order/PaymentSuccess', [
                'order' => $order->load(['orderItems.story', 'shippingAddress.deliveryOption'])
            ]);

        } catch (\Throwable $th) {
            Log::error('Paymob response callback error', [
                'order_id' => $order->id,
                'error'    => $th->getMessage(),
                'trace'    => $th->getTraceAsString(),
            ]);
            abort(500, 'Payment processing failed');
        }
    }
}
