<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class GumroadWebhookController extends Controller
{
    // Permalinks de productos que dan acceso premium
    private const BETA_PERMALINK = 'yabnoy';

    public function handle(Request $request)
    {
        // Verificar token secreto en la URL
        $token = $request->query('token');
        if ($token !== config('services.gumroad.webhook_secret')) {
            Log::warning('Gumroad webhook: token inválido', ['ip' => $request->ip()]);
            return response('Unauthorized', 401);
        }

        $data = $request->all();

        Log::info('Gumroad webhook recibido', [
            'product' => $data['product_permalink'] ?? null,
            'email'   => $data['email'] ?? null,
            'refunded' => $data['refunded'] ?? false,
        ]);

        // Ignorar reembolsos y tests
        if (!empty($data['refunded']) && $data['refunded'] === 'true') {
            return response('ok', 200);
        }

        $permalink = $data['product_permalink'] ?? '';
        $email     = strtolower(trim($data['email'] ?? ''));

        if (empty($email)) {
            return response('ok', 200);
        }

        // Solo el Beta activa el rol premium
        if ($permalink === self::BETA_PERMALINK) {
            $user = User::where('email', $email)->first();

            if ($user) {
                $user->update(['role' => 'premium']);
                Log::info("Usuario {$email} actualizado a premium via Gumroad");
            } else {
                // Usuario no registrado — lo guardamos para revisión manual
                Log::warning("Compra Beta de email no registrado: {$email}");
            }
        }

        return response('ok', 200);
    }
}
