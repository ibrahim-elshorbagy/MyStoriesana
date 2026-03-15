<?php

namespace App\Models\Admin\SiteSetting;

use Illuminate\Database\Eloquent\Model;

class StaticPage extends Model
{
  protected $guarded = ['id'];

  protected $casts = [
    'title' => 'array',
    'content' => 'array',
  ];

  protected function getTranslatedValue(array $translations): string
  {
    $locale = app()->getLocale();
    return $translations[$locale] ?? $translations['en'] ?? '';
  }

  protected $appends = ['title_value', 'content_value'];

  public function getTitleValueAttribute(): string
  {
    return $this->getTranslatedValue($this->title ?? []);
  }

  public function getContentValueAttribute(): string
  {
    return $this->getTranslatedValue($this->content ?? []);
  }

  public function category()
  {
    return $this->belongsTo(StaticPageCategory::class, 'category_id');
  }

}
