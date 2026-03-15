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
            // Add German fields: cover image, gallery images (json), pdf
            if (!Schema::hasColumn('stories', 'cover_image_de')) {
                $table->string('cover_image_de')->nullable()->after('cover_image_en');
            }

            if (!Schema::hasColumn('stories', 'gallery_images_de')) {
                $table->json('gallery_images_de')->nullable()->after('gallery_images_en');
            }

            if (!Schema::hasColumn('stories', 'pdf_de')) {
                $table->string('pdf_de')->nullable()->after('pdf_en');
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('stories', function (Blueprint $table) {
            // Drop the German columns if they exist
            if (Schema::hasColumn('stories', 'cover_image_de')) {
                $table->dropColumn('cover_image_de');
            }

            if (Schema::hasColumn('stories', 'gallery_images_de')) {
                $table->dropColumn('gallery_images_de');
            }

            if (Schema::hasColumn('stories', 'pdf_de')) {
                $table->dropColumn('pdf_de');
            }
        });
    }
};
