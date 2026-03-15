<?php

namespace App\Models\Admin\SiteSetting;

use Illuminate\Database\Eloquent\Model;

class FaqCategory extends Model
{
  protected $guarded = ['id'];


  protected $casts = [
    'name' => 'array',
  ];

  protected function getTranslatedValue(array $translations): string
  {
    $locale = app()->getLocale();
    return $translations[$locale] ?? $translations['en'] ?? '';
  }

  protected $appends = ['name_value'];

  public function getNameValueAttribute(): string
  {
    return $this->getTranslatedValue($this->name ?? []);
  }

  public function faqs()
  {
    return $this->hasMany(Faq::class, 'category_id');
  }
}
