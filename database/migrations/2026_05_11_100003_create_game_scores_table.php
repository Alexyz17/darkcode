<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('game_scores', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->foreignId('game_id')->constrained()->cascadeOnDelete();
            $table->unsignedInteger('score');
            $table->unsignedInteger('max_score');
            $table->unsignedInteger('time_seconds');
            $table->timestamp('completed_at');

            $table->index(['game_id', 'completed_at']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('game_scores');
    }
};
