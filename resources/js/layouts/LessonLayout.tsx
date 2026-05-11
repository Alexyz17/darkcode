import AppLayout from '@/layouts/AppLayout';
import { Head, Link } from '@inertiajs/react';
import { ChevronRight, BookOpen, Clock, Lock, CheckCircle2, ArrowLeft, ArrowRight } from 'lucide-react';
import VideoPlayer from '@/components/VideoPlayer';

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
    videoId?: string;
    allUnlocked?: boolean;
}

const levelColor = {
    'Básico':      'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/30',
    'Intermedio':  'text-amber-600   dark:text-amber-400   bg-amber-50   dark:bg-amber-900/30',
    'Avanzado':    'text-red-600     dark:text-red-400     bg-red-50     dark:bg-red-900/30',
};

export default function LessonLayout({
    children, title, description, duration, lessons, level,
    premium, modules, activeModule, prevHref, nextHref, category,
    videoId, allUnlocked = false,
}: LessonLayoutProps) {
    const courseSchema = {
        '@context': 'https://schema.org',
        '@type': 'Course',
        name: title,
        description,
        provider: { '@type': 'Organization', name: 'DarkCode', url: 'https://darkcode.es' },
        inLanguage: 'es',
        isAccessibleForFree: !premium,
        hasCourseInstance: {
            '@type': 'CourseInstance',
            courseMode: 'online',
            courseWorkload: `PT${duration}`,
        },
        about: { '@type': 'Thing', name: category },
    };

    return (
        <AppLayout>
            <Head>
                <script type="application/ld+json">{JSON.stringify(courseSchema)}</script>
            </Head>

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
                        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-5 mb-4 sticky top-24">
                            <div className="flex items-center gap-2 mb-3">
                                <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${levelColor[level]}`}>{level}</span>
                                {!premium
                                    ? <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/30 px-2.5 py-0.5 rounded-full">Gratis</span>
                                    : <span className="text-xs font-bold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/30 px-2.5 py-0.5 rounded-full">Premium</span>
                                }
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
                                {modules.map(mod => {
                                    const isActive = mod.id === activeModule;
                                    const isClickable = mod.free || allUnlocked;
                                    const baseClass = `flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors`;
                                    const activeClass = 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 font-medium';
                                    const idleClass   = 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800';
                                    const lockedClass = 'text-gray-400 dark:text-gray-600 cursor-not-allowed';

                                    if (isClickable) {
                                        return (
                                            <Link key={mod.id} href={mod.id}
                                                className={`${baseClass} ${isActive ? activeClass : idleClass}`}>
                                                <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-emerald-500" />
                                                <span className="truncate">{mod.title}</span>
                                            </Link>
                                        );
                                    }
                                    return (
                                        <div key={mod.id} className={`${baseClass} ${lockedClass}`}>
                                            <Lock className="h-3.5 w-3.5 shrink-0" />
                                            <span className="truncate">{mod.title}</span>
                                        </div>
                                    );
                                })}
                            </div>

                            {premium && !allUnlocked && (
                                <Link href="/beta"
                                    className="mt-4 w-full flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-600 text-white font-bold text-sm py-2.5 rounded-xl transition-colors">
                                    <Lock className="h-3.5 w-3.5" /> Desbloquear — 19€
                                </Link>
                            )}
                        </div>
                    </aside>

                    {/* ── Contenido ── */}
                    <div className="flex-1 min-w-0">
                        {/* Vídeo embed (si tiene YouTube ID) */}
                        {videoId && <VideoPlayer videoId={videoId} title={title} />}

                        <article className="
                            max-w-none text-slate-300

                            [&>h1]:text-3xl [&>h1]:font-extrabold [&>h1]:tracking-tight
                            [&>h1]:text-white [&>h1]:mb-6 [&>h1]:mt-0 [&>h1]:leading-tight

                            [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:tracking-tight
                            [&_h2]:text-indigo-300 [&_h2]:mt-12 [&_h2]:mb-4
                            [&_h2]:pb-3 [&_h2]:border-b [&_h2]:border-slate-800

                            [&_h3]:text-lg [&_h3]:font-semibold
                            [&_h3]:text-slate-200 [&_h3]:mt-8 [&_h3]:mb-3

                            [&_h4]:text-base [&_h4]:font-semibold
                            [&_h4]:text-slate-300 [&_h4]:mt-6 [&_h4]:mb-2

                            [&_p]:leading-[1.8] [&_p]:text-slate-300 [&_p]:mb-4

                            [&_strong]:text-slate-100 [&_strong]:font-semibold

                            [&_ul]:my-4 [&_ul]:space-y-2 [&_ul]:pl-0 [&_ul]:list-none
                            [&_ul>li]:flex [&_ul>li]:gap-2.5 [&_ul>li]:text-slate-300
                            [&_ul>li]:before:content-['▸'] [&_ul>li]:before:text-indigo-400
                            [&_ul>li]:before:shrink-0 [&_ul>li]:before:mt-px [&_ul>li]:leading-relaxed

                            [&_ol]:my-4 [&_ol]:space-y-2 [&_ol]:pl-6
                            [&_ol>li]:text-slate-300 [&_ol>li]:leading-relaxed

                            [&_code]:bg-slate-800 [&_code]:text-slate-200
                            [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded
                            [&_code]:text-[0.8125rem] [&_code]:font-mono
                            [&_code]:before:content-none [&_code]:after:content-none

                            [&_pre]:hidden

                            [&_a]:text-indigo-400 [&_a]:underline-offset-2 [&_a]:decoration-indigo-500/50
                            [&_a:hover]:text-indigo-300

                            [&_blockquote]:border-l-4 [&_blockquote]:border-indigo-500
                            [&_blockquote]:bg-indigo-950/30 [&_blockquote]:px-5 [&_blockquote]:py-3
                            [&_blockquote]:rounded-r-xl [&_blockquote]:my-6 [&_blockquote]:not-italic
                            [&_blockquote]:text-slate-300 [&_blockquote]:leading-relaxed
                            [&_blockquote_p]:mb-0
                        ">
                            {children}
                        </article>
                    </div>
                </div>

                {/* Navegación anterior / siguiente */}
                {(prevHref ?? nextHref) && (
                    <div className="max-w-4xl mx-auto mt-12 pt-8 border-t border-gray-100 dark:border-gray-800 flex justify-between gap-4">
                        {prevHref
                            ? <Link href={prevHref} className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors">
                                <ArrowLeft className="h-4 w-4" /> Lección anterior
                              </Link>
                            : <div />
                        }
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
