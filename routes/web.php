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

// Catálogo de cursos
Route::get('/cursos', fn () => Inertia::render('Courses/Index'))->name('cursos');

// Lecciones gratuitas
Route::prefix('lecciones')->name('lecciones.')->group(function () {
    Route::get('/linux-esencial',  fn () => Inertia::render('Lecciones/LinuxEsencial'))->name('linux-esencial');
    Route::get('/comandos-linux',  fn () => Inertia::render('Lecciones/ComandosLinux'))->name('comandos-linux');
    Route::get('/shell-scripting', fn () => Inertia::render('Lecciones/ShellScripting'))->name('shell-scripting');
    Route::get('/laravel',         fn () => Inertia::render('Lecciones/LaravelPrimeros'))->name('laravel');
    Route::get('/seguridad-web',   fn () => Inertia::render('Lecciones/SeguridadWeb'))->name('seguridad-web');

    // Lecciones premium — contenido completo para premium/admin, teaser para el resto
    Route::get('/docker', function () {
        $isPremium = auth()->check() && in_array(auth()->user()->role, ['premium', 'admin']);
        return Inertia::render($isPremium ? 'Lecciones/Docker' : 'Lecciones/DockerTeaser');
    })->name('docker');

    Route::get('/n8n', function () {
        $isPremium = auth()->check() && in_array(auth()->user()->role, ['premium', 'admin']);
        return Inertia::render($isPremium ? 'Lecciones/N8n' : 'Lecciones/N8nTeaser');
    })->name('n8n');

    Route::get('/ia-programacion', function () {
        $isPremium = auth()->check() && in_array(auth()->user()->role, ['premium', 'admin']);
        return Inertia::render($isPremium ? 'Lecciones/IAProgramacion' : 'Lecciones/IATeaser');
    })->name('ia-programacion');
});

// Webhooks (sin CSRF)
Route::post('/webhooks/gumroad', [GumroadWebhookController::class, 'handle'])
    ->withoutMiddleware([\Illuminate\Foundation\Http\Middleware\VerifyCsrfToken::class]);

// Legal
Route::get('/privacidad', fn () => Inertia::render('Privacidad'));
Route::get('/terminos', fn () => Inertia::render('Terminos'));
Route::get('/cookies', fn () => Inertia::render('Cookies'));

// 404
Route::fallback(fn () => Inertia::render('NotFound')->toResponse(request())->setStatusCode(404));
