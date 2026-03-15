<?php

namespace App\Models\Order;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Models\Admin\SiteSetting\DeliveryOption;

class ShippingAddress extends Model
{
  protected $guarded = ['id'];

  public function order(): BelongsTo
  {
    return $this->belongsTo(Order::class);
  }

  public function deliveryOption(): BelongsTo
  {
    return $this->belongsTo(DeliveryOption::class);
  }
}
