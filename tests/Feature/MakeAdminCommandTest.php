<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class MakeAdminCommandTest extends TestCase
{
    use RefreshDatabase;

    public function test_convierte_una_cuenta_en_administradora(): void
    {
        $user = User::factory()->create(['email' => 'ana@ejemplo.com']);

        $this->artisan('user:make-admin', ['email' => 'ANA@ejemplo.com'])->assertSuccessful();

        $this->assertSame('admin', $user->fresh()->role);
    }

    public function test_falla_si_la_cuenta_no_existe(): void
    {
        $this->artisan('user:make-admin', ['email' => 'nadie@ejemplo.com'])->assertFailed();
    }
}
