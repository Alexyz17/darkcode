<?php

namespace Tests\Feature\Auth;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class RegistrationTest extends TestCase
{
    use RefreshDatabase;

    private function datos(array $extra = []): array
    {
        return [
            'name' => 'Ana García',
            'email' => 'ana@ejemplo.com',
            'password' => 'secreto123',
            'password_confirmation' => 'secreto123',
            ...$extra,
        ];
    }

    public function test_se_registra_e_inicia_sesion(): void
    {
        $this->post('/register', $this->datos())->assertRedirect('/');

        $this->assertAuthenticated();
        $this->assertDatabaseHas('users', ['email' => 'ana@ejemplo.com', 'role' => 'user']);
    }

    public function test_la_contrasena_se_guarda_cifrada(): void
    {
        $this->post('/register', $this->datos());

        $this->assertNotSame('secreto123', User::first()->password);
    }

    public function test_nadie_obtiene_rol_de_administrador_al_registrarse(): void
    {
        // Antes, registrarse con un email concreto daba permisos de admin sin verificar el email.
        $this->post('/register', $this->datos(['email' => 'alexvillar10@gmail.com']));

        $this->assertSame('user', User::first()->role);
    }

    public function test_valida_los_campos(): void
    {
        $this->post('/register', [
            'name' => '',
            'email' => 'no-es-un-email',
            'password' => 'corta',
            'password_confirmation' => 'distinta',
        ])->assertSessionHasErrors(['name', 'email', 'password']);

        $this->assertGuest();
    }

    public function test_no_permite_emails_duplicados(): void
    {
        User::factory()->create(['email' => 'ana@ejemplo.com']);

        $this->post('/register', $this->datos())->assertSessionHasErrors('email');
    }
}
