<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Carbon;

class GameScore extends Model
{
    public $timestamps = false;

    protected $fillable = [
        'user_id', 'game_id', 'score', 'max_score', 'time_seconds', 'completed_at',
    ];

    protected function casts(): array
    {
        return [
            'completed_at' => 'datetime',
            'score'        => 'integer',
            'max_score'    => 'integer',
            'time_seconds' => 'integer',
        ];
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function game(): BelongsTo
    {
        return $this->belongsTo(Game::class);
    }

    /**
     * Scope: only scores completed during the current calendar week (Mon–Sun).
     */
    public function scopeThisWeek(Builder $query): Builder
    {
        $start = Carbon::now()->startOfWeek(Carbon::MONDAY);
        $end   = Carbon::now()->endOfWeek(Carbon::SUNDAY);

        return $query->whereBetween('completed_at', [$start, $end]);
    }
}
