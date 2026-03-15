<?php

namespace App\Models\Admin\SiteSetting;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class DiscountUsage extends Model
{
  protected $guarded = ['id'];

  public function discount(): BelongsTo
  {
    return $this->belongsTo(Discount::class);
  }

  public function user(): BelongsTo
  {
    return $this->belongsTo(\App\Models\User::class);
  }
}
