<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class GameQuestion extends Model
{
    protected $fillable = [
        'game_id', 'question', 'type', 'options', 'correct_answer', 'explanation', 'points', 'order',
    ];

    protected function casts(): array
    {
        return [
            'options' => 'array',
            'points'  => 'integer',
            'order'   => 'integer',
        ];
    }

    public function game(): BelongsTo
    {
        return $this->belongsTo(Game::class);
    }
}
