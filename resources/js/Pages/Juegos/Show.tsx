import AppLayout from '@/layouts/AppLayout';
import { Head, usePage, router } from '@inertiajs/react';
import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    CheckCircle2, XCircle, Clock, Trophy, RotateCcw,
    ChevronRight, ArrowUp, ArrowDown, Lightbulb, Send,
    Star, Zap
} from 'lucide-react';
import type { Game, GameQuestion, GameSubmitResult, QuestionResult, SharedProps } from '@/types';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface Props {
    game: Game;
    questions: GameQuestion[];
}

type Answers = Record<number, string | string[] | number[]>;

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function ProgressBar({ current, total }: { current: number; total: number }) {
    const pct = total > 0 ? Math.round((current / total) * 100) : 0;
    return (
        <div className="h-2 w-full bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
            <motion.div
                className="h-full bg-indigo-500 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${pct}%` }}
                transition={{ duration: 0.4 }}
            />
        </div>
    );
}

function TimerBar({ seconds, max }: { seconds: number; max: number }) {
    const pct = max > 0 ? Math.max(0, (seconds / max) * 100) : 0;
    const color = seconds <= 10 ? 'bg-red-500' : seconds <= 20 ? 'bg-amber-500' : 'bg-emerald-500';
    return (
        <div className="flex items-center gap-3">
            <Clock className="h-4 w-4 text-gray-400 shrink-0" />
            <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
                <motion.div
                    className={`h-full rounded-full ${color}`}
                    animate={{ width: `${pct}%` }}
                    transition={{ duration: 0.5 }}
                />
            </div>
            <span className={`text-sm font-mono font-bold w-6 text-right ${seconds <= 10 ? 'text-red-500' : 'text-gray-400'}`}>
                {seconds}
            </span>
        </div>
    );
}

// ---------------------------------------------------------------------------
// Quiz question renderer
// ---------------------------------------------------------------------------

function QuizQuestion({
    question,
    answered,
    result,
    onAnswer,
}: {
    question: GameQuestion;
    answered: boolean;
    result: QuestionResult | null;
    onAnswer: (value: string) => void;
}) {
    const opts = question.options ?? [];
    const [selected, setSelected] = useState<string | null>(null);

    const handleClick = (opt: string) => {
        if (answered) return;
        setSelected(opt);
        onAnswer(opt);
    };

    // After full game submit, result.correct_answer comes from server
    const serverCorrect = result?.correct_answer;
    const isServerData = serverCorrect && serverCorrect !== '…';

    return (
        <div className="space-y-3">
            {opts.map((opt, i) => {
                const isChosen = selected === opt;
                const isCorrectFromServer = isServerData && serverCorrect === opt;
                const isWrongChoice = isServerData && isChosen && !isCorrectFromServer;

                let cls = 'w-full text-left px-5 py-3.5 rounded-xl border transition-all text-sm font-medium ';
                if (!answered) {
                    cls += 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 cursor-pointer';
                } else if (isCorrectFromServer) {
                    cls += 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400';
                } else if (isWrongChoice) {
                    cls += 'border-red-500/50 bg-red-50 dark:bg-red-900/10 text-red-500';
                } else if (isChosen && !isServerData) {
                    cls += 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400';
                } else {
                    cls += 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 text-gray-400 cursor-default';
                }

                return (
                    <motion.button
                        key={i}
                        onClick={() => handleClick(opt)}
                        className={cls}
                        whileHover={!answered ? { scale: 1.01 } : {}}
                        whileTap={!answered ? { scale: 0.99 } : {}}
                    >
                        <span className="flex items-center gap-3">
                            <span className={`w-6 h-6 rounded-full border text-xs font-bold flex items-center justify-center shrink-0 ${
                                answered && isCorrectFromServer
                                    ? 'border-emerald-500 bg-emerald-500 text-white'
                                    : answered && isWrongChoice
                                        ? 'border-red-500 bg-red-500 text-white'
                                        : 'border-current'
                            }`}>
                                {String.fromCharCode(65 + i)}
                            </span>
                            {opt}
                        </span>
                    </motion.button>
                );
            })}
        </div>
    );
}

// ---------------------------------------------------------------------------
// Fill code renderer
// ---------------------------------------------------------------------------

function FillCodeQuestion({
    question,
    answered,
    result,
    onAnswer,
    hint,
    onHint,
}: {
    question: GameQuestion;
    answered: boolean;
    result: QuestionResult | null;
    onAnswer: (value: string) => void;
    hint: boolean;
    onHint: () => void;
}) {
    const [value, setValue] = useState('');

    // Show code with highlighted blank
    const parts = question.question.split('___');

    return (
        <div className="space-y-4">
            <pre className="bg-gray-900 text-gray-100 rounded-xl p-5 text-sm overflow-x-auto leading-relaxed font-mono border border-gray-700">
                {parts[0]}
                <span className={`${answered
                    ? result?.correct ? 'text-emerald-400' : 'text-red-400'
                    : 'text-indigo-400 underline decoration-dotted'}`}>
                    {answered ? result?.correct_answer : (value || '___')}
                </span>
                {parts[1] ?? ''}
            </pre>

            {!answered && (
                <div className="flex gap-3">
                    <input
                        type="text"
                        value={value}
                        onChange={e => setValue(e.target.value)}
                        onKeyDown={e => e.key === 'Enter' && value.trim() && onAnswer(value.trim())}
                        placeholder="Escribe tu respuesta..."
                        className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm focus:outline-none focus:border-indigo-500 transition-colors"
                        autoFocus
                    />
                    <button
                        onClick={() => value.trim() && onAnswer(value.trim())}
                        disabled={!value.trim()}
                        className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 text-white font-semibold rounded-xl text-sm transition-colors flex items-center gap-2"
                    >
                        <Send className="h-4 w-4" /> Enviar
                    </button>
                </div>
            )}

            {!answered && !hint && (
                <button
                    onClick={onHint}
                    className="text-xs text-amber-500 hover:text-amber-400 flex items-center gap-1.5 transition-colors"
                >
                    <Lightbulb className="h-3.5 w-3.5" /> Pista (resta 50% de puntos)
                </button>
            )}

            {hint && !answered && (
                <p className="text-xs bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/30 rounded-lg px-3 py-2">
                    Pista activada — los puntos de esta pregunta se reducen un 50% si aciertas.
                    Revisa la explicacion de la pregunta con atencion.
                </p>
            )}
        </div>
    );
}

// ---------------------------------------------------------------------------
// Order blocks renderer
// ---------------------------------------------------------------------------

function OrderBlocksQuestion({
    question,
    answered,
    result,
    onAnswer,
}: {
    question: GameQuestion;
    answered: boolean;
    result: QuestionResult | null;
    onAnswer: (order: number[]) => void;
}) {
    const blocks = question.options ?? [];
    const [order, setOrder] = useState<number[]>(() =>
        [...Array(blocks.length).keys()].sort(() => Math.random() - 0.5)
    );

    const move = (i: number, dir: -1 | 1) => {
        const next = [...order];
        const j = i + dir;
        if (j < 0 || j >= next.length) return;
        [next[i], next[j]] = [next[j], next[i]];
        setOrder(next);
    };

    const correctOrder: number[] = result
        ? JSON.parse(result.correct_answer)
        : [];

    return (
        <div className="space-y-4">
            <div className="space-y-2">
                {order.map((blockIdx, position) => {
                    const isCorrectPos = answered && correctOrder[position] === blockIdx;

                    return (
                        <motion.div
                            key={blockIdx}
                            layout
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl border text-sm font-mono transition-colors ${
                                !answered
                                    ? 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800'
                                    : isCorrectPos
                                        ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20'
                                        : 'border-red-500/40 bg-red-50 dark:bg-red-900/10'
                            }`}
                        >
                            <span className="text-xs text-gray-400 w-5 text-right shrink-0">{position + 1}.</span>
                            <span className="flex-1">{blocks[blockIdx]}</span>
                            {!answered && (
                                <div className="flex flex-col gap-0.5">
                                    <button onClick={() => move(position, -1)} disabled={position === 0} className="p-0.5 text-gray-400 hover:text-white disabled:opacity-20 transition-colors">
                                        <ArrowUp className="h-3.5 w-3.5" />
                                    </button>
                                    <button onClick={() => move(position, 1)} disabled={position === order.length - 1} className="p-0.5 text-gray-400 hover:text-white disabled:opacity-20 transition-colors">
                                        <ArrowDown className="h-3.5 w-3.5" />
                                    </button>
                                </div>
                            )}
                            {answered && (isCorrectPos
                                ? <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                                : <XCircle className="h-4 w-4 text-red-500 shrink-0" />
                            )}
                        </motion.div>
                    );
                })}
            </div>

            {!answered && (
                <button
                    onClick={() => onAnswer(order)}
                    className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl text-sm transition-colors flex items-center justify-center gap-2"
                >
                    <Send className="h-4 w-4" /> Confirmar orden
                </button>
            )}

            {answered && result && (
                <div className="text-xs bg-indigo-500/10 border border-indigo-500/30 rounded-lg px-3 py-2 text-indigo-400">
                    Orden correcto: {correctOrder.map(i => blocks[i]).join(' → ')}
                </div>
            )}
        </div>
    );
}

// ---------------------------------------------------------------------------
// Guess output renderer
// ---------------------------------------------------------------------------

function GuessOutputQuestion({
    question,
    answered,
    result,
    onAnswer,
}: {
    question: GameQuestion;
    answered: boolean;
    result: QuestionResult | null;
    onAnswer: (value: string) => void;
}) {
    const [value, setValue] = useState('');

    return (
        <div className="space-y-4">
            <pre className="bg-gray-900 text-gray-100 rounded-xl p-5 text-sm overflow-x-auto leading-relaxed font-mono border border-gray-700">
                {question.question}
            </pre>

            {!answered ? (
                <div className="flex gap-3">
                    <input
                        type="text"
                        value={value}
                        onChange={e => setValue(e.target.value)}
                        onKeyDown={e => e.key === 'Enter' && value.trim() && onAnswer(value.trim())}
                        placeholder="¿Qué imprime este código?"
                        className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm font-mono focus:outline-none focus:border-indigo-500 transition-colors"
                        autoFocus
                    />
                    <button
                        onClick={() => value.trim() && onAnswer(value.trim())}
                        disabled={!value.trim()}
                        className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 text-white font-semibold rounded-xl text-sm transition-colors flex items-center gap-2"
                    >
                        <Send className="h-4 w-4" /> Enviar
                    </button>
                </div>
            ) : (
                <div className={`flex items-start gap-3 px-4 py-3 rounded-xl border text-sm ${
                    result?.correct
                        ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400'
                        : 'border-red-500/40 bg-red-50 dark:bg-red-900/10 text-red-500'
                }`}>
                    {result?.correct
                        ? <CheckCircle2 className="h-4 w-4 shrink-0 mt-0.5" />
                        : <XCircle className="h-4 w-4 shrink-0 mt-0.5" />
                    }
                    <div>
                        <p className="font-semibold">{result?.correct ? '¡Correcto!' : 'Incorrecto'}</p>
                        {!result?.correct && (
                            <p className="text-xs mt-0.5 opacity-80">
                                La respuesta correcta es: <code className="font-mono font-bold">{result?.correct_answer}</code>
                            </p>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

// ---------------------------------------------------------------------------
// Results screen
// ---------------------------------------------------------------------------

function ResultsScreen({
    game,
    submitResult,
    onRetry,
}: {
    game: Game;
    submitResult: GameSubmitResult;
    onRetry: () => void;
}) {
    const pct = submitResult.max_score > 0
        ? Math.round((submitResult.score / submitResult.max_score) * 100)
        : 0;

    const minutes = Math.floor(submitResult.time_seconds / 60);
    const secs = submitResult.time_seconds % 60;
    const timeStr = minutes > 0 ? `${minutes}m ${secs}s` : `${secs}s`;

    const feedbackMsg =
        pct >= 90 ? '¡Increíble! Eres un experto.' :
        pct >= 70 ? '¡Muy bien! Casi perfecto.' :
        pct >= 50 ? 'Buen intento. Sigue practicando.' :
        'Puedes mejorar. ¡Vuelve a intentarlo!';

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8"
        >
            {/* Score header */}
            <div className="text-center space-y-3">
                <div className="text-6xl font-black text-indigo-500">{submitResult.score}</div>
                <p className="text-gray-400 text-sm">de {submitResult.max_score} puntos posibles</p>
                <div className="h-3 w-full max-w-xs mx-auto bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
                    <motion.div
                        className={`h-full rounded-full ${pct >= 70 ? 'bg-emerald-500' : pct >= 40 ? 'bg-amber-500' : 'bg-red-500'}`}
                        initial={{ width: 0 }}
                        animate={{ width: `${pct}%` }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    />
                </div>
                <p className="text-lg font-semibold">{pct}% de aciertos</p>
                <p className="text-gray-400 text-sm">{feedbackMsg}</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
                <div className="text-center rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-4">
                    <p className="text-2xl font-bold">{submitResult.results.filter(r => r.correct).length}</p>
                    <p className="text-xs text-gray-400 mt-1">Correctas</p>
                </div>
                <div className="text-center rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-4">
                    <p className="text-2xl font-bold">{submitResult.results.filter(r => !r.correct).length}</p>
                    <p className="text-xs text-gray-400 mt-1">Incorrectas</p>
                </div>
                <div className="text-center rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-4">
                    <p className="text-2xl font-bold">{timeStr}</p>
                    <p className="text-xs text-gray-400 mt-1">Tiempo</p>
                </div>
            </div>

            {/* Per-question breakdown */}
            <div className="space-y-3">
                <h3 className="font-bold">Desglose</h3>
                {submitResult.results.map((r, i) => (
                    <div
                        key={r.question_id}
                        className={`flex items-start gap-3 p-4 rounded-xl border text-sm ${
                            r.correct
                                ? 'border-emerald-500/40 bg-emerald-50 dark:bg-emerald-900/10'
                                : 'border-red-500/40 bg-red-50 dark:bg-red-900/10'
                        }`}
                    >
                        {r.correct
                            ? <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                            : <XCircle className="h-4 w-4 text-red-500 shrink-0 mt-0.5" />
                        }
                        <div className="flex-1 min-w-0">
                            <p className="font-medium">Pregunta {i + 1}</p>
                            {!r.correct && (
                                <p className="text-xs opacity-70 mt-0.5">
                                    Respuesta: <code className="font-mono">{r.correct_answer}</code>
                                </p>
                            )}
                            {r.explanation && (
                                <p className="text-xs opacity-60 mt-1 italic">{r.explanation}</p>
                            )}
                        </div>
                        <span className="text-xs font-bold shrink-0">+{r.points_earned}</span>
                    </div>
                ))}
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3">
                <button
                    onClick={onRetry}
                    className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-sm font-semibold"
                >
                    <RotateCcw className="h-4 w-4" /> Volver a intentarlo
                </button>
                <a
                    href="/juegos"
                    className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white transition-colors text-sm font-semibold"
                >
                    Más juegos <ChevronRight className="h-4 w-4" />
                </a>
                <a
                    href="/ranking"
                    className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-white transition-colors text-sm font-semibold"
                >
                    <Trophy className="h-4 w-4" /> Ver ranking
                </a>
            </div>
        </motion.div>
    );
}

// ---------------------------------------------------------------------------
// Main page
// ---------------------------------------------------------------------------

const QUESTION_TIME = 30;

export default function JuegosShow() {
    const { game, questions } = usePage<SharedProps & Props>().props;
    const { auth } = usePage<SharedProps>().props;

    const [currentIndex, setCurrentIndex] = useState(0);
    const [answers, setAnswers] = useState<Answers>({});
    const [results, setResults] = useState<Record<number, QuestionResult>>({});
    const [timer, setTimer] = useState(QUESTION_TIME);
    const [totalSeconds, setTotalSeconds] = useState(0);
    const [submitting, setSubmitting] = useState(false);
    const [submitResult, setSubmitResult] = useState<GameSubmitResult | null>(null);
    const [hint, setHint] = useState(false);
    const [hintUsed, setHintUsed] = useState<Set<number>>(new Set());
    const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const totalTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

    const currentQuestion = questions[currentIndex];
    const isAnswered = currentQuestion ? results[currentQuestion.id] !== undefined : false;
    const isFinished = submitResult !== null;

    // Per-question countdown
    useEffect(() => {
        if (isFinished || isAnswered || !currentQuestion) return;

        setTimer(QUESTION_TIME);

        timerRef.current = setInterval(() => {
            setTimer(prev => {
                if (prev <= 1) {
                    clearInterval(timerRef.current!);
                    // Auto-answer as wrong after timeout
                    handleAnswerInternal(currentQuestion, null);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timerRef.current!);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentIndex, isFinished]);

    // Total time tracker
    useEffect(() => {
        if (isFinished) return;
        totalTimerRef.current = setInterval(() => setTotalSeconds(s => s + 1), 1000);
        return () => clearInterval(totalTimerRef.current!);
    }, [isFinished]);

    // -----------------------------------------------------------------------
    // Answer handling (per question, no submit yet — we accumulate)
    // -----------------------------------------------------------------------

    const handleAnswerInternal = useCallback((q: GameQuestion, value: string | number[] | null) => {
        clearInterval(timerRef.current!);

        const normalizedValue = value === null ? '' : value;

        setAnswers(prev => ({ ...prev, [q.id]: normalizedValue as string | number[] }));

        // Store a pending placeholder — correct/correct_answer are filled in after final submit.
        // We mark correct=false optimistically so the UI shows "answered" state immediately.
        setResults(prev => ({
            ...prev,
            [q.id]: {
                question_id: q.id,
                correct: false,         // will be overwritten after server submit
                correct_answer: '…',    // placeholder, replaced by server data
                explanation: null,
                points_earned: 0,
                max_points: q.points,
            },
        }));
    }, []);

    const handleAnswer = useCallback((q: GameQuestion, value: string | number[]) => {
        handleAnswerInternal(q, value);
    }, [handleAnswerInternal]);

    // -----------------------------------------------------------------------
    // Final submit
    // -----------------------------------------------------------------------

    const submitGame = useCallback(async () => {
        if (submitting) return;
        setSubmitting(true);

        // Build flat answers object: { [questionId]: answer }
        const payload: Record<number, string | number[]> = {};
        questions.forEach(q => {
            const ans = answers[q.id];
            if (ans !== undefined) {
                payload[q.id] = Array.isArray(ans) ? ans : String(ans);
            }
        });

        try {
            const response = await fetch(`/juegos/${game.slug}/submit`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': (document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement)?.content ?? '',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({ answers: payload, time_seconds: totalSeconds, hints_used: Array.from(hintUsed) }),
            });

            const data: GameSubmitResult = await response.json();
            setSubmitResult(data);

            // Enrich local results with server data
            const enriched: Record<number, QuestionResult> = {};
            data.results.forEach(r => { enriched[r.question_id] = r; });
            setResults(enriched);
        } catch {
            // fallback: keep local results
        } finally {
            setSubmitting(false);
        }
    }, [answers, game.slug, questions, submitting, totalSeconds]);

    // Move to next question or auto-submit at the end
    const goNext = useCallback(() => {
        if (currentIndex < questions.length - 1) {
            setCurrentIndex(i => i + 1);
            setHint(false);
        } else {
            submitGame();
        }
    }, [currentIndex, questions.length, submitGame]);

    const handleRetry = () => {
        setCurrentIndex(0);
        setAnswers({});
        setResults({});
        setSubmitResult(null);
        setTotalSeconds(0);
        setHint(false);
        setHintUsed(new Set());
    };

    // -----------------------------------------------------------------------
    // Render
    // -----------------------------------------------------------------------

    if (isFinished && submitResult) {
        return (
            <AppLayout>
                <Head><title>{game.title} — Resultados</title></Head>
                <ResultsScreen game={game} submitResult={submitResult} onRetry={handleRetry} />
            </AppLayout>
        );
    }

    if (!currentQuestion) return null;

    const localResult = results[currentQuestion.id] ?? null;

    return (
        <AppLayout>
            <Head><title>{game.title} — DarkCode</title></Head>

            <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-6">

                {/* Top bar */}
                <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm text-gray-400">
                        <span className="font-semibold text-gray-700 dark:text-gray-300">{game.title}</span>
                        <span>{currentIndex + 1} / {questions.length}</span>
                    </div>
                    <ProgressBar current={currentIndex} total={questions.length} />
                    {!isAnswered && (
                        <TimerBar seconds={timer} max={QUESTION_TIME} />
                    )}
                </div>

                {/* Question card */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentQuestion.id}
                        initial={{ opacity: 0, x: 40 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -40 }}
                        transition={{ duration: 0.3 }}
                        className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 space-y-6"
                    >
                        {/* Points badge */}
                        <div className="flex items-center justify-between">
                            <span className="text-xs text-gray-400">Pregunta {currentIndex + 1}</span>
                            <span className="text-xs font-bold text-indigo-400 bg-indigo-500/10 px-2.5 py-1 rounded-full flex items-center gap-1">
                                <Star className="h-3 w-3" />
                                {currentQuestion.points} pts
                            </span>
                        </div>

                        {/* Question text */}
                        {game.type !== 'fill_code' && game.type !== 'guess_output' && (
                            <p className="text-lg font-semibold leading-snug">{currentQuestion.question}</p>
                        )}

                        {/* Type-specific renderer */}
                        {game.type === 'quiz' && (
                            <QuizQuestion
                                question={currentQuestion}
                                answered={isAnswered}
                                result={localResult}
                                onAnswer={v => handleAnswer(currentQuestion, v)}
                            />
                        )}

                        {game.type === 'fill_code' && (
                            <FillCodeQuestion
                                question={currentQuestion}
                                answered={isAnswered}
                                result={localResult}
                                onAnswer={v => handleAnswer(currentQuestion, v)}
                                hint={hint}
                                onHint={() => { setHint(true); setHintUsed(p => new Set(p).add(currentQuestion.id)); }}
                            />
                        )}

                        {game.type === 'order_blocks' && (
                            <>
                                <p className="text-lg font-semibold leading-snug">{currentQuestion.question}</p>
                                <OrderBlocksQuestion
                                    question={currentQuestion}
                                    answered={isAnswered}
                                    result={localResult}
                                    onAnswer={v => handleAnswer(currentQuestion, v as number[])}
                                />
                            </>
                        )}

                        {game.type === 'guess_output' && (
                            <GuessOutputQuestion
                                question={currentQuestion}
                                answered={isAnswered}
                                result={localResult}
                                onAnswer={v => handleAnswer(currentQuestion, v)}
                            />
                        )}

                        {/* Feedback after answering */}
                        {isAnswered && localResult && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className={`flex items-start gap-3 p-4 rounded-xl border text-sm ${
                                    localResult.correct
                                        ? 'border-emerald-500/40 bg-emerald-50 dark:bg-emerald-900/10 text-emerald-700 dark:text-emerald-400'
                                        : 'border-red-500/40 bg-red-50 dark:bg-red-900/10 text-red-500'
                                }`}
                            >
                                {localResult.correct
                                    ? <CheckCircle2 className="h-5 w-5 shrink-0 mt-0.5" />
                                    : <XCircle className="h-5 w-5 shrink-0 mt-0.5" />
                                }
                                <div>
                                    <p className="font-semibold">{localResult.correct ? '¡Correcto!' : 'Incorrecto'}</p>
                                    {!localResult.correct && (
                                        <p className="text-xs mt-0.5 opacity-80">
                                            Respuesta: <code className="font-mono font-bold">{localResult.correct_answer}</code>
                                        </p>
                                    )}
                                </div>
                            </motion.div>
                        )}
                    </motion.div>
                </AnimatePresence>

                {/* Next / Finish button */}
                {isAnswered && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        {!auth.user && currentIndex === questions.length - 1 ? (
                            <p className="text-center text-sm text-gray-400">
                                <a href="/login" className="text-indigo-400 hover:underline">Inicia sesión</a> para guardar tu puntuación.
                            </p>
                        ) : null}

                        <button
                            onClick={goNext}
                            disabled={submitting}
                            className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 text-white font-semibold rounded-xl transition-colors flex items-center justify-center gap-2"
                        >
                            {currentIndex < questions.length - 1 ? (
                                <>Siguiente pregunta <ChevronRight className="h-4 w-4" /></>
                            ) : (
                                <>
                                    {submitting
                                        ? 'Enviando...'
                                        : <><Zap className="h-4 w-4" /> Ver resultados</>
                                    }
                                </>
                            )}
                        </button>
                    </motion.div>
                )}
            </div>
        </AppLayout>
    );
}
