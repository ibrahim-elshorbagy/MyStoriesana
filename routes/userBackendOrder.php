<?php

use App\Http\Controllers\User\Order\UserOrderController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth'])->prefix('/dashboard')->group(function () {
    Route::get('/client/orders', [UserOrderController::class, 'index'])->name('user.orders.index');
    Route::get('/client/orders/{order}', [UserOrderController::class, 'show'])->name('user.orders.show');
});
