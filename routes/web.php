<?php

use App\Http\Controllers\Api\Agents\ReportAgentController;
use App\Http\Controllers\Frontend\StoryController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\PreferencesController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\User\Settings\UserSettingsController;
use App\Http\Controllers\User\UserController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [HomeController::class, 'home'])->name('home');

// Static Pages
Route::get('/page/{id}', [UserController::class, 'staticPage'])->name('static-page');

// FAQ Page
Route::get('/faqs', [HomeController::class, 'FaqPage'])->name('faqs');

// Stories
Route::get('/stories', [StoryController::class, 'index'])->name('stories');
Route::get('/stories/{story}', [StoryController::class, 'show'])->name('story.show');

Route::get('/dashboard', function () {
  return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->prefix('/dashboard')->group(function () {

  Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
  Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
  Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
  Route::post('/profile/image', [ProfileController::class, 'uploadProfileImage'])->name('profile.image.update');

});
// User preferences routes
Route::any('/locale', [PreferencesController::class, 'changeLocale'])->name('locale.change');

require __DIR__ . '/auth.php';
require __DIR__ . '/admin.php';
require __DIR__ . '/content.php';
require __DIR__ . '/story.php';
require __DIR__ . '/frontendOrder.php';
require __DIR__ . '/backendOrder.php';
require __DIR__ . '/userBackendOrder.php';



