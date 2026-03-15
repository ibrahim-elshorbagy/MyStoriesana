<?php

use App\Http\Controllers\Admin\Order\OrderController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'role:admin'])->prefix('/dashboard')->group(function () {
  // Orders routes
  Route::get('/admin/orders', [OrderController::class, 'index'])->name('admin.orders.index');
  Route::get('/admin/orders/{order}', [OrderController::class, 'show'])->name('admin.orders.show');

  // Order management routes
  Route::put('/admin/orders/{order}/payment-status', [OrderController::class, 'updatePaymentStatus'])->name('admin.orders.update-payment-status');
  Route::post('/admin/orders/{order}/notify-payment-status', [OrderController::class, 'notifyPaymentStatus'])->name('admin.orders.notify-payment-status');
  Route::put('/admin/orders/{order}/status', [OrderController::class, 'updateStatus'])->name('admin.orders.update-status');
  Route::post('/admin/orders/{order}/notify-status', [OrderController::class, 'notifyStatus'])->name('admin.orders.notify-status');
  Route::post('/admin/orders/order-items/{orderItem}/upload-pdf', [OrderController::class, 'uploadPDF'])->name('admin.orders.upload-pdf');
  Route::post('/admin/orders/order-items/{orderItem}/notify-pdf', [OrderController::class, 'notifyPDF'])->name('admin.orders.notify-pdf');
});
