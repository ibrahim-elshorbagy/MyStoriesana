<?php

namespace App\Models\Order;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class CartItemShippingAddress extends Model
{
  protected $guarded = ['id'];

  public function cartItem(): BelongsTo
  {
    return $this->belongsTo(CartItem::class, 'cart_item_id');
  }

  public function deliveryOption(): BelongsTo
  {
    return $this->belongsTo(\App\Models\Admin\SiteSetting\DeliveryOption::class, 'delivery_option_id');
  }
}
