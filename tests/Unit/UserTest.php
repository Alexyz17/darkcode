<?php

namespace Tests\Unit;

use App\Models\User;
use PHPUnit\Framework\Attributes\DataProvider;
use PHPUnit\Framework\TestCase;

class UserTest extends TestCase
{
    public static function roles(): array
    {
        return [
            'usuario' => ['user', false, false],
            'premium' => ['premium', true, false],
            'admin' => ['admin', true, true],
        ];
    }

    #[DataProvider('roles')]
    public function test_permisos_segun_el_rol(string $rol, bool $premium, bool $admin): void
    {
        $user = new User(['role' => $rol]);

        $this->assertSame($premium, $user->isPremium());
        $this->assertSame($admin, $user->isAdmin());
    }
}
