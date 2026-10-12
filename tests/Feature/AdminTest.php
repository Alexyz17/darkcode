<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class AdminTest extends TestCase
{
    use RefreshDatabase;

    public function test_un_invitado_es_redirigido_al_login(): void
    {
        $this->get('/admin')->assertRedirect('/login');
    }

    public function test_un_usuario_normal_no_puede_entrar(): void
    {
        $this->actingAs(User::factory()->create())->get('/admin')->assertForbidden();
    }

    public function test_un_usuario_premium_no_puede_entrar(): void
    {
        $this->actingAs(User::factory()->premium()->create())->get('/admin')->assertForbidden();
    }

    public function test_un_admin_ve_el_panel_con_estadisticas(): void
    {
        User::factory()->count(3)->create();
        User::factory()->premium()->create();
        $admin = User::factory()->admin()->create();

        $this->actingAs($admin)
            ->get('/admin')
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->component('Admin/Index')
                ->has('users', 5)
                ->where('stats.total', 5)
                ->where('stats.admins', 1)
                ->where('stats.premium', 2)
            );
    }

    public function test_el_panel_no_expone_contrasenas(): void
    {
        $admin = User::factory()->admin()->create();

        $this->actingAs($admin)
            ->get('/admin')
            ->assertInertia(fn (Assert $page) => $page->missing('users.0.password'));
    }

    public function test_un_admin_cambia_el_rol_de_un_usuario(): void
    {
        $admin = User::factory()->admin()->create();
        $user = User::factory()->create();

        $this->actingAs($admin)->patch("/admin/users/{$user->id}/role", ['role' => 'premium']);

        $this->assertSame('premium', $user->fresh()->role);
    }

    public function test_rechaza_roles_que_no_existen(): void
    {
        $admin = User::factory()->admin()->create();
        $user = User::factory()->create();

        $this->actingAs($admin)
            ->patch("/admin/users/{$user->id}/role", ['role' => 'superadmin'])
            ->assertSessionHasErrors('role');

        $this->assertSame('user', $user->fresh()->role);
    }

    public function test_un_usuario_normal_no_puede_cambiar_roles(): void
    {
        $user = User::factory()->create();

        $this->actingAs($user)
            ->patch("/admin/users/{$user->id}/role", ['role' => 'admin'])
            ->assertForbidden();

        $this->assertSame('user', $user->fresh()->role);
    }
}
