<?php

use App\Http\Controllers\Admin\AdminController;
use App\Http\Controllers\Admin\Management\UserManagementController;
use App\Http\Controllers\Admin\SiteSetting\SiteSettingsController;
use App\Http\Controllers\Admin\Story\Category\AgeCategoryController;
use App\Http\Controllers\Admin\SiteSetting\DeliveryOptionController;
use App\Http\Controllers\Admin\SiteSetting\CustomerFeedbackController;
use App\Http\Controllers\Admin\SiteSetting\DiscountController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth'])->group(function () {
  // Allow impersonated users to return to admin
  Route::post('/admin/return-to-admin', [AdminController::class, 'returnToAdmin'])->name('admin.return_to_admin');
});

Route::middleware(['auth', 'role:admin'])->prefix('/dashboard')->group(function () {
  // Admin impersonation routes
  Route::post('/admin/login-as/{user}', [AdminController::class, 'loginAs'])->name('admin.login_as');

  // Site Settings routes
  Route::get('/admin/site-settings', [SiteSettingsController::class, 'index'])->name('admin.site-settings.index');
  Route::post('/admin/site-settings', [SiteSettingsController::class, 'update'])->name('admin.site-settings.update');

  // User Management routes
  Route::get('/admin/users', [UserManagementController::class, 'index'])->name('admin.users.index');
  Route::post('/admin/users', [UserManagementController::class, 'store'])->name('admin.users.store');
  Route::put('/admin/users/{user}', [UserManagementController::class, 'update'])->name('admin.users.update');
  Route::delete('/admin/users/{user}', [UserManagementController::class, 'destroy'])->name('admin.users.destroy');

  // User Management bulk actions
  Route::patch('/admin/users/bulk/block', [UserManagementController::class, 'bulkBlock'])->name('admin.users.bulk.block');
  Route::patch('/admin/users/bulk/unblock', [UserManagementController::class, 'bulkUnblock'])->name('admin.users.bulk.unblock');
  Route::delete('/admin/users/bulk/delete', [UserManagementController::class, 'bulkDelete'])->name('admin.users.bulk.delete');

  // Age Categories routes
  Route::get('/admin/age-categories', [AgeCategoryController::class, 'index'])->name('admin.age-categories.index');
  Route::post('/admin/age-categories', [AgeCategoryController::class, 'store'])->name('admin.age-categories.store');
  Route::put('/admin/age-categories/{ageCategory}', [AgeCategoryController::class, 'update'])->name('admin.age-categories.update');
  Route::delete('/admin/age-categories/{ageCategory}', [AgeCategoryController::class, 'destroy'])->name('admin.age-categories.destroy');
  Route::delete('/admin/age-categories/bulk/delete', action: [AgeCategoryController::class, 'bulkDelete'])->name('admin.age-categories.bulk.delete');

  // Delivery Options routes
  Route::get('/admin/delivery-options', [DeliveryOptionController::class, 'index'])->name('admin.delivery-options.index');
  Route::post('/admin/delivery-options', [DeliveryOptionController::class, 'store'])->name('admin.delivery-options.store');
  Route::put('/admin/delivery-options/{deliveryOption}', [DeliveryOptionController::class, 'update'])->name('admin.delivery-options.update');
  Route::delete('/admin/delivery-options/{deliveryOption}', [DeliveryOptionController::class, 'destroy'])->name('admin.delivery-options.destroy');
  Route::delete('/admin/delivery-options/bulk/delete', action: [DeliveryOptionController::class, 'bulkDelete'])->name('admin.delivery-options.bulk.delete');

  // Customer Feedback routes
  Route::get('/admin/customer-feedbacks', [CustomerFeedbackController::class, 'index'])->name('admin.customer-feedbacks.index');
  Route::post('/admin/customer-feedbacks', [CustomerFeedbackController::class, 'store'])->name('admin.customer-feedbacks.store');
  Route::put('/admin/customer-feedbacks/{customerFeedback}', [CustomerFeedbackController::class, 'update'])->name('admin.customer-feedbacks.update');
  Route::delete('/admin/customer-feedbacks/{customerFeedback}', [CustomerFeedbackController::class, 'destroy'])->name('admin.customer-feedbacks.destroy');
  Route::delete('/admin/customer-feedbacks/bulk/delete', [CustomerFeedbackController::class, 'bulkDelete'])->name('admin.customer-feedbacks.bulk.delete');

  // Discount routes
  Route::get('/admin/discounts', [DiscountController::class, 'index'])->name('admin.discounts.index');
  Route::post('/admin/discounts', [DiscountController::class, 'store'])->name('admin.discounts.store');
  Route::put('/admin/discounts/{discount}', [DiscountController::class, 'update'])->name('admin.discounts.update');
  Route::delete('/admin/discounts/{discount}', [DiscountController::class, 'destroy'])->name('admin.discounts.destroy');
  Route::delete('/admin/discounts/bulk/delete', [DiscountController::class, 'bulkDelete'])->name('admin.discounts.bulk.delete');

});
