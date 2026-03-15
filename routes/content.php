<?php

use App\Http\Controllers\Admin\SiteSetting\StaticPagesController;
use App\Http\Controllers\Admin\SiteSetting\StaticPagesCategoryController;
use App\Http\Controllers\Admin\SiteSetting\FaqController;
use App\Http\Controllers\Admin\SiteSetting\FaqCategoryController;
use Illuminate\Support\Facades\Route;


Route::middleware(['auth', 'role:admin'])->prefix('/dashboard')->group(function () {
 // Static Pages Management
  Route::get('/admin/static-pages', [StaticPagesController::class, 'index'])->name('admin.static-pages.index');
  Route::get('/admin/static-pages/create', [StaticPagesController::class, 'create'])->name('admin.static-pages.create');
  Route::post('/admin/static-pages', [StaticPagesController::class, 'store'])->name('admin.static-pages.store');
  Route::get('/admin/static-pages/{staticPage}/edit', [StaticPagesController::class, 'edit'])->name('admin.static-pages.edit');
  Route::put('/admin/static-pages/{staticPage}', [StaticPagesController::class, 'update'])->name('admin.static-pages.update');
  Route::delete('/admin/static-pages/{staticPage}', [StaticPagesController::class, 'destroy'])->name('admin.static-pages.destroy');

  // Static Pages bulk actions
  Route::patch('/admin/static-pages/bulk/publish', [StaticPagesController::class, 'bulkPublish'])->name('admin.static-pages.bulk.publish');
  Route::patch('/admin/static-pages/bulk/archive', [StaticPagesController::class, 'bulkArchive'])->name('admin.static-pages.bulk.archive');
  Route::delete('/admin/static-pages/bulk/delete', [StaticPagesController::class, 'bulkDelete'])->name('admin.static-pages.bulk.delete');

  // Static Pages Categories Management
  Route::get('/admin/static-pages-categories', [StaticPagesCategoryController::class, 'index'])->name('admin.static-pages-categories.index');
  Route::post('/admin/static-pages-categories', [StaticPagesCategoryController::class, 'store'])->name('admin.static-pages-categories.store');
  Route::put('/admin/static-pages-categories/{staticPageCategory}', [StaticPagesCategoryController::class, 'update'])->name('admin.static-pages-categories.update');
  Route::delete('/admin/static-pages-categories/{staticPageCategory}', [StaticPagesCategoryController::class, 'destroy'])->name('admin.static-pages-categories.destroy');

  // Static Pages Categories bulk actions
  Route::delete('/admin/static-pages-categories/bulk/delete', [StaticPagesCategoryController::class, 'bulkDelete'])->name('admin.static-pages-categories.bulk.delete');

  // FAQ Categories Management
  Route::get('/admin/faq-categories', [FaqCategoryController::class, 'index'])->name('admin.faq-categories.index');
  Route::post('/admin/faq-categories', [FaqCategoryController::class, 'store'])->name('admin.faq-categories.store');
  Route::put('/admin/faq-categories/{faqCategory}', [FaqCategoryController::class, 'update'])->name('admin.faq-categories.update');
  Route::delete('/admin/faq-categories/{faqCategory}', [FaqCategoryController::class, 'destroy'])->name('admin.faq-categories.destroy');

  // FAQ Categories bulk actions
  Route::delete('/admin/faq-categories/bulk/delete', [FaqCategoryController::class, 'bulkDelete'])->name('admin.faq-categories.bulk.delete');

  // FAQ Management
  Route::get('/admin/faq', [FaqController::class, 'index'])->name('admin.faq.index');
  Route::get('/admin/faq/create', [FaqController::class, 'create'])->name('admin.faq.create');
  Route::post('/admin/faq', [FaqController::class, 'store'])->name('admin.faq.store');
  Route::get('/admin/faq/{faq}/edit', [FaqController::class, 'edit'])->name('admin.faq.edit');
  Route::put('/admin/faq/{faq}', [FaqController::class, 'update'])->name('admin.faq.update');
  Route::delete('/admin/faq/{faq}', [FaqController::class, 'destroy'])->name('admin.faq.destroy');

  // FAQ bulk actions
  Route::delete('/admin/faq/bulk/delete', [FaqController::class, 'bulkDelete'])->name('admin.faq.bulk.delete');
  Route::patch('/admin/faq/{faq}/toggle-show-in-home', [FaqController::class, 'toggleShowInHome'])->name('admin.faq.toggle.show-in-home');
  Route::post('/admin/faq/bulk/toggle-show-in-home', [FaqController::class, 'bulkToggleShowInHome'])->name('admin.faq.bulk.toggle.show-in-home');

});
