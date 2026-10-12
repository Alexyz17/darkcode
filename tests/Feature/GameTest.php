<?php

namespace Tests\Feature;

use App\Models\Game;
use App\Models\GameScore;
use App\Models\User;
use Database\Seeders\GameSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class GameTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        $this->seed(GameSeeder::class);
    }

    /** Respuestas correctas de un juego, indexadas por id de pregunta. */
    private function respuestasCorrectas(Game $game): array
    {
        return $game->questions->mapWithKeys(fn ($q) => [
            $q->id => $q->type === 'order_blocks' ? json_decode($q->correct_answer, true) : $q->correct_answer,
        ])->all();
    }

    public function test_lista_los_juegos_activos(): void
    {
        Game::where('slug', 'quiz-linux')->update(['is_active' => false]);

        $this->get('/juegos')
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->component('Juegos/Index')
                ->has('games', Game::where('is_active', true)->count())
            );
    }

    public function test_la_pagina_del_juego_no_revela_las_respuestas(): void
    {
        $this->get('/juegos/quiz-linux')
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->component('Juegos/Show')
                ->has('questions.0', fn (Assert $q) => $q
                    ->hasAll(['id', 'question', 'type', 'options', 'points', 'order'])
                    ->missing('correct_answer')
                    ->missing('explanation')
                )
            );
    }

    public function test_un_juego_inexistente_da_404(): void
    {
        $this->get('/juegos/no-existe')->assertNotFound();
    }

    public function test_hay_que_iniciar_sesion_para_guardar_la_puntuacion(): void
    {
        $this->postJson('/juegos/quiz-linux/submit', ['answers' => [], 'time_seconds' => 30])
            ->assertUnauthorized();
    }

    public function test_puntua_todas_las_respuestas_correctas(): void
    {
        $user = User::factory()->create();
        $game = Game::where('slug', 'quiz-linux')->first();
        $max = $game->questions->sum('points');

        $this->actingAs($user)
            ->postJson('/juegos/quiz-linux/submit', ['answers' => $this->respuestasCorrectas($game), 'time_seconds' => 120])
            ->assertOk()
            ->assertJson(['score' => $max, 'max_score' => $max]);

        $this->assertDatabaseHas('game_scores', ['user_id' => $user->id, 'game_id' => $game->id, 'score' => $max]);
    }

    public function test_las_respuestas_incorrectas_no_suman(): void
    {
        $game = Game::where('slug', 'quiz-linux')->first();
        $respuestas = $game->questions->mapWithKeys(fn ($q) => [$q->id => 'respuesta inventada'])->all();

        $this->actingAs(User::factory()->create())
            ->postJson('/juegos/quiz-linux/submit', ['answers' => $respuestas, 'time_seconds' => 120])
            ->assertOk()
            ->assertJson(['score' => 0])
            ->assertJsonCount($game->questions->count(), 'results');
    }

    public function test_la_correccion_ignora_mayusculas_y_espacios(): void
    {
        $game = Game::where('slug', 'quiz-linux')->first();
        $primera = $game->questions->first();

        $response = $this->actingAs(User::factory()->create())
            ->postJson('/juegos/quiz-linux/submit', [
                'answers' => [$primera->id => '  '.strtoupper($primera->correct_answer).' '],
                'time_seconds' => 120,
            ]);

        $this->assertTrue($response->json('results.0.correct'));
    }

    public function test_corrige_los_juegos_de_ordenar_bloques(): void
    {
        $game = Game::where('slug', 'ordena-docker')->first();
        $correctas = $this->respuestasCorrectas($game);
        $primera = array_key_first($correctas);
        $correctas[$primera] = array_reverse($correctas[$primera]);   // una mal ordenada

        $response = $this->actingAs(User::factory()->create())
            ->postJson('/juegos/ordena-docker/submit', ['answers' => $correctas, 'time_seconds' => 120])
            ->assertOk();

        $results = collect($response->json('results'))->keyBy('question_id');
        $this->assertFalse($results[$primera]['correct']);
        $this->assertSame($game->questions->count() - 1, $results->where('correct', true)->count());
    }

    public function test_valida_el_envio(): void
    {
        $this->actingAs(User::factory()->create())
            ->postJson('/juegos/quiz-linux/submit', ['time_seconds' => -5])
            ->assertUnprocessable()
            ->assertJsonValidationErrors(['answers', 'time_seconds']);
    }

    public function test_el_ranking_solo_cuenta_la_semana_actual(): void
    {
        $game = Game::first();
        $ana = User::factory()->create(['name' => 'Ana García']);
        $luis = User::factory()->create(['name' => 'Luis Pérez']);

        GameScore::create(['user_id' => $ana->id, 'game_id' => $game->id, 'score' => 300, 'max_score' => 500, 'time_seconds' => 60, 'completed_at' => now()]);
        GameScore::create(['user_id' => $luis->id, 'game_id' => $game->id, 'score' => 900, 'max_score' => 500, 'time_seconds' => 60, 'completed_at' => now()->subWeeks(2)]);

        $this->get('/ranking')
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->component('Ranking')
                ->has('leaderboard', 1)
                ->where('leaderboard.0.user_name', 'Ana G.')
                ->where('leaderboard.0.total_score', 300)
            );
    }
}
