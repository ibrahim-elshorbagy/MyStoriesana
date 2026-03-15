<?php

namespace App\Http\Resources\Cart;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CartItemShippingAddressResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'delivery_option_id' => $this->delivery_option_id,
            'area' => $this->area,
            'street' => $this->street,
            'house_number' => $this->house_number,
            'additional_info' => $this->additional_info,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,

            // Relationships
            'delivery_option' => $this->whenLoaded('deliveryOption'),
        ];
    }
}
