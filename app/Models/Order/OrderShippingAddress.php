<?php

namespace App\Models\Order;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class OrderShippingAddress extends Model
{
  protected $guarded = ['id'];

  public function order(): BelongsTo
  {
    return $this->belongsTo(Order::class, 'order_id');
  }

  public function deliveryOption(): BelongsTo
  {
    return $this->belongsTo(\App\Models\Admin\SiteSetting\DeliveryOption::class, 'delivery_option_id');
  }
}
