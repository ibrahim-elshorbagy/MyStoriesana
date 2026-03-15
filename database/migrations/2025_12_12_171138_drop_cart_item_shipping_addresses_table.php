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
        Schema::dropIfExists('cart_item_shipping_addresses');
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Cannot recreate dropped table without knowing exact schema
        // This migration is destructive
    }
};
