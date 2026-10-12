<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class GumroadWebhookTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        config(['services.gumroad.webhook_secret' => 'secreto-de-prueba']);
    }

    private function venta(array $extra = []): array
    {
        return ['product_permalink' => 'yabnoy', 'email' => 'ana@ejemplo.com', ...$extra];
    }

    public function test_rechaza_peticiones_sin_token_valido(): void
    {
        $user = User::factory()->create(['email' => 'ana@ejemplo.com']);

        $this->post('/webhooks/gumroad?token=incorrecto', $this->venta())->assertUnauthorized();
        $this->post('/webhooks/gumroad', $this->venta())->assertUnauthorized();

        $this->assertSame('user', $user->fresh()->role);
    }

    public function test_sin_secreto_configurado_el_webhook_queda_desactivado(): void
    {
        // Antes, sin secreto configurado, una petición sin token se aceptaba (null === null).
        config(['services.gumroad.webhook_secret' => null]);
        $user = User::factory()->create(['email' => 'ana@ejemplo.com']);

        $this->post('/webhooks/gumroad', $this->venta())->assertUnauthorized();

        $this->assertSame('user', $user->fresh()->role);
    }

    public function test_una_compra_valida_activa_el_acceso(): void
    {
        $user = User::factory()->create(['email' => 'ana@ejemplo.com']);

        $this->post('/webhooks/gumroad?token=secreto-de-prueba', $this->venta(['email' => '  ANA@ejemplo.com ']))->assertOk();

        $this->assertSame('premium', $user->fresh()->role);
    }

    public function test_ignora_reembolsos_y_otros_productos(): void
    {
        $user = User::factory()->create(['email' => 'ana@ejemplo.com']);

        $this->post('/webhooks/gumroad?token=secreto-de-prueba', $this->venta(['refunded' => 'true']))->assertOk();
        $this->post('/webhooks/gumroad?token=secreto-de-prueba', $this->venta(['product_permalink' => 'otro']))->assertOk();

        $this->assertSame('user', $user->fresh()->role);
    }
}
