import AppLayout from '@/layouts/AppLayout';
import { Head, usePage } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Trophy, Clock, Gamepad2, ChevronRight } from 'lucide-react';
import type { LeaderboardEntry, GameSummary, SharedProps } from '@/types';

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------

interface Props {
    leaderboard: LeaderboardEntry[];
    userEntry: (LeaderboardEntry) | null;
    nextReset: string;         // ISO 8601
    games: GameSummary[];
    activeGame: string | null;
}

// ---------------------------------------------------------------------------
// Countdown hook
// ---------------------------------------------------------------------------

function useCountdown(targetIso: string) {
    const target = new Date(targetIso).getTime();

    const calc = () => {
        const diff = Math.max(0, target - Date.now());
        const d = Math.floor(diff / 86_400_000);
        const h = Math.floor((diff % 86_400_000) / 3_600_000);
        const m = Math.floor((diff % 3_600_000) / 60_000);
        const s = Math.floor((diff % 60_000) / 1_000);
        return { d, h, m, s };
    };

    const [time, setTime] = useState(calc);

    useEffect(() => {
        const id = setInterval(() => setTime(calc()), 1000);
        return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [targetIso]);

    return time;
}

// ---------------------------------------------------------------------------
// Medal helper
// ---------------------------------------------------------------------------

const medalEmoji = ['🥇', '🥈', '🥉'];

function RankBadge({ rank }: { rank: number }) {
    if (rank <= 3) {
        return <span className="text-xl">{medalEmoji[rank - 1]}</span>;
    }
    return (
        <span className="w-7 h-7 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-xs font-bold text-gray-500">
            {rank}
        </span>
    );
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function Ranking() {
    const { leaderboard, userEntry, nextReset, games, activeGame } = usePage<SharedProps & Props>().props;
    const { auth } = usePage<SharedProps>().props;

    const countdown = useCountdown(nextReset);

    const pad = (n: number) => String(n).padStart(2, '0');

    const handleGameFilter = (slug: string | null) => {
        const url = slug ? `/ranking?game=${slug}` : '/ranking';
        window.location.href = url;
    };

    return (
        <AppLayout>
            <Head>
                <title>Ranking semanal — DarkCode</title>
            </Head>

            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                >
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2.5 rounded-xl bg-amber-500/15">
                            <Trophy className="h-6 w-6 text-amber-400" />
                        </div>
                        <h1 className="text-4xl font-bold">Ranking semanal</h1>
                    </div>
                    <p className="text-gray-400 ml-14">
                        Top 20 de la semana actual. Se reinicia cada lunes a las 00:00.
                    </p>
                </motion.div>

                {/* Countdown + game filter row */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">

                    {/* Countdown */}
                    <div className="flex items-center gap-3 bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl px-5 py-3">
                        <Clock className="h-4 w-4 text-gray-400 shrink-0" />
                        <div>
                            <p className="text-xs text-gray-400 mb-0.5">Reset en</p>
                            <p className="font-mono font-bold text-sm">
                                {countdown.d > 0 && `${countdown.d}d `}
                                {pad(countdown.h)}:{pad(countdown.m)}:{pad(countdown.s)}
                            </p>
                        </div>
                    </div>

                    {/* Game filter pills */}
                    <div className="flex items-center gap-2 flex-wrap">
                        <button
                            onClick={() => handleGameFilter(null)}
                            className={`text-xs font-semibold px-3 py-1.5 rounded-full border transition-colors ${
                                !activeGame
                                    ? 'bg-indigo-600 border-indigo-600 text-white'
                                    : 'border-gray-200 dark:border-gray-700 text-gray-500 hover:border-indigo-500 hover:text-indigo-400'
                            }`}
                        >
                            Global
                        </button>
                        {games.map(g => (
                            <button
                                key={g.slug}
                                onClick={() => handleGameFilter(g.slug)}
                                className={`text-xs font-semibold px-3 py-1.5 rounded-full border transition-colors ${
                                    activeGame === g.slug
                                        ? 'bg-indigo-600 border-indigo-600 text-white'
                                        : 'border-gray-200 dark:border-gray-700 text-gray-500 hover:border-indigo-500 hover:text-indigo-400'
                                }`}
                            >
                                {g.title}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Leaderboard table */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.08 }}
                    className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 overflow-hidden"
                >
                    {leaderboard.length === 0 ? (
                        <div className="py-20 text-center text-gray-400">
                            <Trophy className="h-10 w-10 mx-auto mb-3 opacity-20" />
                            <p className="text-sm">Nadie ha jugado esta semana todavía.</p>
                            <a
                                href="/juegos"
                                className="mt-4 inline-flex items-center gap-1.5 text-sm text-indigo-400 hover:text-indigo-300 transition-colors"
                            >
                                <Gamepad2 className="h-4 w-4" /> Sé el primero <ChevronRight className="h-3.5 w-3.5" />
                            </a>
                        </div>
                    ) : (
                        <>
                            {/* Table header */}
                            <div className="grid grid-cols-[auto_1fr_auto_auto] gap-4 px-5 py-3 border-b border-gray-100 dark:border-gray-800 text-xs font-semibold uppercase tracking-wider text-gray-400">
                                <span className="w-7 text-center">#</span>
                                <span>Jugador</span>
                                <span className="text-right">Puntos</span>
                                <span className="text-right">Juegos</span>
                            </div>

                            {/* Rows */}
                            {leaderboard.map((entry, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.25, delay: i * 0.03 }}
                                    className={`grid grid-cols-[auto_1fr_auto_auto] gap-4 items-center px-5 py-4 border-b border-gray-50 dark:border-gray-800/60 last:border-0 ${
                                        entry.rank <= 3 ? 'bg-amber-50/40 dark:bg-amber-900/5' : ''
                                    }`}
                                >
                                    {/* Medal / rank */}
                                    <div className="w-7 flex items-center justify-center">
                                        <RankBadge rank={entry.rank} />
                                    </div>

                                    {/* Avatar + name */}
                                    <div className="flex items-center gap-3 min-w-0">
                                        <div className="h-8 w-8 rounded-full bg-indigo-600 flex items-center justify-center text-xs font-bold text-white shrink-0">
                                            {entry.user_name.charAt(0).toUpperCase()}
                                        </div>
                                        <span className="font-semibold text-sm truncate">{entry.user_name}</span>
                                    </div>

                                    {/* Score */}
                                    <span className="text-right font-bold text-sm text-indigo-500">
                                        {entry.total_score.toLocaleString()}
                                    </span>

                                    {/* Games played */}
                                    <span className="text-right text-xs text-gray-400">{entry.games_played} j.</span>
                                </motion.div>
                            ))}
                        </>
                    )}
                </motion.div>

                {/* Current user row — if outside top 20 */}
                {userEntry && auth.user && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.35, delay: 0.2 }}
                        className="rounded-2xl border-2 border-indigo-500 bg-indigo-50 dark:bg-indigo-900/10 px-5 py-4"
                    >
                        <p className="text-xs text-indigo-400 font-semibold mb-2">Tu posición esta semana</p>
                        <div className="grid grid-cols-[auto_1fr_auto_auto] gap-4 items-center">
                            <div className="w-7 flex items-center justify-center">
                                <span className="w-7 h-7 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-xs font-bold text-indigo-600 dark:text-indigo-400">
                                    {userEntry.rank}
                                </span>
                            </div>
                            <div className="flex items-center gap-3 min-w-0">
                                <div className="h-8 w-8 rounded-full bg-indigo-600 flex items-center justify-center text-xs font-bold text-white shrink-0">
                                    {userEntry.user_name.charAt(0).toUpperCase()}
                                </div>
                                <span className="font-semibold text-sm truncate">{userEntry.user_name}</span>
                            </div>
                            <span className="text-right font-bold text-sm text-indigo-600 dark:text-indigo-400">
                                {userEntry.total_score.toLocaleString()}
                            </span>
                            <span className="text-right text-xs text-gray-400">{userEntry.games_played} j.</span>
                        </div>
                    </motion.div>
                )}

                {/* CTA if no user */}
                {!auth.user && (
                    <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 text-center space-y-3">
                        <p className="font-semibold">Entra al ranking</p>
                        <p className="text-sm text-gray-400">Regístrate para que tus puntuaciones cuenten en el ranking semanal.</p>
                        <div className="flex justify-center gap-3">
                            <a
                                href="/register"
                                className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-xl transition-colors"
                            >
                                Crear cuenta gratis
                            </a>
                            <a
                                href="/juegos"
                                className="px-5 py-2 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 text-sm font-semibold rounded-xl transition-colors flex items-center gap-1.5"
                            >
                                <Gamepad2 className="h-4 w-4" /> Ver juegos
                            </a>
                        </div>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
