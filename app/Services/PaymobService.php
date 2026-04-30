<?php

namespace App\Services;

use App\Models\Admin\SiteSetting\SiteSetting;
use App\Models\Order\Order;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Exception;

class PaymobService
{
    protected $base_url = 'https://accept.paymob.com/api';
    protected $apiKey;
    protected $mobileWalletId;
    protected $onlineCardId;

    public function __construct()
    {
        $settings = SiteSetting::whereIn('key', [
            'paymob_api_key',
            'paymob_mobile_wallet_id',
            'paymob_online_card_id'
        ])->pluck('value', 'key')->toArray();

        $this->apiKey = $settings['paymob_api_key'] ?? env('PAYMOB_API_KEY');
        $this->mobileWalletId = $settings['paymob_mobile_wallet_id'] ?? env('PAYMOB_MOBILE_WALLET_ID');
        $this->onlineCardId = $settings['paymob_online_card_id'] ?? env('PAYMOB_ONLINE_CARD_ID');

        Log::info('PaymobService initialized');
    }

    protected function getAuthToken(): string
    {
        try {
            Log::info('Getting Paymob auth token');
            $response = Http::post("{$this->base_url}/auth/tokens", [
                'api_key' => $this->apiKey
            ]);

            if ($response->failed()) {
                throw new Exception('Paymob authentication failed');
            }

            Log::info('Paymob auth token obtained');
            return $response->json('token');
        } catch (Exception $e) {
            Log::error('Paymob token error: ' . $e->getMessage());
            throw $e;
        }
    }

    public function sendPayment(Order $order): array
    {
        try {
            Log::info('Sending payment for order: ' . $order->id);

            $integrations = array_filter([$this->mobileWalletId, $this->onlineCardId]);

            if (empty($integrations)) {
                Log::error('Payment methods not configured');
                return [
                    'status' => false,
                    'message' => __('website_response.payment_methods_not_configured')
                ];
            }

            $token = $this->getAuthToken();
            Log::info('Auth token retrieved for payment');

            $phone = $order->shippingAddress?->phone ?? $order->user->phone ?? null;

            if (empty($phone)) {
                Log::error('Paymob order creation failed - missing phone number', ['order_id' => $order->id]);
                return [
                    'status' => false,
                    'message' => __('website_response.paymob_phone_required')
                ];
            }

            $orderData = [
                'api_source' => 'INVOICE',
                'amount_cents' => $order->total_price * 100,
                'currency' => 'EGP',
                'integrations' => array_values($integrations),
                'shipping_data' => [
                    'first_name' => $order->user->name,
                    'last_name' => 'NA',
                    'email' => $order->user->email,
                    'phone_number' => $phone,
                ],
            ];

            Log::info('Paymob order data', $orderData);

            $response = Http::withHeaders([
                'Authorization' => "Bearer {$token}"
            ])->post("{$this->base_url}/ecommerce/orders", $orderData);

            Log::info('Paymob order creation response status: ' . $response->status());
            Log::info('Paymob order creation response body: ' . $response->body());

            if ($response->successful() && isset($response->json()['url'])) {
                Log::info('Paymob order created successfully, URL: ' . $response->json()['url']);
                return [
                    'status' => true,
                    'url' => $response->json()['url'],
                    'paymob_order_id' => $response->json()['id']
                ];
            }

            Log::info('Paymob order creation failed');
            return [
                'status' => false,
                'message' => __('website_response.payment_failed')
            ];
        } catch (Exception $e) {
            Log::error('Payment error: ' . $e->getMessage());
            return [
                'status' => false,
                'message' => __('website_response.payment_failed'),
                'url' => route('home')
            ];
        }
    }

    public function getOrderDetails(string $paymobOrderId): array
    {
        try {
            $token = $this->getAuthToken();

            Log::info('Retrieving Paymob order details: ' . $paymobOrderId);

            $response = Http::withHeaders([
                'Authorization' => "Bearer {$token}"
            ])->get("{$this->base_url}/ecommerce/orders/{$paymobOrderId}");

            if ($response->successful()) {
                $orderData = $response->json();

                Log::info('Order data retrieved', $orderData);

                $isPaid = isset($orderData['payment_status'])
                    && $orderData['payment_status'] === 'PAID';

                return [
                    'status' => true,
                    'order' => $orderData,
                    'is_paid' => $isPaid
                ];
            }

            Log::error('Failed to retrieve order details: ' . $response->body());
            return [
                'status' => false,
                'message' => __('website_response.payment_verification_failed')
            ];
        } catch (Exception $e) {
            Log::error('Order retrieval error: ' . $e->getMessage());
            return [
                'status' => false,
                'message' => __('website_response.payment_verification_failed')
            ];
        }
    }
}
