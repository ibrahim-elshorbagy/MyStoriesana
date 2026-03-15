<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (!in_array(Schema::getConnection()->getDriverName(), ['mysql', 'mariadb'], true)) {
            return;
        }

        DB::statement("ALTER TABLE `orders` MODIFY `status` ENUM('pending','processing','printing','completed','cancelled') NOT NULL DEFAULT 'pending'");
    }

    public function down(): void
    {
        if (!in_array(Schema::getConnection()->getDriverName(), ['mysql', 'mariadb'], true)) {
            return;
        }

        DB::table('orders')
            ->where('status', 'printing')
            ->update(['status' => 'processing']);

        DB::statement("ALTER TABLE `orders` MODIFY `status` ENUM('pending','processing','completed','cancelled') NOT NULL DEFAULT 'pending'");
    }
};
