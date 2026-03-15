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
        Schema::table('order_shipping_addresses', function (Blueprint $table) {
            if (Schema::hasColumn('order_shipping_addresses', 'area')) {
                $table->dropColumn('area');
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('order_shipping_addresses', function (Blueprint $table) {
            $table->string('area')->nullable();
        });
    }
};
