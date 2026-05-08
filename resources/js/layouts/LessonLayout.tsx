import AppLayout from '@/layouts/AppLayout';
import { Link } from '@inertiajs/react';
import { ChevronRight, BookOpen, Clock, Lock, CheckCircle2, ArrowLeft, ArrowRight } from 'lucide-react';

export interface Module {
    id: string;
    title: string;
    free: boolean;
}

interface LessonLayoutProps {
    children: React.ReactNode;
    title: string;
    description: string;
    duration: string;
    lessons: number;
    level: 'Básico' | 'Intermedio' | 'Avanzado';
    premium: boolean;
    modules: Module[];
    activeModule: string;
    prevHref?: string;
    nextHref?: string;
    category: string;
}

const levelColor = {
    'Básico': 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/30',
    'Intermedio': 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/30',
    'Avanzado': 'text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/30',
};

export default function LessonLayout({
    children, title, description, duration, lessons, level,
    premium, modules, activeModule, prevHref, nextHref, category,
}: LessonLayoutProps) {
    return (
        <AppLayout>
            {/* Breadcrumb */}
            <div className="border-b border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/30">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                    <Link href="/" className="hover:text-gray-900 dark:hover:text-white transition-colors">DarkCode</Link>
                    <ChevronRight className="h-3.5 w-3.5" />
                    <Link href="/cursos" className="hover:text-gray-900 dark:hover:text-white transition-colors">Cursos</Link>
                    <ChevronRight className="h-3.5 w-3.5" />
                    <span className="text-gray-700 dark:text-gray-200 font-medium truncate">{title}</span>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <div className="flex flex-col lg:flex-row gap-10">

                    {/* ── Sidebar ── */}
                    <aside className="lg:w-72 shrink-0">
                        {/* Info del curso */}
                        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-5 mb-4 sticky top-24">
                            <div className="flex items-center gap-2 mb-3">
                                <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${levelColor[level]}`}>{level}</span>
                                {!premium && <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/30 px-2.5 py-0.5 rounded-full">Gratis</span>}
                                {premium && <span className="text-xs font-bold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/30 px-2.5 py-0.5 rounded-full">Premium</span>}
                            </div>
                            <h2 className="font-bold text-base mb-1.5 leading-snug">{title}</h2>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mb-4 leading-relaxed">{description}</p>
                            <div className="flex items-center gap-4 text-xs text-gray-400 mb-4">
                                <span className="flex items-center gap-1"><BookOpen className="h-3.5 w-3.5" />{lessons} lecciones</span>
                                <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{duration}</span>
                            </div>

                            {/* Módulos */}
                            <div className="border-t border-gray-100 dark:border-gray-800 pt-4 space-y-1">
                                <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">Módulos</p>
                                {modules.map(mod => (
                                    <div key={mod.id}>
                                        {mod.free ? (
                                            <Link
                                                href={mod.id}
                                                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                                                    mod.id === activeModule
                                                        ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 font-medium'
                                                        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'
                                                }`}
                                            >
                                                <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-emerald-500" />
                                                <span className="truncate">{mod.title}</span>
                                            </Link>
                                        ) : (
                                            <div className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-gray-400 cursor-not-allowed">
                                                <Lock className="h-3.5 w-3.5 shrink-0" />
                                                <span className="truncate">{mod.title}</span>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>

                            {premium && (
                                <Link href="/beta" className="mt-4 w-full flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-600 text-white font-bold text-sm py-2.5 rounded-xl transition-colors">
                                    <Lock className="h-3.5 w-3.5" /> Desbloquear — 19€
                                </Link>
                            )}
                        </div>
                    </aside>

                    {/* ── Contenido ── */}
                    <article className="flex-1 min-w-0 prose prose-gray dark:prose-invert max-w-none
                        prose-headings:font-bold prose-headings:tracking-tight
                        prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl
                        prose-code:bg-gray-100 dark:prose-code:bg-gray-800
                        prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded
                        prose-code:text-sm prose-code:font-mono prose-code:before:content-none prose-code:after:content-none
                        prose-pre:bg-gray-900 dark:prose-pre:bg-gray-950 prose-pre:border prose-pre:border-gray-800
                        prose-pre:rounded-xl prose-pre:text-sm
                        prose-a:text-indigo-600 dark:prose-a:text-indigo-400
                        prose-blockquote:border-indigo-500 prose-blockquote:bg-indigo-50 dark:prose-blockquote:bg-indigo-900/20
                        prose-blockquote:px-4 prose-blockquote:py-1 prose-blockquote:rounded-r-lg prose-blockquote:not-italic
                    ">
                        {children}
                    </article>
                </div>

                {/* Navegación anterior / siguiente */}
                {(prevHref || nextHref) && (
                    <div className="max-w-4xl mx-auto mt-12 pt-8 border-t border-gray-100 dark:border-gray-800 flex justify-between gap-4">
                        {prevHref ? (
                            <Link href={prevHref} className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors">
                                <ArrowLeft className="h-4 w-4" /> Lección anterior
                            </Link>
                        ) : <div />}
                        {nextHref && (
                            <Link href={nextHref} className="flex items-center gap-2 text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors">
                                Siguiente lección <ArrowRight className="h-4 w-4" />
                            </Link>
                        )}
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
