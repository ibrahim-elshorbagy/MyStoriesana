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
        Schema::dropIfExists('shipping_addresses');
    }

    public function down(): void
    {
        // Note: Cannot recreate dropped table without knowing exact schema
        // This migration is destructive
    }
};
