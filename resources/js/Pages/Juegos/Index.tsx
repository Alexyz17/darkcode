import AppLayout from '@/layouts/AppLayout';
import { Head, Link, usePage } from '@inertiajs/react';
import { motion } from 'framer-motion';
import {
    Trophy, Gamepad2, Zap, Code2, Terminal, Layers,
    Eye, Star, ChevronRight, Medal
} from 'lucide-react';
import type { Game, LeaderboardEntry, SharedProps } from '@/types';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const typeLabel: Record<string, string> = {
    quiz:         'Quiz',
    fill_code:    'Completa el código',
    order_blocks: 'Ordena bloques',
    guess_output: 'Adivina el output',
};

const typeIcon: Record<string, React.ElementType> = {
    quiz:         Zap,
    fill_code:    Code2,
    order_blocks: Layers,
    guess_output: Eye,
};

const typeColor: Record<string, string> = {
    quiz:         'bg-indigo-500/15 text-indigo-400 border-indigo-500/30',
    fill_code:    'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
    order_blocks: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
    guess_output: 'bg-purple-500/15 text-purple-400 border-purple-500/30',
};

const difficultyLabel: Record<string, string> = {
    easy:   'Fácil',
    medium: 'Medio',
    hard:   'Difícil',
};

const difficultyColor: Record<string, string> = {
    easy:   'bg-emerald-500/15 text-emerald-400',
    medium: 'bg-amber-500/15 text-amber-400',
    hard:   'bg-red-500/15 text-red-400',
};

const medalEmoji = ['🥇', '🥈', '🥉'];

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------

interface Props {
    games: Game[];
    topThisWeek: (LeaderboardEntry & { rank: number })[];
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function JuegosIndex() {
    const { games, topThisWeek } = usePage<SharedProps & Props>().props;
    const { auth } = usePage<SharedProps>().props;

    return (
        <AppLayout>
            <Head>
                <title>Juegos y Retos — DarkCode</title>
            </Head>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45 }}
                >
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2.5 rounded-xl bg-indigo-500/15">
                            <Gamepad2 className="h-6 w-6 text-indigo-400" />
                        </div>
                        <h1 className="text-4xl font-bold">Juegos y Retos</h1>
                    </div>
                    <p className="text-gray-400 ml-14">
                        Pon en práctica lo que has aprendido y escala en el ranking semanal.
                    </p>
                </motion.div>

                {/* Weekly top-3 banner */}
                {topThisWeek.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.45, delay: 0.08 }}
                        className="rounded-2xl border border-amber-500/30 bg-gradient-to-r from-amber-500/10 via-yellow-500/5 to-transparent p-6"
                    >
                        <div className="flex items-center justify-between mb-5">
                            <div className="flex items-center gap-2">
                                <Trophy className="h-5 w-5 text-amber-400" />
                                <h2 className="font-bold text-amber-400">Top 3 esta semana</h2>
                            </div>
                            <Link
                                href="/ranking"
                                className="text-xs text-amber-500 hover:text-amber-400 transition-colors flex items-center gap-1"
                            >
                                Ver ranking completo <ChevronRight className="h-3.5 w-3.5" />
                            </Link>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            {topThisWeek.map((entry, i) => (
                                <div
                                    key={i}
                                    className="flex items-center gap-3 bg-white/5 dark:bg-white/5 rounded-xl px-4 py-3 border border-white/10"
                                >
                                    <span className="text-2xl">{medalEmoji[i] ?? `#${entry.rank}`}</span>
                                    <div className="min-w-0">
                                        <p className="font-semibold text-sm truncate">{entry.user_name}</p>
                                        <p className="text-xs text-gray-400">{entry.total_score.toLocaleString()} pts</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}

                {/* Games grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                    {games.map((game, i) => {
                        const TypeIcon = typeIcon[game.type] ?? Terminal;

                        return (
                            <motion.div
                                key={game.id}
                                initial={{ opacity: 0, y: 28 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: 0.05 * i }}
                            >
                                <Link
                                    href={`/juegos/${game.slug}`}
                                    className="group flex flex-col h-full rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/60 hover:border-indigo-500/50 hover:bg-white dark:hover:bg-gray-900 transition-all overflow-hidden shadow-sm hover:shadow-indigo-500/10 hover:shadow-lg"
                                >
                                    {/* Top accent line */}
                                    <div className={`h-1.5 w-full ${
                                        game.difficulty === 'easy' ? 'bg-emerald-500' :
                                        game.difficulty === 'medium' ? 'bg-amber-500' : 'bg-red-500'
                                    }`} />

                                    <div className="p-5 flex flex-col h-full gap-4">
                                        {/* Badges */}
                                        <div className="flex items-center gap-2 flex-wrap">
                                            <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full border ${typeColor[game.type]}`}>
                                                <TypeIcon className="h-3 w-3" />
                                                {typeLabel[game.type]}
                                            </span>
                                            <span className={`inline-flex items-center text-xs font-semibold px-2.5 py-1 rounded-full ${difficultyColor[game.difficulty]}`}>
                                                {difficultyLabel[game.difficulty]}
                                            </span>
                                        </div>

                                        {/* Title + description */}
                                        <div className="flex-1">
                                            <h3 className="font-bold text-lg mb-1 group-hover:text-indigo-400 transition-colors">
                                                {game.title}
                                            </h3>
                                            <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed line-clamp-2">
                                                {game.description}
                                            </p>
                                        </div>

                                        {/* Footer */}
                                        <div className="flex items-center justify-between border-t border-gray-100 dark:border-gray-800 pt-3">
                                            <div className="flex items-center gap-3 text-xs text-gray-400">
                                                <span>{game.questions_count} preguntas</span>
                                                {game.user_best_score != null && (
                                                    <span className="flex items-center gap-1 text-amber-500">
                                                        <Star className="h-3 w-3" />
                                                        {game.user_best_score} pts
                                                    </span>
                                                )}
                                                {game.user_best_score == null && auth.user && (
                                                    <span className="text-gray-500">Sin jugar</span>
                                                )}
                                            </div>
                                            <span className="text-xs font-semibold text-indigo-400 group-hover:translate-x-1 transition-transform flex items-center gap-1">
                                                Jugar <ChevronRight className="h-3.5 w-3.5" />
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        );
                    })}
                </div>

                {games.length === 0 && (
                    <div className="text-center py-24 text-gray-500">
                        <Gamepad2 className="h-12 w-12 mx-auto mb-4 opacity-25" />
                        <p>No hay juegos disponibles por el momento.</p>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
