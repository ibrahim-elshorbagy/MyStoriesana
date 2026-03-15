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
    Schema::create('static_pages', function (Blueprint $table) {
      $table->id();
      $table->json('title'); // {ar: '', en: ''}
      $table->json('content'); // {ar: '', en: ''}
      $table->enum('status', ['draft', 'published', 'archived'])->default('draft');
      $table->foreignId('category_id')->nullable()->constrained('static_page_categories')->onDelete('set null');
      $table->timestamps();
    });
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void
  {
    Schema::dropIfExists('static_pages');
  }
};
