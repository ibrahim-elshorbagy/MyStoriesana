<?php

namespace App\Models\Order;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;

class CartItem extends Model
{
  protected $guarded = ['id'];

  protected $casts = [
    'value' => 'array',
  ];

  public function cart(): BelongsTo
  {
    return $this->belongsTo(Cart::class, 'cart_id');
  }

  public function story(): BelongsTo
  {
    return $this->belongsTo(\App\Models\Admin\Story\Story::class, 'story_id');
  }
}
