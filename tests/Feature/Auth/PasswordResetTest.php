<?php

namespace Tests\Feature\Auth;

use App\Mail\ResetPasswordMail;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Tests\TestCase;

class PasswordResetTest extends TestCase
{
    use RefreshDatabase;

    private function crearToken(User $user, string $token = 'token-de-prueba', $fecha = null): void
    {
        DB::table('password_reset_tokens')->insert([
            'email' => $user->email,
            'token' => Hash::make($token),
            'created_at' => $fecha ?? now(),
        ]);
    }

    public function test_envia_el_enlace_de_recuperacion(): void
    {
        Mail::fake();
        $user = User::factory()->create();

        $this->post('/forgot-password', ['email' => $user->email])->assertSessionHas('status');

        Mail::assertSent(ResetPasswordMail::class, fn ($mail) => $mail->hasTo($user->email));
        $this->assertDatabaseHas('password_reset_tokens', ['email' => $user->email]);
    }

    public function test_no_revela_si_un_email_existe(): void
    {
        Mail::fake();

        $this->post('/forgot-password', ['email' => 'nadie@ejemplo.com'])
            ->assertSessionHas('status', 'Si existe una cuenta con ese correo, recibirás un enlace en breve.');

        Mail::assertNothingSent();
    }

    public function test_cambia_la_contrasena_con_un_token_valido(): void
    {
        $user = User::factory()->create();
        $this->crearToken($user);

        $this->post('/reset-password', [
            'token' => 'token-de-prueba',
            'email' => $user->email,
            'password' => 'nueva-clave-123',
            'password_confirmation' => 'nueva-clave-123',
        ])->assertRedirect('/login');

        $this->assertTrue(Hash::check('nueva-clave-123', $user->fresh()->password));
        $this->assertDatabaseMissing('password_reset_tokens', ['email' => $user->email]);
    }

    public function test_rechaza_un_token_incorrecto(): void
    {
        $user = User::factory()->create();
        $this->crearToken($user);

        $this->post('/reset-password', [
            'token' => 'otro-token',
            'email' => $user->email,
            'password' => 'nueva-clave-123',
            'password_confirmation' => 'nueva-clave-123',
        ])->assertSessionHasErrors('email');

        $this->assertTrue(Hash::check('password', $user->fresh()->password));
    }

    public function test_rechaza_un_token_caducado(): void
    {
        $user = User::factory()->create();
        $this->crearToken($user, fecha: now()->subMinutes(61));

        $this->post('/reset-password', [
            'token' => 'token-de-prueba',
            'email' => $user->email,
            'password' => 'nueva-clave-123',
            'password_confirmation' => 'nueva-clave-123',
        ])->assertSessionHasErrors('email');

        $this->assertDatabaseMissing('password_reset_tokens', ['email' => $user->email]);
    }
}
