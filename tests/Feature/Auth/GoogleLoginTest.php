<?php

namespace Tests\Feature\Auth;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Socialite\Facades\Socialite;
use Laravel\Socialite\Two\User as GoogleUser;
use Mockery;
use Tests\TestCase;

class GoogleLoginTest extends TestCase
{
    use RefreshDatabase;

    private function simularGoogle(string $id, string $email, string $nombre = 'Ana García'): void
    {
        $googleUser = (new GoogleUser)->map(['id' => $id, 'email' => $email, 'name' => $nombre]);
        $provider = Mockery::mock(\Laravel\Socialite\Two\GoogleProvider::class);
        $provider->shouldReceive('user')->andReturn($googleUser);
        Socialite::shouldReceive('driver')->with('google')->andReturn($provider);
    }

    public function test_crea_la_cuenta_la_primera_vez(): void
    {
        $this->simularGoogle('g-123', 'ana@ejemplo.com');

        $this->get('/auth/google/callback')->assertRedirect('/');

        $this->assertAuthenticated();
        $this->assertDatabaseHas('users', ['email' => 'ana@ejemplo.com', 'google_id' => 'g-123', 'role' => 'user']);
    }

    public function test_vincula_una_cuenta_existente_con_el_mismo_email(): void
    {
        $user = User::factory()->create(['email' => 'ana@ejemplo.com']);
        $this->simularGoogle('g-123', 'ana@ejemplo.com');

        $this->get('/auth/google/callback');

        $this->assertAuthenticatedAs($user);
        $this->assertSame('g-123', $user->fresh()->google_id);
        $this->assertSame(1, User::count());
    }

    public function test_nunca_crea_administradores(): void
    {
        $this->simularGoogle('g-999', 'alexvillar10@gmail.com');

        $this->get('/auth/google/callback');

        $this->assertSame('user', User::first()->role);
    }

    public function test_si_google_falla_vuelve_al_login_con_un_error(): void
    {
        $provider = Mockery::mock(\Laravel\Socialite\Two\GoogleProvider::class);
        $provider->shouldReceive('user')->andThrow(new \Exception('fallo'));
        Socialite::shouldReceive('driver')->with('google')->andReturn($provider);

        $this->get('/auth/google/callback')
            ->assertRedirect('/login')
            ->assertSessionHasErrors('email');

        $this->assertGuest();
    }
}
