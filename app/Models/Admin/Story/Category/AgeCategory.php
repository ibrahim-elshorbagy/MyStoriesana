<?php

namespace App\Models\Admin\Story\Category;

use Illuminate\Database\Eloquent\Model;

class AgeCategory extends Model
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

    protected $appends = ['name_value', 'image_value'];

    public function getNameValueAttribute(): string
    {
        return $this->getTranslatedValue($this->name ?? []);
    }

    public function getImageValueAttribute(): ?string
    {
        if (!$this->image) {
            return null;
        }

        // If image is already a full URL, return it
        if (str_starts_with($this->image, 'http')) {
            return $this->image;
        }

        // Otherwise, prepend storage path
        return asset('storage/' . $this->image);
    }
}
