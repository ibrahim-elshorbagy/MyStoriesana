<?php

namespace App\Models\Admin\SiteSetting;

use Illuminate\Database\Eloquent\Model;

class Faq extends Model
{

  protected $guarded = ['id'];
  protected $casts = [
    'question' => 'array',
    'answer' => 'array',
  ];

  protected function getTranslatedValue(array $translations): string
  {
    $locale = app()->getLocale();
    return $translations[$locale] ?? $translations['en'] ?? '';
  }

  protected $appends = ['question_value', 'answer_value'];

  public function getQuestionValueAttribute(): string
  {
    return $this->getTranslatedValue($this->question ?? []);
  }

  public function getAnswerValueAttribute(): string
  {
    return $this->getTranslatedValue($this->answer ?? []);
  }

  public function category()
  {
    return $this->belongsTo(FaqCategory::class, 'category_id');
  }
}
