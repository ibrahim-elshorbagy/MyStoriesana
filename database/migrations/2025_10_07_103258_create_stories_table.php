<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
  /**
   * Run the migrations.
   */
  public function up(): void
  {
    Schema::create('stories', function (Blueprint $table) {
      $table->id();
      $table->json('title')->nullable(); // {ar: '', en: ''}
      $table->json('content')->nullable(); // {ar: '', en: ''}
      $table->json('excerpt')->nullable(); // {ar: '', en: ''}
      $table->enum('status', ['draft', 'published', 'archived'])->default('draft');
      $table->foreignId('category_id')->nullable()->constrained('age_categories')->onDelete('set null');
      $table->unsignedTinyInteger('gender')->nullable(); //0->boy 1->girl

      // Cover images for Arabic and English
      $table->string('cover_image_ar')->nullable();
      $table->string('cover_image_en')->nullable();

      // Gallery images for Arabic and English (JSON array of image paths)
      $table->json('gallery_images_ar')->nullable();
      $table->json('gallery_images_en')->nullable();

      // PDFs for Arabic and English
      $table->string('pdf_ar')->nullable();
      $table->string('pdf_en')->nullable();

      $table->timestamps();
    });
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void
  {
    Schema::dropIfExists('stories');
  }
};
