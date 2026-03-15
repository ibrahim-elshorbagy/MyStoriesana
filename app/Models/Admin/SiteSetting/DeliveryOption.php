<?php

namespace App\Models\Admin\SiteSetting;

use Illuminate\Database\Eloquent\Model;

class DeliveryOption extends Model
{
  protected $guarded = ['id'];

  protected $casts = [
    'city' => 'array',
  ];

  protected function getTranslatedValue(array $translations): string
  {
    $locale = app()->getLocale();
    return $translations[$locale] ?? $translations['en'] ?? '';
  }

  protected $appends = ['city_value'];

  public function getCityValueAttribute(): string
  {
    return $this->getTranslatedValue($this->city ?? []);
  }
}
