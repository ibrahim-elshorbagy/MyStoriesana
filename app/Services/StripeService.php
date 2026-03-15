<?php

namespace App\Services;

use App\Models\Admin\SiteSetting\SiteSetting;
use App\Models\Order\Order;
use Illuminate\Support\Facades\Log;
use Exception;

class StripeService
{
  protected $publishableKey;
  protected $secretKey;

  public function __construct()
  {
    $settings = SiteSetting::whereIn('key', [
      'stripe_publishable_key',
      'stripe_secret_key'
    ])->pluck('value', 'key')->toArray();

    $this->publishableKey = $settings['stripe_publishable_key'] ?? env('STRIPE_PUBLISHABLE_KEY');
    $this->secretKey = $settings['stripe_secret_key'] ?? env('STRIPE_SECRET_KEY');

    Log::info('StripeService initialized');
  }

  public function sendPayment(Order $order): array
  {
    try {
      Log::info('Sending payment for order: ' . $order->id);

      \Stripe\Stripe::setApiKey($this->secretKey);

      if (empty($this->secretKey)) {
        Log::error('Stripe secret key not configured');
        return [
          'status' => false,
          'message' => __('website_response.payment_methods_not_configured'),
          'url' => '',
          'stripe_session_id' => ''
        ];
      }

      Log::info('Creating Stripe checkout session');

      $lineItems = [];

      // Calculate discounted subtotal (ensure it doesn't go negative)
      $discountedSubtotal = max(0, $order->subtotal - $order->discount_value);

      // Add discounted subtotal (stories combined)
      if ($discountedSubtotal > 0) {
        $lineItems[] = [
          'price_data' => [
            'currency' => 'eur',
            'product_data' => [
              'name' => 'Personalized Stories' . ($order->discount_code ? ' (Discount: ' . $order->discount_code . ')' : ''),
              'description' => 'Custom stories for order #' . $order->id,
            ],
            'unit_amount' => $discountedSubtotal * 100, // Convert to cents
          ],
          'quantity' => 1,
        ];
      }

      // Add delivery total (all deliveries combined)
      if ($order->delivery_total > 0) {
        $lineItems[] = [
          'price_data' => [
            'currency' => 'eur',
            'product_data' => [
              'name' => 'Delivery',
              'description' => 'Shipping and delivery costs',
            ],
            'unit_amount' => $order->delivery_total * 100, // Convert to cents
          ],
          'quantity' => 1,
        ];
      }

      if (empty($lineItems)) {
        Log::error('No line items to charge for order: ' . $order->id);
        return [
          'status' => false,
          'message' => __('website_response.payment_failed'),
          'url' => '',
          'stripe_session_id' => ''
        ];
      }

      $currentLocale = session('locale') ?: app()->getLocale();

      $session = \Stripe\Checkout\Session::create([
        'line_items' => $lineItems,
        'mode' => 'payment',
        'success_url' => url(route('frontend.stripe.payment.success', ['order' => $order->id])) . '?session_id={CHECKOUT_SESSION_ID}&lang=' . $currentLocale,
        'cancel_url' => url(route('frontend.stripe.payment.failed', ['order' => $order->id])) . '?lang=' . $currentLocale,
        'customer_email' => $order->user->email,
        'client_reference_id' => $order->id,
        'metadata' => [
          'order_id' => $order->id,
          'user_id' => $order->user->id,
        ],
        // 'automatic_tax' => ['enabled' => true],
      ]);

      Log::info('Stripe checkout session created successfully, URL: ' . $session->url);

      return [
        'status' => true,
        'message' => '',
        'url' => $session->url,
        'stripe_session_id' => $session->id
      ];
    } catch (\Stripe\Exception\ApiErrorException $e) {
      Log::error('Stripe API error: ' . $e->getMessage());
      return [
        'status' => false,
        'message' => __('website_response.payment_failed'),
        'url' => '',
        'stripe_session_id' => ''
      ];
    } catch (Exception $e) {
      Log::error('Payment error: ' . $e->getMessage());
      return [
        'status' => false,
        'message' => __('website_response.payment_failed'),
        'url' => route('home'),
        'stripe_session_id' => ''
      ];
    }
  }

  /**
   * Verify Stripe payment session
   */
  public function verifyPayment(string $sessionId): array
  {
    try {
      \Stripe\Stripe::setApiKey($this->secretKey);

      Log::info('Verifying Stripe session: ' . $sessionId);

      $session = \Stripe\Checkout\Session::retrieve($sessionId);

      Log::info('Stripe session retrieved', [
        'payment_status' => $session->payment_status,
        'order_id' => $session->metadata->order_id ?? null
      ]);

      return [
        'status' => true,
        'is_paid' => $session->payment_status === 'paid',
        'payment_intent' => $session->payment_intent,
        'amount_total' => $session->amount_total,
        'currency' => $session->currency,
        'customer_email' => $session->customer_email,
        'order_id' => $session->metadata->order_id ?? null,
        'user_id' => $session->metadata->user_id ?? null,
      ];
    } catch (\Stripe\Exception\ApiErrorException $e) {
      Log::error('Stripe verification error: ' . $e->getMessage());
      return [
        'status' => false,
        'is_paid' => false,
        'message' => $e->getMessage()
      ];
    }
  }
}
