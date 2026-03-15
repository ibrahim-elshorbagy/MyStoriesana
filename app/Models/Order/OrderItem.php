<?php

namespace App\Models\Order;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;

class OrderItem extends Model
{
  protected $guarded = ['id'];

  protected $casts = [
    'value' => 'array',
  ];

  public function order(): BelongsTo
  {
    return $this->belongsTo(Order::class, 'order_id');
  }

  public function story(): BelongsTo
  {
    return $this->belongsTo(\App\Models\Admin\Story\Story::class, 'story_id');
  }
}
