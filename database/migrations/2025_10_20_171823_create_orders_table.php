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
    Schema::create('orders', function (Blueprint $table) {
      $table->id();
      $table->foreignId('user_id')->constrained()->onDelete('cascade');

      // Child info
      $table->string('child_name');
      $table->integer('child_age');
      $table->enum('language', ['arabic', 'english']);
      $table->enum('child_gender', ['boy', 'girl']);

      $table->enum('format', ['first_plan', 'second_plan', 'third_plan']);
      $table->json('value')->nullable();
      $table->text('custom_value')->nullable();

      // Child's uploaded image
      $table->string('child_image_path')->nullable();

      // PDF file path
      $table->string('pdf_path')->nullable();

      // Nullable foreign key to stories if user customized a story
      $table->foreignId('story_id')->nullable()->constrained('stories')->onDelete('set null');
      $table->string('face_swap_image_path')->nullable();

      $table->enum('status', ['pending', 'processing', 'completed', 'cancelled'])->default('pending');
      $table->enum('payment_method', ['paymob', 'cod'])->default('cod');

      $table->decimal('story_price', 8, 2);
      $table->decimal('delivery_price', 8, 2)->default(0);
      $table->decimal('total_price', 10, 2);

      $table->text('customer_note')->nullable();

      // Additional optional fields for customization
      $table->string('hair_color')->nullable();
      $table->string('hair_style')->nullable();
      $table->string('eye_color')->nullable();
      $table->string('skin_tone')->nullable();
      $table->text('clothing_description')->nullable();
      $table->text('accessory_description')->nullable();
      $table->text('personality_traits')->nullable();
      $table->text('moral_value')->nullable();

      $table->timestamps();
    });

  }

  /**
   * Reverse the migrations.
   */
  public function down(): void
  {
    Schema::dropIfExists('orders');
  }
};
