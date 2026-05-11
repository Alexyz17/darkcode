<?php

namespace App\Http\Controllers;

use App\Models\Game;
use App\Models\GameScore;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Inertia\Inertia;

class LeaderboardController extends Controller
{
    public function index(Request $request)
    {
        $gameSlug = $request->query('game');
        $userId   = auth()->id();

        // Build base query for this week
        $query = GameScore::thisWeek()
            ->selectRaw('user_id, SUM(score) as total_score, COUNT(*) as games_played')
            ->groupBy('user_id')
            ->orderByDesc('total_score')
            ->orderBy('games_played')
            ->with('user:id,name');

        if ($gameSlug) {
            $game = Game::where('slug', $gameSlug)->firstOrFail();
            $query->where('game_id', $game->id);
        }

        $rows = $query->limit(20)->get();

        $leaderboard = $rows->map(fn ($row, $i) => [
            'rank'         => $i + 1,
            'user_name'    => $this->truncateName($row->user->name ?? 'Anónimo'),
            'total_score'  => (int) $row->total_score,
            'games_played' => (int) $row->games_played,
        ]);

        // Current user's position if logged in and not already in top 20
        $userEntry = null;

        if ($userId) {
            $inTop = $rows->firstWhere('user_id', $userId);

            if (! $inTop) {
                // Calculate their rank among ALL users this week
                $userScore = GameScore::thisWeek()
                    ->selectRaw('user_id, SUM(score) as total_score, COUNT(*) as games_played')
                    ->groupBy('user_id')
                    ->having('user_id', $userId)
                    ->first();

                if ($userScore) {
                    $rank = GameScore::thisWeek()
                        ->selectRaw('user_id, SUM(score) as total_score')
                        ->groupBy('user_id')
                        ->havingRaw('SUM(score) > ?', [$userScore->total_score])
                        ->count();

                    $userEntry = [
                        'rank'         => $rank + 1,
                        'user_name'    => $this->truncateName(auth()->user()->name),
                        'total_score'  => (int) $userScore->total_score,
                        'games_played' => (int) $userScore->games_played,
                    ];
                }
            }
        }

        // Next Monday 00:00 reset
        $nextReset = Carbon::now()->next(Carbon::MONDAY)->startOfDay()->toIso8601String();

        $games = Game::where('is_active', true)->get(['id', 'slug', 'title']);

        return Inertia::render('Ranking', [
            'leaderboard' => $leaderboard,
            'userEntry'   => $userEntry,
            'nextReset'   => $nextReset,
            'games'       => $games,
            'activeGame'  => $gameSlug,
        ]);
    }

    // ---------------------------------------------------------------------------

    private function truncateName(string $name): string
    {
        $parts = explode(' ', $name);
        $first = $parts[0] ?? '';
        $last  = isset($parts[1]) ? ' ' . strtoupper($parts[1][0]) . '.' : '';

        return $first . $last;
    }
}
