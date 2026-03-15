<?php

namespace App\Models\Order;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class OrderItemShippingAddress extends Model
{
  protected $guarded = ['id'];

  public function orderItem(): BelongsTo
  {
    return $this->belongsTo(OrderItem::class, 'order_item_id');
  }

  public function deliveryOption(): BelongsTo
  {
    return $this->belongsTo(\App\Models\Admin\SiteSetting\DeliveryOption::class, 'delivery_option_id');
  }
}
