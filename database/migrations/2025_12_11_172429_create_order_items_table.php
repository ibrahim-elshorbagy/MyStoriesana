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
        Schema::create('order_items', function (Blueprint $table) {
            $table->id();
            $table->foreignId('order_id')->constrained('orders')->onDelete('cascade');
            $table->foreignId('story_id')->nullable()->constrained('stories')->onDelete('set null');
            $table->string('child_name');
            $table->integer('child_age');
            $table->string('language');
            $table->string('child_gender');
            $table->string('format');
            $table->json('value')->nullable();
            $table->text('custom_value')->nullable();
            $table->string('child_image_path')->nullable();
            $table->string('face_swap_image_path')->nullable();
            $table->decimal('story_price', 8, 2);
            $table->decimal('delivery_price', 8, 2)->default(0);
            $table->decimal('total_price', 10, 2);
            $table->string('pdf_path')->nullable();
            $table->string('hair_color')->nullable();
            $table->string('hair_style')->nullable();
            $table->string('eye_color')->nullable();
            $table->string('skin_tone')->nullable();
            $table->text('clothing_description')->nullable();
            $table->text('customer_note')->nullable();
            $table->text('accessory_description')->nullable();
            $table->text('personality_traits')->nullable();
            $table->text('moral_value')->nullable();
            $table->string('status')->default('pending');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('order_items');
    }
};
