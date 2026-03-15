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
        Schema::table('stories', function (Blueprint $table) {
            // Gallery videos for Arabic, English and German (JSON array of video paths)
            $table->json('gallery_videos_ar')->nullable()->after('gallery_images_de');
            $table->json('gallery_videos_en')->nullable()->after('gallery_videos_ar');
            $table->json('gallery_videos_de')->nullable()->after('gallery_videos_en');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('stories', function (Blueprint $table) {
            $table->dropColumn(['gallery_videos_ar', 'gallery_videos_en', 'gallery_videos_de']);
        });
    }
};
