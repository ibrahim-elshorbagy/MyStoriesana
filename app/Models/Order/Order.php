<?php

namespace App\Models\Order;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use App\Models\Order\Payment;
use App\Models\Order\OrderShippingAddress;

class Order extends Model
{
  protected $guarded = ['id'];

  protected $casts = [
    'discount_value' => 'decimal:2',
    'subtotal' => 'decimal:2',
    'delivery_total' => 'decimal:2',
    'total_price' => 'decimal:2',
    'payment_reminder_sent_at' => 'datetime',
  ];

  public function user(): BelongsTo
  {
    return $this->belongsTo(\App\Models\User::class);
  }

  public function payments(): HasMany
  {
    return $this->hasMany(Payment::class);
  }

  public function orderItems(): HasMany
  {
    return $this->hasMany(OrderItem::class);
  }

  public function shippingAddress(): HasOne
  {
    return $this->hasOne(OrderShippingAddress::class, 'order_id');
  }
}
