export interface User {
    id: number;
    name: string;
    email: string;
    role: 'user' | 'premium' | 'admin';
    is_admin: boolean;
}

export interface SharedProps {
    auth: { user: User | null };
    flash: { success?: string; error?: string };
    [key: string]: unknown;
}

// ---------------------------------------------------------------------------
// Games / Leaderboard
// ---------------------------------------------------------------------------

export type GameType = 'quiz' | 'fill_code' | 'order_blocks' | 'guess_output';
export type Difficulty = 'easy' | 'medium' | 'hard';

export interface Game {
    id: number;
    slug: string;
    title: string;
    description: string;
    type: GameType;
    difficulty: Difficulty;
    questions_count: number;
    user_best_score?: number | null;
}

export interface GameQuestion {
    id: number;
    question: string;
    type: string;
    options?: string[] | null;
    points: number;
    order: number;
    // correct_answer is intentionally omitted — revealed by server only after submit
}

export interface QuestionResult {
    question_id: number;
    correct: boolean;
    correct_answer: string;
    explanation: string | null;
    points_earned: number;
    max_points: number;
}

export interface GameSubmitResult {
    score: number;
    max_score: number;
    time_seconds: number;
    results: QuestionResult[];
}

export interface LeaderboardEntry {
    rank: number;
    user_name: string;
    total_score: number;
    games_played: number;
}

export interface GameSummary {
    id: number;
    slug: string;
    title: string;
}
