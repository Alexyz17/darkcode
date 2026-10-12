<?php

namespace App\Console\Commands;

use App\Models\User;
use Illuminate\Console\Command;

/**
 * Concede el rol de administrador desde el servidor.
 * Sustituye a la antigua lista de emails escrita en el código: cualquiera podía
 * registrarse con ese email (sin verificar) y obtener permisos de administración.
 */
class MakeAdmin extends Command
{
    protected $signature = 'user:make-admin {email : Email de una cuenta ya registrada}';

    protected $description = 'Convierte una cuenta existente en administradora';

    public function handle(): int
    {
        $user = User::where('email', strtolower(trim($this->argument('email'))))->first();

        if (! $user) {
            $this->error('No existe ninguna cuenta con ese email.');

            return self::FAILURE;
        }

        $user->update(['role' => 'admin']);
        $this->info("{$user->email} ahora es administrador.");

        return self::SUCCESS;
    }
}
