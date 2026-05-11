<?php

// INSTALACIÓN DE RESEND (si no está en composer.json):
// composer require resend/resend-laravel
// Luego en .env añade:
//   RESEND_API_KEY=re_xxxxxxxxxxxx
//   MAIL_MAILER=resend
//   MAIL_FROM_ADDRESS=noreply@tudominio.com
//   MAIL_FROM_NAME="TechLearn"
//
// El package resend/resend-laravel ya registra el driver 'resend' automáticamente.
// Ver: https://github.com/resendlabs/resend-laravel

namespace App\Http\Controllers;

use App\Mail\ResetPasswordMail;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;
use Illuminate\Validation\Rules\Password;
use Inertia\Inertia;
use Inertia\Response;

class PasswordResetController extends Controller
{
    // -------------------------------------------------------------------------
    // Forgot Password
    // -------------------------------------------------------------------------

    public function showForgotPassword(): Response
    {
        return Inertia::render('Auth/ForgotPassword');
    }

    public function sendResetLink(Request $request): RedirectResponse
    {
        $request->validate([
            'email' => ['required', 'email'],
        ]);

        $user = User::where('email', $request->email)->first();

        // Always return a generic success to prevent user enumeration
        if (! $user) {
            return back()->with('status', 'Si existe una cuenta con ese correo, recibirás un enlace en breve.');
        }

        // Delete any existing token for this email
        DB::table('password_reset_tokens')->where('email', $request->email)->delete();

        $token = Str::random(64);

        DB::table('password_reset_tokens')->insert([
            'email'      => $request->email,
            'token'      => Hash::make($token),
            'created_at' => now(),
        ]);

        $resetUrl = url('/reset-password/' . $token . '?email=' . urlencode($request->email));

        Mail::to($user->email)->send(new ResetPasswordMail(
            resetUrl: $resetUrl,
            userName: $user->name,
        ));

        return back()->with('status', 'Si existe una cuenta con ese correo, recibirás un enlace en breve.');
    }

    // -------------------------------------------------------------------------
    // Reset Password
    // -------------------------------------------------------------------------

    public function showResetPassword(Request $request, string $token): Response
    {
        return Inertia::render('Auth/ResetPassword', [
            'token' => $token,
            'email' => $request->query('email', ''),
        ]);
    }

    public function resetPassword(Request $request): RedirectResponse
    {
        $request->validate([
            'token'                 => ['required', 'string'],
            'email'                 => ['required', 'email'],
            'password'              => ['required', 'confirmed', Password::min(8)],
        ]);

        $record = DB::table('password_reset_tokens')
            ->where('email', $request->email)
            ->first();

        if (! $record) {
            return back()->withErrors(['email' => 'El enlace de restablecimiento no es válido o ha expirado.']);
        }

        // Token expires after 60 minutes
        $createdAt = \Carbon\Carbon::parse($record->created_at);
        if ($createdAt->addMinutes(60)->isPast()) {
            DB::table('password_reset_tokens')->where('email', $request->email)->delete();
            return back()->withErrors(['email' => 'El enlace ha expirado. Solicita uno nuevo.']);
        }

        if (! Hash::check($request->token, $record->token)) {
            return back()->withErrors(['email' => 'El enlace de restablecimiento no es válido o ha expirado.']);
        }

        $user = User::where('email', $request->email)->first();

        if (! $user) {
            return back()->withErrors(['email' => 'No se encontró ninguna cuenta con ese correo.']);
        }

        $user->password = Hash::make($request->password);
        $user->save();

        // Invalidate the token after successful reset
        DB::table('password_reset_tokens')->where('email', $request->email)->delete();

        return redirect('/login')->with('status', '¡Contraseña restablecida! Ya puedes iniciar sesión.');
    }
}
