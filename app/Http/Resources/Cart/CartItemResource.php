<?php

namespace App\Http\Resources\Cart;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CartItemResource extends JsonResource
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
            'cart_id' => $this->cart_id,
            'story_id' => $this->story_id,
            'child_name' => $this->child_name,
            'child_age' => $this->child_age,
            'language' => $this->language,
            'child_gender' => $this->child_gender,
            'format' => $this->format,
            'story_theme' => $this->story_theme,
            'value' => $this->value,
            'custom_value' => $this->custom_value,
            'child_image_path' => $this->child_image_path,
            'face_swap_image_path' => $this->face_swap_image_path,
            'story_price' => $this->story_price,
            'hair_color' => $this->hair_color,
            'hair_style' => $this->hair_style,
            'eye_color' => $this->eye_color,
            'skin_tone' => $this->skin_tone,
            'clothing_description' => $this->clothing_description,
            'customer_note' => $this->customer_note,
            'accessory_description' => $this->accessory_description,
            'personality_traits' => $this->personality_traits,
            'moral_value' => $this->moral_value,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,

            // Relationships
            'story' => $this->whenLoaded('story', function() {
                return $this->story ? [
                    'id' => $this->story->id,
                    'title_value' => $this->story->title_value,
                    'cover_image_ar' => $this->story->cover_image_ar,
                ] : null;
            }),
        ];
    }
}
