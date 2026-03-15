<?php

namespace App\Models\Admin\SiteSetting;

use Illuminate\Database\Eloquent\Model;

class CustomerFeedback extends Model
{
    protected $fillable = [
        'customer_feedback',
        'image',
        'video',
    ];
}
