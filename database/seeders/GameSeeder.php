<?php

namespace Database\Seeders;

use App\Models\Game;
use App\Models\GameQuestion;
use Illuminate\Database\Seeder;

class GameSeeder extends Seeder
{
    public function run(): void
    {
        $this->seedGame(
            slug: 'quiz-linux',
            title: 'Quiz de Linux',
            description: 'Pon a prueba tus conocimientos sobre los comandos esenciales de Linux.',
            type: 'quiz',
            courseSLug: 'comandos-linux',
            difficulty: 'easy',
            questions: [
                [
                    'question'       => '¿Qué comando lista archivos incluyendo los ocultos?',
                    'options'        => ['ls -a', 'ls -l', 'ls -h', 'ls -r'],
                    'correct_answer' => 'ls -a',
                    'explanation'    => 'El flag -a muestra All files, incluidos los que empiezan por punto (archivos ocultos).',
                    'points'         => 100,
                ],
                [
                    'question'       => '¿Cuál es el comando para ver el uso de disco de un directorio?',
                    'options'        => ['du -sh', 'df -h', 'ls -s', 'stat .'],
                    'correct_answer' => 'du -sh',
                    'explanation'    => 'du (disk usage) con -s (summary) y -h (human-readable) muestra el tamaño total.',
                    'points'         => 100,
                ],
                [
                    'question'       => '¿Qué hace chmod 755 archivo.sh?',
                    'options'        => ['Propietario: rwx, Grupo: r-x, Otros: r-x', 'Propietario: rwx, Grupo: rwx, Otros: rwx', 'Propietario: r-x, Grupo: r-x, Otros: r-x', 'Propietario: rwx, Grupo: r--, Otros: r--'],
                    'correct_answer' => 'Propietario: rwx, Grupo: r-x, Otros: r-x',
                    'explanation'    => '7 = rwx (4+2+1), 5 = r-x (4+0+1). Propietario: rwx; grupo y otros: r-x.',
                    'points'         => 150,
                ],
                [
                    'question'       => '¿Qué comando muestra procesos en tiempo real?',
                    'options'        => ['top', 'ps', 'jobs', 'kill'],
                    'correct_answer' => 'top',
                    'explanation'    => 'top muestra una vista dinámica de los procesos. htop es una alternativa más visual.',
                    'points'         => 100,
                ],
                [
                    'question'       => '¿Qué hace el operador >> en shell?',
                    'options'        => ['Añade al final del archivo sin sobrescribir', 'Sobreescribe el archivo', 'Lee desde el archivo', 'Redirige stderr'],
                    'correct_answer' => 'Añade al final del archivo sin sobrescribir',
                    'explanation'    => '>> (append) escribe al final. Con > el archivo se trunca y sobreescribe desde cero.',
                    'points'         => 150,
                ],
            ],
        );

        $this->seedGame(
            slug: 'completa-php',
            title: 'Completa el código PHP',
            description: 'Rellena los huecos para completar fragmentos de código PHP y Laravel.',
            type: 'fill_code',
            courseSLug: 'laravel',
            difficulty: 'medium',
            questions: [
                [
                    'question'       => "User::where('email', ___)->first();",
                    'options'        => null,
                    'correct_answer' => '$email',
                    'explanation'    => "Eloquent where() acepta columna y valor. Aquí pasamos \$email como valor de búsqueda.",
                    'points'         => 100,
                ],
                [
                    'question'       => "Route::get('/usuarios', ___)->name('users.index');",
                    'options'        => null,
                    'correct_answer' => '[UserController::class, \'index\']',
                    'explanation'    => 'Las rutas en Laravel apuntan a [Controlador::class, \'metodo\'] o a un closure.',
                    'points'         => 100,
                ],
                [
                    'question'       => "return response()->json(\$data, ___);",
                    'options'        => null,
                    'correct_answer' => '200',
                    'explanation'    => 'El segundo argumento es el código HTTP. 200 OK; 201 Created; 422 Unprocessable.',
                    'points'         => 80,
                ],
                [
                    'question'       => "\$request->validate(['email' => '___|email|max:255']);",
                    'options'        => null,
                    'correct_answer' => 'required',
                    'explanation'    => 'Las reglas se separan por |. "required" indica que el campo no puede estar vacío.',
                    'points'         => 100,
                ],
            ],
        );

        $this->seedGame(
            slug: 'ordena-docker',
            title: 'Ordena los bloques Docker',
            description: 'Coloca las instrucciones del Dockerfile en el orden correcto.',
            type: 'order_blocks',
            courseSLug: 'docker',
            difficulty: 'medium',
            questions: [
                [
                    'question'       => 'Ordena las instrucciones de un Dockerfile básico para PHP:',
                    'options'        => ['FROM php:8.2-fpm', 'WORKDIR /var/www', 'COPY . .', 'RUN composer install'],
                    'correct_answer' => '[0,1,2,3]',
                    'explanation'    => 'FROM → WORKDIR → COPY → RUN. Imagen base, directorio, archivos y luego dependencias.',
                    'points'         => 150,
                ],
                [
                    'question'       => 'Ordena los pasos para un Nginx con puerto expuesto:',
                    'options'        => ['FROM nginx:alpine', 'EXPOSE 80', 'COPY nginx.conf /etc/nginx/', 'CMD ["nginx", "-g", "daemon off;"]'],
                    'correct_answer' => '[0,2,1,3]',
                    'explanation'    => 'FROM primero, copiar config, EXPOSE el puerto, finalmente el CMD de arranque.',
                    'points'         => 150,
                ],
                [
                    'question'       => 'Ordena los comandos para levantar un proyecto con Docker Compose:',
                    'options'        => ['docker compose build', 'docker compose up -d', 'docker compose ps', 'docker compose logs'],
                    'correct_answer' => '[0,1,2,3]',
                    'explanation'    => 'Construir (build), levantar detached (up -d), verificar estado (ps), revisar logs.',
                    'points'         => 100,
                ],
                [
                    'question'       => 'Ordena las layers en una imagen multi-stage (Node → Nginx):',
                    'options'        => ['FROM node:20 AS builder', 'RUN npm run build', 'FROM nginx:alpine', 'COPY --from=builder /app/dist /usr/share/nginx/html'],
                    'correct_answer' => '[0,1,2,3]',
                    'explanation'    => 'Stage build (node) → ejecutar build → stage producción (nginx) → copiar artefactos.',
                    'points'         => 200,
                ],
            ],
        );

        $this->seedGame(
            slug: 'adivina-output-php',
            title: 'Adivina el output PHP',
            description: 'Lee el código PHP y escribe exactamente lo que imprimiría en pantalla.',
            type: 'guess_output',
            courseSLug: 'laravel',
            difficulty: 'hard',
            questions: [
                [
                    'question'       => "<?php\n\$arr = [1, 2, 3];\necho count(\$arr);",
                    'options'        => null,
                    'correct_answer' => '3',
                    'explanation'    => 'count() devuelve el número de elementos. [1, 2, 3] tiene 3 elementos.',
                    'points'         => 100,
                ],
                [
                    'question'       => "<?php\n\$x = 10;\n\$y = &\$x;\n\$y = 20;\necho \$x;",
                    'options'        => null,
                    'correct_answer' => '20',
                    'explanation'    => '&$x crea una referencia: $y y $x apuntan a la misma posición de memoria.',
                    'points'         => 150,
                ],
                [
                    'question'       => "<?php\n\$a = '5';\n\$b = 5;\necho var_export(\$a === \$b, true);",
                    'options'        => null,
                    'correct_answer' => 'false',
                    'explanation'    => '=== compara valor Y tipo. \'5\' (string) !== 5 (int). Con == sería true.',
                    'points'         => 150,
                ],
            ],
        );
    }

    private function seedGame(
        string $slug,
        string $title,
        string $description,
        string $type,
        string $courseSLug,
        string $difficulty,
        array $questions,
    ): void {
        $game = Game::firstOrCreate(
            ['slug' => $slug],
            [
                'title'       => $title,
                'description' => $description,
                'type'        => $type,
                'course_slug' => $courseSLug,
                'difficulty'  => $difficulty,
                'is_active'   => true,
            ]
        );

        if ($game->wasRecentlyCreated) {
            foreach ($questions as $i => $q) {
                GameQuestion::create(array_merge($q, [
                    'game_id' => $game->id,
                    'type'    => $type,
                    'order'   => $i + 1,
                    'options' => $q['options'] ?? null,
                ]));
            }
        }
    }
}
