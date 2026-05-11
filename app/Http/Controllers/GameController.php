<?php

namespace App\Http\Controllers;

use App\Models\Game;
use App\Models\GameScore;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Inertia\Inertia;

class GameController extends Controller
{
    /**
     * List all active games with the current user's best score.
     */
    public function index()
    {
        $userId = auth()->id();

        $games = Game::where('is_active', true)
            ->withCount('questions')
            ->get()
            ->map(function (Game $game) use ($userId) {
                $bestScore = null;

                if ($userId) {
                    $bestScore = GameScore::where('game_id', $game->id)
                        ->where('user_id', $userId)
                        ->max('score');
                }

                return [
                    'id'              => $game->id,
                    'slug'            => $game->slug,
                    'title'           => $game->title,
                    'description'     => $game->description,
                    'type'            => $game->type,
                    'difficulty'      => $game->difficulty,
                    'questions_count' => $game->questions_count,
                    'user_best_score' => $bestScore,
                ];
            });

        // Top 3 of the week for the banner
        $topThisWeek = GameScore::thisWeek()
            ->selectRaw('user_id, SUM(score) as total_score')
            ->groupBy('user_id')
            ->orderByDesc('total_score')
            ->limit(3)
            ->with('user:id,name')
            ->get()
            ->map(fn ($row, $i) => [
                'rank'        => $i + 1,
                'user_name'   => $this->truncateName($row->user->name ?? 'Anónimo'),
                'total_score' => (int) $row->total_score,
            ]);

        return Inertia::render('Juegos/Index', [
            'games'       => $games,
            'topThisWeek' => $topThisWeek,
        ]);
    }

    /**
     * Show one game's questions (without revealing correct_answer).
     */
    public function show(string $slug)
    {
        $game = Game::where('slug', $slug)->where('is_active', true)->firstOrFail();

        $questions = $game->questions->map(fn (object $q) => [
            'id'       => $q->id,
            'question' => $q->question,
            'type'     => $q->type,
            'options'  => $q->options,
            'points'   => $q->points,
            'order'    => $q->order,
        ]);

        return Inertia::render('Juegos/Show', [
            'game'      => [
                'id'          => $game->id,
                'slug'        => $game->slug,
                'title'       => $game->title,
                'description' => $game->description,
                'type'        => $game->type,
                'difficulty'  => $game->difficulty,
            ],
            'questions' => $questions,
        ]);
    }

    /**
     * Receive answers, calculate score, persist and return result.
     */
    public function submit(Request $request, string $slug)
    {
        $request->validate([
            'answers'      => 'required|array',
            'time_seconds' => 'required|integer|min:0',
            'hints_used'   => 'nullable|array',
            'hints_used.*' => 'integer',
        ]);

        $game      = Game::where('slug', $slug)->where('is_active', true)->firstOrFail();
        $questions = $game->questions;
        $maxScore  = $questions->sum('points');
        $score     = 0;
        $results   = [];
        $hintsUsed = collect($request->hints_used ?? []);

        foreach ($questions as $question) {
            $userAnswer = $request->answers[$question->id] ?? null;
            $correct    = $this->isCorrect($question->type, $userAnswer, $question->correct_answer);
            $earned     = 0;

            if ($correct) {
                $earned = $question->points;

                // Apply 50% penalty if hint was used
                if ($hintsUsed->contains($question->id)) {
                    $earned = (int) round($earned * 0.5);
                }

                // +10% bonus if the total time was fast (< 10 seconds per question on average)
                $avgSeconds = $questions->count() > 0
                    ? (int) $request->time_seconds / $questions->count()
                    : $request->time_seconds;

                if ($avgSeconds < 10) {
                    $earned = (int) round($earned * 1.1);
                }
            }

            $score += $earned;

            $results[] = [
                'question_id'    => $question->id,
                'correct'        => $correct,
                'correct_answer' => $question->correct_answer,
                'explanation'    => $question->explanation,
                'points_earned'  => $earned,
                'max_points'     => $question->points,
            ];
        }

        GameScore::create([
            'user_id'      => auth()->id(),
            'game_id'      => $game->id,
            'score'        => $score,
            'max_score'    => $maxScore,
            'time_seconds' => $request->time_seconds,
            'completed_at' => Carbon::now(),
        ]);

        return response()->json([
            'score'        => $score,
            'max_score'    => $maxScore,
            'time_seconds' => $request->time_seconds,
            'results'      => $results,
        ]);
    }

    // ---------------------------------------------------------------------------

    private function isCorrect(string $type, mixed $userAnswer, string $correctAnswer): bool
    {
        if ($userAnswer === null) {
            return false;
        }

        return match ($type) {
            'order_blocks' => json_encode($userAnswer) === $correctAnswer,
            default        => strtolower(trim((string) $userAnswer)) === strtolower(trim($correctAnswer)),
        };
    }

    private function truncateName(string $name): string
    {
        $parts = explode(' ', $name);
        $first = $parts[0] ?? '';
        $last  = isset($parts[1]) ? ' ' . strtoupper($parts[1][0]) . '.' : '';

        return $first . $last;
    }
}
