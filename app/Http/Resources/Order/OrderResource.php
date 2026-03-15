<?php

namespace App\Http\Resources\Order;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class OrderResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $subtotal = (float) $this->orderItems->sum('story_price');
        $deliveryTotal = (float) ($this->shippingAddress?->deliveryOption?->price ?? 0);
        $discountValue = (float) ($this->discount_value ?? 0);
        $totalPrice = $subtotal + $deliveryTotal - $discountValue;

        return [
            'id' => $this->id,
            'row_number' => $this->row_number ?? null,
            'user_id' => $this->user_id,
            'status' => $this->status,
            'payment_method' => $this->payment_method,
            'subtotal' => $subtotal,
            'delivery_total' => $deliveryTotal,
            'discount_code' => $this->discount_code,
            'discount_value' => $discountValue,
            'total_price' => $totalPrice,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'user' => $this->whenLoaded('user', function() {
                return $this->user ? [
                    'id' => $this->user->id,
                    'name' => $this->user->name,
                    'email' => $this->user->email,
                    'phone' => $this->user->phone,
                ] : null;
            }),
            'payments' => $this->whenLoaded('payments'),
            'shipping_address' => $this->whenLoaded('shippingAddress', function() {
                return $this->shippingAddress
                    ? OrderShippingAddressResource::make($this->shippingAddress)->toArray(request())
                    : null;
            }),
            'order_items' => OrderItemResource::collection($this->whenLoaded('orderItems'))->toArray($request),
        ];
    }
}
