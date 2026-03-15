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
        Schema::table('cart_items', function (Blueprint $table) {
            $table->unsignedTinyInteger('story_theme')->nullable()->default(null)->after('format');
        });

        Schema::table('order_items', function (Blueprint $table) {
            $table->unsignedTinyInteger('story_theme')->nullable()->default(null)->after('format');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('cart_items', function (Blueprint $table) {
            $table->dropColumn('story_theme');
        });

        Schema::table('order_items', function (Blueprint $table) {
            $table->dropColumn('story_theme');
        });
    }
};
