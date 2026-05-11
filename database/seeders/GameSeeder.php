<?php

namespace Database\Seeders;

use App\Models\Game;
use App\Models\GameQuestion;
use Illuminate\Database\Seeder;

class GameSeeder extends Seeder
{
    public function run(): void
    {
        // ---------------------------------------------------------------
        // Juego 1: Quiz de Linux (type: quiz)
        // ---------------------------------------------------------------
        $quiz = Game::create([
            'slug'        => 'quiz-linux',
            'title'       => 'Quiz de Linux',
            'description' => 'Pon a prueba tus conocimientos sobre los comandos esenciales de Linux.',
            'type'        => 'quiz',
            'course_slug' => 'comandos-linux',
            'difficulty'  => 'easy',
            'is_active'   => true,
        ]);

        $quizQuestions = [
            [
                'question'       => '¿Qué comando lista archivos incluyendo los ocultos?',
                'options'        => ['ls -a', 'ls -l', 'ls -h', 'ls -r'],
                'correct_answer' => 'ls -a',
                'explanation'    => 'El flag -a muestra All files, incluidos los que empiezan por punto (archivos ocultos).',
                'points'         => 100,
                'order'          => 1,
            ],
            [
                'question'       => '¿Cuál es el comando para ver el uso de disco de un directorio?',
                'options'        => ['du -sh', 'df -h', 'ls -s', 'stat .'],
                'correct_answer' => 'du -sh',
                'explanation'    => 'du (disk usage) con -s (summary) y -h (human-readable) muestra el tamaño total de un directorio.',
                'points'         => 100,
                'order'          => 2,
            ],
            [
                'question'       => '¿Qué hace el comando chmod 755 archivo.sh?',
                'options'        => ['Propietario: rwx, Grupo: r-x, Otros: r-x', 'Propietario: rwx, Grupo: rwx, Otros: rwx', 'Propietario: r-x, Grupo: r-x, Otros: r-x', 'Propietario: rwx, Grupo: r--, Otros: r--'],
                'correct_answer' => 'Propietario: rwx, Grupo: r-x, Otros: r-x',
                'explanation'    => '7 = rwx (4+2+1), 5 = r-x (4+0+1). El propietario puede leer, escribir y ejecutar; grupo y otros solo leer y ejecutar.',
                'points'         => 150,
                'order'          => 3,
            ],
            [
                'question'       => '¿Qué comando muestra los procesos en ejecución en tiempo real?',
                'options'        => ['top', 'ps', 'jobs', 'kill'],
                'correct_answer' => 'top',
                'explanation'    => 'top muestra una vista dinámica y en tiempo real de los procesos del sistema. htop es una alternativa más visual.',
                'points'         => 100,
                'order'          => 4,
            ],
            [
                'question'       => '¿Qué hace el operador >> en la redirección de shell?',
                'options'        => ['Añade al final del archivo sin sobrescribir', 'Sobreescribe el archivo', 'Lee desde el archivo', 'Redirige stderr'],
                'correct_answer' => 'Añade al final del archivo sin sobrescribir',
                'explanation'    => '>> (append redirect) escribe al final del archivo. Con > el archivo se trunca y sobreescribe.',
                'points'         => 150,
                'order'          => 5,
            ],
        ];

        foreach ($quizQuestions as $q) {
            GameQuestion::create(array_merge($q, ['game_id' => $quiz->id, 'type' => 'quiz']));
        }

        // ---------------------------------------------------------------
        // Juego 2: Completa el código PHP (type: fill_code)
        // ---------------------------------------------------------------
        $fill = Game::create([
            'slug'        => 'completa-php',
            'title'       => 'Completa el código PHP',
            'description' => 'Rellena los huecos para completar fragmentos de código PHP y Laravel.',
            'type'        => 'fill_code',
            'course_slug' => 'laravel',
            'difficulty'  => 'medium',
            'is_active'   => true,
        ]);

        $fillQuestions = [
            [
                'question'       => "User::where('email', ___)->first();",
                'options'        => null,
                'correct_answer' => '$email',
                'explanation'    => "Eloquent where() acepta columna, (operador opcional) y valor. Aquí pasamos la variable \$email como valor de búsqueda.",
                'points'         => 100,
                'order'          => 1,
            ],
            [
                'question'       => "Route::get('/usuarios', ___)->name('users.index');",
                'options'        => null,
                'correct_answer' => '[UserController::class, \'index\']',
                'explanation'    => 'Las rutas en Laravel apuntan a un array [ControladorClass, \'metodo\'] o a un closure.',
                'points'         => 100,
                'order'          => 2,
            ],
            [
                'question'       => "return response()->json(\$data, ___);",
                'options'        => null,
                'correct_answer' => '200',
                'explanation'    => 'El segundo argumento de response()->json() es el código HTTP. 200 es OK; 201 es Created; 422 es Unprocessable.',
                'points'         => 80,
                'order'          => 3,
            ],
            [
                'question'       => "\$request->validate(['email' => '___|email|max:255']);",
                'options'        => null,
                'correct_answer' => 'required',
                'explanation'    => 'Las reglas de validación se separan por | (pipe). "required" indica que el campo no puede estar vacío o ausente.',
                'points'         => 100,
                'order'          => 4,
            ],
        ];

        foreach ($fillQuestions as $q) {
            GameQuestion::create(array_merge($q, ['game_id' => $fill->id, 'type' => 'fill_code']));
        }

        // ---------------------------------------------------------------
        // Juego 3: Ordena los bloques Docker (type: order_blocks)
        // ---------------------------------------------------------------
        $order = Game::create([
            'slug'        => 'ordena-docker',
            'title'       => 'Ordena los bloques Docker',
            'description' => 'Coloca las instrucciones del Dockerfile en el orden correcto.',
            'type'        => 'order_blocks',
            'course_slug' => 'docker',
            'difficulty'  => 'medium',
            'is_active'   => true,
        ]);

        $orderQuestions = [
            [
                'question'       => 'Ordena las instrucciones de un Dockerfile básico para PHP:',
                'options'        => ['FROM php:8.2-fpm', 'WORKDIR /var/www', 'COPY . .', 'RUN composer install'],
                'correct_answer' => '[0,1,2,3]',
                'explanation'    => 'El Dockerfile sigue el orden: imagen base (FROM) → directorio de trabajo (WORKDIR) → copiar archivos (COPY) → instalar dependencias (RUN).',
                'points'         => 150,
                'order'          => 1,
            ],
            [
                'question'       => 'Ordena los pasos para publicar un puerto en Docker:',
                'options'        => ['FROM nginx:alpine', 'EXPOSE 80', 'COPY nginx.conf /etc/nginx/', 'CMD ["nginx", "-g", "daemon off;"]'],
                'correct_answer' => '[0,2,1,3]',
                'explanation'    => 'FROM primero, luego copiar la configuración, EXPOSE el puerto y finalmente el CMD de arranque.',
                'points'         => 150,
                'order'          => 2,
            ],
            [
                'question'       => 'Ordena los comandos para levantar un proyecto con Docker Compose:',
                'options'        => ['docker compose build', 'docker compose up -d', 'docker compose ps', 'docker compose logs'],
                'correct_answer' => '[0,1,2,3]',
                'explanation'    => 'Primero se construye (build), se levanta en modo detached (up -d), se verifica el estado (ps) y finalmente se revisan los logs.',
                'points'         => 100,
                'order'          => 3,
            ],
            [
                'question'       => 'Ordena la secuencia de layers en una imagen multi-stage:',
                'options'        => ['FROM node:20 AS builder', 'RUN npm run build', 'FROM nginx:alpine', 'COPY --from=builder /app/dist /usr/share/nginx/html'],
                'correct_answer' => '[0,1,2,3]',
                'explanation'    => 'Multi-stage: primero el stage de build (node), se ejecuta el build, luego el stage de producción (nginx) y se copian solo los artefactos.',
                'points'         => 200,
                'order'          => 4,
            ],
        ];

        foreach ($orderQuestions as $q) {
            GameQuestion::create(array_merge($q, ['game_id' => $order->id, 'type' => 'order_blocks']));
        }

        // ---------------------------------------------------------------
        // Juego 4: Adivina el output (type: guess_output)
        // ---------------------------------------------------------------
        $guess = Game::create([
            'slug'        => 'adivina-output-php',
            'title'       => 'Adivina el output PHP',
            'description' => 'Lee el código PHP y escribe exactamente lo que imprimiría en pantalla.',
            'type'        => 'guess_output',
            'course_slug' => 'laravel',
            'difficulty'  => 'hard',
            'is_active'   => true,
        ]);

        $guessQuestions = [
            [
                'question'       => "<?php\n\$arr = [1, 2, 3];\necho count(\$arr);",
                'options'        => null,
                'correct_answer' => '3',
                'explanation'    => 'count() devuelve el número de elementos del array. [1, 2, 3] tiene 3 elementos.',
                'points'         => 100,
                'order'          => 1,
            ],
            [
                'question'       => "<?php\n\$x = 10;\n\$y = &\$x;\n\$y = 20;\necho \$x;",
                'options'        => null,
                'correct_answer' => '20',
                'explanation'    => '&$x crea una referencia: $y y $x apuntan a la misma ubicación de memoria. Al modificar $y, $x cambia también.',
                'points'         => 150,
                'order'          => 2,
            ],
            [
                'question'       => "<?php\n\$a = '5';\n\$b = 5;\necho var_export(\$a === \$b, true);",
                'options'        => null,
                'correct_answer' => 'false',
                'explanation'    => '=== compara valor Y tipo. \'5\' es string y 5 es integer, por eso retorna false. Con == (comparación laxa) sería true.',
                'points'         => 150,
                'order'          => 3,
            ],
        ];

        foreach ($guessQuestions as $q) {
            GameQuestion::create(array_merge($q, ['game_id' => $guess->id, 'type' => 'guess_output']));
        }
    }
}
