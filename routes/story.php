<?php

use App\Http\Controllers\Admin\Story\Category\AgeCategoryController;
use App\Http\Controllers\Admin\Story\StoryController;
use Illuminate\Support\Facades\Route;


Route::middleware(['auth', 'role:admin'])->prefix('/dashboard')->group(function () {

  // Age Categories routes
  Route::get('/admin/age-categories', [AgeCategoryController::class, 'index'])->name('admin.age-categories.index');
  Route::post('/admin/age-categories', [AgeCategoryController::class, 'store'])->name('admin.age-categories.store');
  Route::put('/admin/age-categories/{ageCategory}', [AgeCategoryController::class, 'update'])->name('admin.age-categories.update');
  Route::delete('/admin/age-categories/{ageCategory}', [AgeCategoryController::class, 'destroy'])->name('admin.age-categories.destroy');
  Route::delete('/admin/age-categories/bulk/delete', [AgeCategoryController::class, 'bulkDelete'])->name('admin.age-categories.bulk.delete');

  // Stories routes
  Route::get('/admin/stories', [StoryController::class, 'index'])->name('admin.stories.index');
  Route::get('/admin/stories/create', [StoryController::class, 'create'])->name('admin.stories.create');
  Route::post('/admin/stories', [StoryController::class, 'store'])->name('admin.stories.store');
  Route::get('/admin/stories/{story}/edit', [StoryController::class, 'edit'])->name('admin.stories.edit');
  Route::post('/admin/stories/{story}', [StoryController::class, 'update'])->name('admin.stories.update');
  Route::delete('/admin/stories/{story}', [StoryController::class, 'destroy'])->name('admin.stories.destroy');

  // Bulk actions for stories
  Route::post('/admin/stories/bulk/publish', [StoryController::class, 'bulkPublish'])->name('admin.stories.bulk.publish');
  Route::post('/admin/stories/bulk/archive', [StoryController::class, 'bulkArchive'])->name('admin.stories.bulk.archive');
  Route::delete('/admin/stories/bulk/delete', [StoryController::class, 'bulkDelete'])->name('admin.stories.bulk.delete');

});
