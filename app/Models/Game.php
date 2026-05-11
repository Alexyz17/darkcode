<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Game extends Model
{
    protected $fillable = [
        'slug', 'title', 'description', 'type', 'course_slug', 'difficulty', 'is_active',
    ];

    protected function casts(): array
    {
        return [
            'is_active' => 'boolean',
        ];
    }

    public function questions(): HasMany
    {
        return $this->hasMany(GameQuestion::class)->orderBy('order');
    }

    public function scores(): HasMany
    {
        return $this->hasMany(GameScore::class);
    }
}
