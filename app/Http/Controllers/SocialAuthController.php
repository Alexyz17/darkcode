<?php

// INSTALACIÓN DE SOCIALITE (si no está en composer.json):
// composer require laravel/socialite
//
// CONFIGURAR GOOGLE OAUTH:
// 1. Ve a https://console.cloud.google.com/
// 2. Crea proyecto o selecciona uno existente
// 3. APIs & Services → Credentials → Create Credentials → OAuth client ID
// 4. Application type: Web application
// 5. Authorized redirect URIs: https://tudominio.com/auth/google/callback
// 6. Copia Client ID y Client Secret → pégalos en .env:
//    GOOGLE_CLIENT_ID=xxx
//    GOOGLE_CLIENT_SECRET=xxx
//
// Asegúrate de que config/services.php incluye:
//   'google' => [
//       'client_id'     => env('GOOGLE_CLIENT_ID'),
//       'client_secret' => env('GOOGLE_CLIENT_SECRET'),
//       'redirect'      => env('APP_URL') . '/auth/google/callback',
//   ],

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Laravel\Socialite\Facades\Socialite;

class SocialAuthController extends Controller
{
    public function redirectToGoogle(): RedirectResponse
    {
        return Socialite::driver('google')->redirect();
    }

    public function handleGoogleCallback(): RedirectResponse
    {
        try {
            $googleUser = Socialite::driver('google')->user();
        } catch (\Throwable $e) {
            return redirect('/login')->withErrors([
                'email' => 'No se pudo autenticar con Google. Inténtalo de nuevo.',
            ]);
        }

        // Look up by google_id first, then by email
        $user = User::where('google_id', $googleUser->getId())->first()
            ?? User::where('email', $googleUser->getEmail())->first();

        if ($user) {
            // Link Google account if not already linked
            if (! $user->google_id) {
                $user->google_id = $googleUser->getId();
                $user->save();
            }
        } else {
            // Create a new user

            $user = User::create([
                'name'      => $googleUser->getName() ?? $googleUser->getNickname() ?? 'Usuario',
                'email'     => $googleUser->getEmail(),
                'google_id' => $googleUser->getId(),
                'password'  => \Illuminate\Support\Facades\Hash::make(Str::random(32)),
                'role'      => 'user',
            ]);
        }

        Auth::login($user, remember: true);

        request()->session()->regenerate();

        return redirect()->intended('/');
    }
}
