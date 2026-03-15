<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('orders', function (Blueprint $table) {
            $table->dropForeign(['story_id']);
            $table->dropColumn([
                'story_id',
                'child_name', 'child_age', 'language', 'child_gender',
                'format', 'value', 'custom_value',
                'child_image_path', 'face_swap_image_path',
                'hair_color', 'hair_style', 'eye_color', 'skin_tone',
                'clothing_description', 'customer_note',
                'story_price', 'delivery_price',
                'accessory_description', 'personality_traits', 'moral_value'
            ]);
        });
    }

    public function down(): void
    {
        Schema::table('orders', function (Blueprint $table) {
            // Note: Rollback would require recreating dropped columns with original types
            // For simplicity, leaving down empty as this is a destructive migration
        });
    }
};
