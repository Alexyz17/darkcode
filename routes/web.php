<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\DownloadController;
use App\Http\Controllers\GumroadWebhookController;
use App\Http\Controllers\PasswordResetController;
use App\Http\Controllers\SocialAuthController;
use App\Http\Controllers\GameController;
use App\Http\Controllers\LeaderboardController;
use App\Http\Middleware\AdminMiddleware;

Route::get('/', fn () => Inertia::render('Home'));

// Auth
Route::middleware('guest')->group(function () {
    Route::get('/login', [AuthController::class, 'showLogin'])->name('login');
    Route::post('/login', [AuthController::class, 'login']);
    Route::get('/register', [AuthController::class, 'showRegister'])->name('register');
    Route::post('/register', [AuthController::class, 'register']);

    // Password reset
    Route::get('/forgot-password', [PasswordResetController::class, 'showForgotPassword'])->name('password.request');
    Route::post('/forgot-password', [PasswordResetController::class, 'sendResetLink'])->name('password.email');
    Route::get('/reset-password/{token}', [PasswordResetController::class, 'showResetPassword'])->name('password.reset');
    Route::post('/reset-password', [PasswordResetController::class, 'resetPassword'])->name('password.update');
});

// Google OAuth (no guest middleware — Socialite manages the redirect itself)
Route::get('/auth/google', [SocialAuthController::class, 'redirectToGoogle'])->name('auth.google');
Route::get('/auth/google/callback', [SocialAuthController::class, 'handleGoogleCallback'])->name('auth.google.callback');

Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth')->name('logout');

Route::middleware('auth')->group(function () {
    Route::get('/dashboard', fn () => Inertia::render('Dashboard'))->name('dashboard');
    Route::get('/downloads/checklist', [DownloadController::class, 'checklist'])->name('download.checklist');
});

// Admin
Route::middleware(['auth', AdminMiddleware::class])->prefix('admin')->group(function () {
    Route::get('/', [AdminController::class, 'index'])->name('admin.index');
    Route::patch('/users/{user}/role', [AdminController::class, 'updateRole']);

    Route::get('/env-check', function () {
        $required = [
            'APP_KEY', 'APP_URL', 'DB_CONNECTION',
            'GOOGLE_CLIENT_ID', 'GOOGLE_CLIENT_SECRET',
            'MAIL_MAILER', 'RESEND_API_KEY', 'MAIL_FROM_ADDRESS',
        ];

        $status = collect($required)->mapWithKeys(fn ($key) => [
            $key => [
                'set'   => ! empty(env($key)),
                'value' => in_array($key, ['APP_KEY', 'GOOGLE_CLIENT_SECRET', 'RESEND_API_KEY'])
                    ? (empty(env($key)) ? 'MISSING' : '***hidden***')
                    : (empty(env($key)) ? 'MISSING' : env($key)),
            ],
        ]);

        return response()->json([
            'google_redirect_computed' => config('services.google.redirect'),
            'mail_mailer'              => config('mail.default'),
            'env_vars'                 => $status,
        ]);
    })->name('admin.env-check');
});

// Páginas públicas
Route::get('/contenido', fn () => Inertia::render('Content'));
Route::get('/beta', fn () => Inertia::render('Beta'));
Route::get('/productos', fn () => Inertia::render('Productos'));
Route::get('/apoya', fn () => Inertia::render('Apoya'));
Route::get('/contacto', fn () => Inertia::render('Contact'));

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

    Route::get('/eloquent',           fn () => Inertia::render('Lecciones/EloquentTeaser'))->name('eloquent');
    Route::get('/apis-rest',          fn () => Inertia::render('Lecciones/ApisRestTeaser'))->name('apis-rest');
    Route::get('/maquinas-virtuales', fn () => Inertia::render('Lecciones/MaquinasVirtualesTeaser'))->name('maquinas-virtuales');
    Route::get('/fine-tuning',        fn () => Inertia::render('Lecciones/FineTuningTeaser'))->name('fine-tuning');

    // Python
    Route::get('/python-basico',       fn () => Inertia::render('Lecciones/PythonBasico'))->name('python-basico');
    Route::get('/python-avanzado', fn () => Inertia::render('Lecciones/PythonAvanzado'))->name('python-avanzado');

    // JavaScript / TypeScript
    Route::get('/javascript-moderno',  fn () => Inertia::render('Lecciones/JavaScriptModerno'))->name('javascript-moderno');
    Route::get('/typescript-basico',   fn () => Inertia::render('Lecciones/TypeScriptBasico'))->name('typescript-basico');
    Route::get('/git-esencial',        fn () => Inertia::render('Lecciones/GitEsencial'))->name('git-esencial');

    // Mobile — premium
    Route::get('/kotlin-android', function () {
        $isPremium = auth()->check() && in_array(auth()->user()->role, ['premium', 'admin']);
        return Inertia::render($isPremium ? 'Lecciones/KotlinAndroid' : 'Lecciones/KotlinAndroidTeaser');
    })->name('kotlin-android');

    Route::get('/swift-ios', function () {
        $isPremium = auth()->check() && in_array(auth()->user()->role, ['premium', 'admin']);
        return Inertia::render($isPremium ? 'Lecciones/SwiftIOS' : 'Lecciones/SwiftIOSTeaser');
    })->name('swift-ios');

    // Frontend — premium
    Route::get('/react-avanzado', function () {
        $isPremium = auth()->check() && in_array(auth()->user()->role, ['premium', 'admin']);
        return Inertia::render($isPremium ? 'Lecciones/ReactAvanzado' : 'Lecciones/ReactAvanzadoTeaser');
    })->name('react-avanzado');

    Route::get('/nextjs', function () {
        $isPremium = auth()->check() && in_array(auth()->user()->role, ['premium', 'admin']);
        return Inertia::render($isPremium ? 'Lecciones/NextJS' : 'Lecciones/NextJSTeaser');
    })->name('nextjs');

    Route::get('/vuejs', function () {
        $isPremium = auth()->check() && in_array(auth()->user()->role, ['premium', 'admin']);
        return Inertia::render($isPremium ? 'Lecciones/VueJS' : 'Lecciones/VueJSTeaser');
    })->name('vuejs');

    // DevOps — premium
    Route::get('/github-actions', function () {
        $isPremium = auth()->check() && in_array(auth()->user()->role, ['premium', 'admin']);
        return Inertia::render($isPremium ? 'Lecciones/GitHubActions' : 'Lecciones/GitHubActionsTeaser');
    })->name('github-actions');

    Route::get('/kubernetes', function () {
        $isPremium = auth()->check() && in_array(auth()->user()->role, ['premium', 'admin']);
        return Inertia::render($isPremium ? 'Lecciones/KubernetesBasico' : 'Lecciones/KubernetesBasicoTeaser');
    })->name('kubernetes');

    // Bases de datos — premium
    Route::get('/postgresql-avanzado', function () {
        $isPremium = auth()->check() && in_array(auth()->user()->role, ['premium', 'admin']);
        return Inertia::render($isPremium ? 'Lecciones/PostgreSQLAvanzado' : 'Lecciones/PostgreSQLAvanzadoTeaser');
    })->name('postgresql-avanzado');

    Route::get('/redis-cache', function () {
        $isPremium = auth()->check() && in_array(auth()->user()->role, ['premium', 'admin']);
        return Inertia::render($isPremium ? 'Lecciones/RedisCache' : 'Lecciones/RedisCacheTeaser');
    })->name('redis-cache');

    // IA / ML — premium
    Route::get('/machine-learning', function () {
        $isPremium = auth()->check() && in_array(auth()->user()->role, ['premium', 'admin']);
        return Inertia::render($isPremium ? 'Lecciones/MachineLearning' : 'Lecciones/MachineLearningTeaser');
    })->name('machine-learning');

    // Arquitectura — premium
    Route::get('/microservicios-diseno', function () {
        $isPremium = auth()->check() && in_array(auth()->user()->role, ['premium', 'admin']);
        return Inertia::render($isPremium ? 'Lecciones/MicroserviciosDiseno' : 'Lecciones/MicroserviciosDisenoTeaser');
    })->name('microservicios-diseno');
});

// Juegos y ranking
Route::get('/juegos', [GameController::class, 'index'])->name('juegos');
Route::get('/juegos/{slug}', [GameController::class, 'show'])->name('juegos.show');
Route::get('/ranking', [LeaderboardController::class, 'index'])->name('ranking');
Route::middleware('auth')->post('/juegos/{slug}/submit', [GameController::class, 'submit'])->name('juegos.submit');

// Webhooks (sin CSRF)
Route::post('/webhooks/gumroad', [GumroadWebhookController::class, 'handle'])
    ->withoutMiddleware([\Illuminate\Foundation\Http\Middleware\VerifyCsrfToken::class]);

// Sitemap
Route::get('/sitemap.xml', function () {
    $lecciones = [
        // Linux
        'linux-esencial', 'comandos-linux', 'shell-scripting',
        // PHP / Laravel
        'laravel', 'eloquent', 'apis-rest',
        // Seguridad
        'seguridad-web',
        // Automatización / IA
        'docker', 'n8n', 'ia-programacion', 'fine-tuning',
        // Servidores
        'maquinas-virtuales',
        // Python
        'python-basico', 'python-avanzado',
        // JavaScript / TypeScript
        'javascript-moderno', 'typescript-basico',
        // Git
        'git-esencial',
        // Mobile
        'kotlin-android', 'swift-ios',
        // Frontend
        'react-avanzado', 'nextjs', 'vuejs',
        // DevOps
        'github-actions', 'kubernetes',
        // Bases de datos
        'postgresql-avanzado', 'redis-cache',
        // ML / IA
        'machine-learning',
        // Arquitectura
        'microservicios-diseno',
    ];
    return response()
        ->view('sitemap', compact('lecciones'))
        ->header('Content-Type', 'application/xml');
})->name('sitemap');

// Legal
Route::get('/privacidad', fn () => Inertia::render('Privacidad'));
Route::get('/terminos', fn () => Inertia::render('Terminos'));
Route::get('/cookies', fn () => Inertia::render('Cookies'));

// 404
Route::fallback(fn () => Inertia::render('NotFound')->toResponse(request())->setStatusCode(404));
