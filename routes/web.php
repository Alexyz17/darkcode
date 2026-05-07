<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\DownloadController;
use App\Http\Controllers\GumroadWebhookController;
use App\Http\Middleware\AdminMiddleware;

Route::get('/', fn () => Inertia::render('Home'));

// Auth
Route::middleware('guest')->group(function () {
    Route::get('/login', [AuthController::class, 'showLogin'])->name('login');
    Route::post('/login', [AuthController::class, 'login']);
    Route::get('/register', [AuthController::class, 'showRegister'])->name('register');
    Route::post('/register', [AuthController::class, 'register']);
});

Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth')->name('logout');

Route::middleware('auth')->group(function () {
    Route::get('/dashboard', fn () => Inertia::render('Dashboard'))->name('dashboard');
    Route::get('/downloads/checklist', [DownloadController::class, 'checklist'])->name('download.checklist');
});

// Admin
Route::middleware(['auth', AdminMiddleware::class])->prefix('admin')->group(function () {
    Route::get('/', [AdminController::class, 'index'])->name('admin.index');
    Route::patch('/users/{user}/role', [AdminController::class, 'updateRole']);
});

// Páginas públicas
Route::get('/contenido', fn () => Inertia::render('Content'));
Route::get('/beta', fn () => Inertia::render('Beta'));
Route::get('/productos', fn () => Inertia::render('Productos'));
Route::get('/apoya', fn () => Inertia::render('Apoya'));

// Webhooks (sin CSRF)
Route::post('/webhooks/gumroad', [GumroadWebhookController::class, 'handle'])
    ->withoutMiddleware([\Illuminate\Foundation\Http\Middleware\VerifyCsrfToken::class]);

// Legal
Route::get('/privacidad', fn () => Inertia::render('Privacidad'));
Route::get('/terminos', fn () => Inertia::render('Terminos'));
Route::get('/cookies', fn () => Inertia::render('Cookies'));

// 404
Route::fallback(fn () => Inertia::render('NotFound')->toResponse(request())->setStatusCode(404));
