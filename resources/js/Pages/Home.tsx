import AppLayout from '@/layouts/AppLayout';
import { Link, Head } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { useInView } from '@/hooks/useInView';
import {
    ArrowRight, CirclePlay, Package, Coffee, Zap, Brain, Code2,
    CheckCircle2, Star, Terminal, Server, Shield, Lock,
    BookOpen, Clock, ChevronRight, Sparkles, Globe, Users
} from 'lucide-react';

// ─── Animación scroll ────────────────────────────────────────────────────────

function Reveal({
    children,
    className = '',
    delay = 0,
}: {
    children: React.ReactNode;
    className?: string;
    delay?: number;
}) {
    const [ref, visible] = useInView();
    return (
        <div
            ref={ref}
            className={`transition-all duration-700 ease-out ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} ${className}`}
            style={{ transitionDelay: visible ? `${delay}ms` : '0ms' }}
        >
            {children}
        </div>
    );
}

// ─── Datos ───────────────────────────────────────────────────────────────────

const stats = [
    { value: '12', label: 'Cursos', icon: BookOpen },
    { value: '5', label: 'Gratis', icon: CirclePlay },
    { value: '400+', label: 'Min contenido', icon: Clock },
    { value: '1', label: 'Pago único Beta', icon: Star },
];

const pillars = [
    { icon: Brain, label: 'IA práctica', desc: 'Integra modelos, crea agentes y automatiza con IA real.' },
    { icon: Code2, label: 'Programación', desc: 'Linux, Laravel y APIs. Sin teoría inútil.' },
    { icon: Zap, label: 'Automatización', desc: 'n8n, Docker y flujos que trabajan por ti.' },
];

const freeCourses = [
    { icon: Terminal, color: 'text-orange-400', bg: 'bg-orange-500/10', title: 'Introducción a Linux', lessons: 12, duration: '2h 30min', href: '/lecciones/linux-esencial' },
    { icon: Terminal, color: 'text-orange-400', bg: 'bg-orange-500/10', title: 'Comandos Linux esenciales', lessons: 9, duration: '1h 45min', href: '/lecciones/comandos-linux' },
    { icon: Terminal, color: 'text-orange-400', bg: 'bg-orange-500/10', title: 'Shell Scripting con Bash', lessons: 15, duration: '3h 10min', href: '/lecciones/shell-scripting' },
    { icon: Code2, color: 'text-red-400', bg: 'bg-red-500/10', title: 'Primeros pasos con Laravel', lessons: 18, duration: '3h 15min', href: '/lecciones/laravel' },
    { icon: Shield, color: 'text-emerald-400', bg: 'bg-emerald-500/10', title: 'Seguridad básica en la web', lessons: 10, duration: '2h 10min', href: '/lecciones/seguridad-web' },
];

const premiumCourses = [
    { icon: Code2, color: 'text-red-400', bg: 'bg-red-500/10', title: 'Eloquent ORM avanzado', lessons: 22, duration: '4h 30min' },
    { icon: Code2, color: 'text-red-400', bg: 'bg-red-500/10', title: 'APIs REST con Laravel', lessons: 25, duration: '5h 00min' },
    { icon: Brain, color: 'text-purple-400', bg: 'bg-purple-500/10', title: 'Programación con IA', lessons: 28, duration: '5h 45min' },
    { icon: Brain, color: 'text-purple-400', bg: 'bg-purple-500/10', title: 'Fine-tuning de modelos', lessons: 30, duration: '6h 20min' },
    { icon: Server, color: 'text-blue-400', bg: 'bg-blue-500/10', title: 'Docker desde cero', lessons: 24, duration: '4h 50min' },
    { icon: Zap, color: 'text-yellow-400', bg: 'bg-yellow-500/10', title: 'Automatiza con n8n', lessons: 20, duration: '3h 50min' },
    { icon: Server, color: 'text-blue-400', bg: 'bg-blue-500/10', title: 'Máquinas Virtuales con Linux', lessons: 22, duration: '4h 20min' },
];

const roadmap = [
    { step: '01', color: 'bg-orange-500', title: 'Terminal & Linux', desc: 'La base de todo servidor y entorno de desarrollo.' },
    { step: '02', color: 'bg-red-500', title: 'PHP & Laravel', desc: 'Backend profesional con el framework más popular.' },
    { step: '03', color: 'bg-blue-500', title: 'Servidores & Docker', desc: 'Despliega tus apps en cualquier entorno.' },
    { step: '04', color: 'bg-purple-500', title: 'IA & Automatización', desc: 'Integra modelos y automatiza flujos con n8n.' },
];

// ─── Componente principal ─────────────────────────────────────────────────────

export default function Home() {
    const { i18n } = useTranslation();
    const lang = i18n.language as 'es' | 'en' | 'ca';

    const copy = {
        es: {
            badge: '🚀 Beta abierta — Únete ahora',
            h1a: 'Aprende', h1b: 'IA, Linux y DevOps', h1c: 'con proyectos reales',
            sub: 'Contenido directo, sin relleno. Desde la terminal hasta los modelos de IA. Gratis para empezar, premium para dominar.',
            cta1: 'Ver cursos gratis', cta2: 'Beta de por vida — 19€',
            statsTitle: 'La plataforma en números',
            pillarsTitle: '¿Qué es DarkCode?',
            freeTitle: 'Empieza gratis hoy mismo',
            freeSub: 'Sin cuenta. Sin tarjeta. Accede a 5 cursos completos ahora mismo.',
            premiumTitle: 'Da el siguiente paso',
            premiumSub: 'Cursos avanzados, contenido exclusivo y acceso a todo lo que viene.',
            roadmapTitle: 'Tu hoja de ruta',
            roadmapSub: 'Un camino claro desde cero hasta el desarrollo profesional.',
            betaTitle: 'Acceso Beta — 19€ de por vida',
            betaSub: 'Entra ahora mientras la plataforma crece. El precio sube en la v1.',
            betaItems: [
                'Todos los cursos premium desbloqueados',
                'Vídeos privados antes de publicarlos',
                'Roadmaps y guías descargables en PDF',
                'Comunidad privada en Discord',
                'Actualizaciones de contenido gratuitas para siempre',
                'El precio sube cuando salga la versión definitiva',
            ],
            betaBtn: 'Unirme al Beta — 19€',
            betaNote: 'Pago único · Sin renovaciones · Sin sorpresas',
            productsTitle: 'Recursos descargables',
            productsSub: 'PDFs, roadmaps y cheat sheets para tener siempre a mano.',
            supportTitle: '¿Te aporta valor?',
            supportSub: 'Invítame a un café y ayudas a que DarkCode siga creciendo.',
            ctaFinalTitle: '¿Listo para empezar?',
            ctaFinalSub: 'Cursos gratuitos disponibles ahora. Sin registro.',
        },
        en: {
            badge: '🚀 Beta open — Join now',
            h1a: 'Learn', h1b: 'AI, Linux & DevOps', h1c: 'with real projects',
            sub: 'Straight-to-the-point content. From the terminal to AI models. Free to start, premium to master.',
            cta1: 'See free courses', cta2: 'Lifetime Beta — €19',
            statsTitle: 'The platform in numbers',
            pillarsTitle: 'What is DarkCode?',
            freeTitle: 'Start for free today',
            freeSub: 'No account. No card. Access 5 full courses right now.',
            premiumTitle: 'Take the next step',
            premiumSub: 'Advanced courses, exclusive content and access to everything coming.',
            roadmapTitle: 'Your roadmap',
            roadmapSub: 'A clear path from zero to professional development.',
            betaTitle: 'Beta Access — €19 lifetime',
            betaSub: 'Join now while the platform grows. Price goes up at v1.',
            betaItems: [
                'All premium courses unlocked',
                'Private videos before they go public',
                'Downloadable roadmaps and PDFs',
                'Private Discord community',
                'Free content updates forever',
                'Price increases at final release',
            ],
            betaBtn: 'Join Beta — €19',
            betaNote: 'One-time payment · No renewals · No surprises',
            productsTitle: 'Downloadable resources',
            productsSub: 'PDFs, roadmaps and cheat sheets to always have at hand.',
            supportTitle: 'Getting value from this?',
            supportSub: 'Buy me a coffee and help DarkCode keep growing.',
            ctaFinalTitle: 'Ready to start?',
            ctaFinalSub: 'Free courses available now. No sign-up needed.',
        },
        ca: {
            badge: '🚀 Beta oberta — Uneix-te ara',
            h1a: 'Aprèn', h1b: 'IA, Linux i DevOps', h1c: 'amb projectes reals',
            sub: 'Contingut directe, sense farcit. Des de la terminal fins als models d\'IA. Gratis per començar, premium per dominar.',
            cta1: 'Veure cursos gratis', cta2: 'Beta de per vida — 19€',
            statsTitle: 'La plataforma en xifres',
            pillarsTitle: 'Què és DarkCode?',
            freeTitle: 'Comença gratis avui mateix',
            freeSub: 'Sense compte. Sense targeta. Accedeix a 5 cursos complets ara.',
            premiumTitle: 'Fes el següent pas',
            premiumSub: 'Cursos avançats, contingut exclusiu i accés a tot el que ve.',
            roadmapTitle: 'El teu full de ruta',
            roadmapSub: 'Un camí clar des de zero fins al desenvolupament professional.',
            betaTitle: 'Accés Beta — 19€ de per vida',
            betaSub: 'Entra ara mentre la plataforma creix. El preu puja a la v1.',
            betaItems: [
                'Tots els cursos premium desbloquejats',
                'Vídeos privats abans de publicar-los',
                'Roadmaps i guies descarregables en PDF',
                'Comunitat privada a Discord',
                'Actualitzacions de contingut gratuïtes per sempre',
                'El preu puja quan surti la versió definitiva',
            ],
            betaBtn: 'Unir-me al Beta — 19€',
            betaNote: 'Pagament únic · Sense renovacions · Sense sorpreses',
            productsTitle: 'Recursos descarregables',
            productsSub: 'PDFs, roadmaps i cheat sheets per tenir sempre a mà.',
            supportTitle: 'T\'aporta valor?',
            supportSub: 'Convida\'m a un cafè i ajudes a que DarkCode segueixi creixent.',
            ctaFinalTitle: 'Llest per començar?',
            ctaFinalSub: 'Cursos gratuïts disponibles ara. Sense registre.',
        },
    };

    const c = copy[lang] ?? copy.es;

    return (
        <AppLayout>
            <Head>
                <title>DarkCode — Aprende IA, Linux y DevOps con proyectos reales</title>
                <meta name="description" content="12 cursos de Linux, Laravel, Docker, IA y automatización. 5 completamente gratis. Sin registro. Beta de por vida por solo 19€." />
            </Head>

            {/* ── HERO ──────────────────────────────────────────────────────── */}
            <section className="relative overflow-hidden px-4 pt-24 pb-32 sm:px-6 lg:px-8">
                {/* Gradientes de fondo */}
                <div className="pointer-events-none absolute inset-0">
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(99,102,241,0.2),transparent)] dark:bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(99,102,241,0.3),transparent)]" />
                    <div className="absolute top-1/4 left-1/4 h-64 w-64 rounded-full bg-purple-500/5 blur-3xl dark:bg-purple-500/10" />
                    <div className="absolute top-1/3 right-1/4 h-48 w-48 rounded-full bg-indigo-500/5 blur-3xl dark:bg-indigo-500/10" />
                </div>

                {/* Cuadrícula decorativa */}
                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(99,102,241,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.03)_1px,transparent_1px)] bg-[size:64px_64px]" />

                <div className="relative max-w-4xl mx-auto text-center">
                    <div className="inline-flex items-center gap-2 mb-6 text-xs font-semibold uppercase tracking-widest text-indigo-500 border border-indigo-500/30 bg-indigo-500/10 px-4 py-1.5 rounded-full animate-pulse">
                        <Sparkles className="h-3.5 w-3.5" /> {c.badge}
                    </div>

                    <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.08] mb-6">
                        {c.h1a}{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
                            {c.h1b}
                        </span>
                        <br />{c.h1c}
                    </h1>

                    <p className="text-gray-500 dark:text-gray-400 text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
                        {c.sub}
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700 text-white h-13 px-8 text-base shadow-lg shadow-indigo-500/25" asChild>
                            <Link href="/cursos">
                                <CirclePlay className="h-5 w-5" /> {c.cta1}
                            </Link>
                        </Button>
                        <Button size="lg" variant="outline" className="border-amber-500/50 text-amber-500 hover:bg-amber-500/10 h-13 px-8 text-base" asChild>
                            <Link href="/beta">
                                {c.cta2} <ArrowRight className="h-4 w-4" />
                            </Link>
                        </Button>
                    </div>

                    {/* Social proof */}
                    <div className="mt-10 flex items-center justify-center gap-2 text-sm text-gray-400">
                        <div className="flex -space-x-2">
                            {['A','B','C','D'].map(l => (
                                <div key={l} className="h-7 w-7 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 border-2 border-white dark:border-gray-950 flex items-center justify-center text-[10px] font-bold text-white">{l}</div>
                            ))}
                        </div>
                        <span>Cientos de desarrolladores ya aprendiendo</span>
                    </div>
                </div>
            </section>

            {/* ── STATS BAR ──────────────────────────────────────────────────── */}
            <section className="py-12 px-4 sm:px-6 lg:px-8 border-y border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/30">
                <div className="max-w-5xl mx-auto">
                    <Reveal className="grid grid-cols-2 sm:grid-cols-4 gap-8">
                        {stats.map(({ value, label, icon: Icon }, i) => (
                            <div
                                key={label}
                                className="flex flex-col items-center text-center"
                                style={{ transitionDelay: `${i * 80}ms` }}
                            >
                                <div className="p-2.5 rounded-xl bg-indigo-50 dark:bg-indigo-900/30 mb-3">
                                    <Icon className="h-5 w-5 text-indigo-500" />
                                </div>
                                <span className="text-3xl font-extrabold text-gray-900 dark:text-white">{value}</span>
                                <span className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">{label}</span>
                            </div>
                        ))}
                    </Reveal>
                </div>
            </section>

            {/* ── CURSOS GRATUITOS ───────────────────────────────────────────── */}
            <section className="py-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-6xl mx-auto">
                    <Reveal className="text-center mb-12">
                        <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 rounded-full mb-4">
                            <CirclePlay className="h-3.5 w-3.5" /> 100% Gratis
                        </div>
                        <h2 className="text-3xl sm:text-4xl font-bold mb-3">{c.freeTitle}</h2>
                        <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto">{c.freeSub}</p>
                    </Reveal>

                    <Reveal>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                            {freeCourses.map(({ icon: Icon, color, bg, title, lessons, duration, href }, i) => (
                                <Link
                                    key={title}
                                    href={href}
                                    className="group relative flex flex-col rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-5 hover:border-emerald-500/50 hover:shadow-lg hover:shadow-emerald-500/5 transition-all duration-300"
                                    style={{ transitionDelay: `${i * 60}ms` }}
                                >
                                    <div className="absolute top-0 left-0 right-0 h-0.5 rounded-t-2xl bg-emerald-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                                    <div className="flex items-start justify-between mb-3">
                                        <div className={`p-2 rounded-lg ${bg}`}>
                                            <Icon className={`h-5 w-5 ${color}`} />
                                        </div>
                                        <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/30 px-2.5 py-1 rounded-full">Gratis</span>
                                    </div>
                                    <h3 className="font-semibold text-gray-900 dark:text-white mb-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{title}</h3>
                                    <div className="flex items-center gap-3 text-xs text-gray-400 mt-auto pt-3 border-t border-gray-100 dark:border-gray-800">
                                        <span className="flex items-center gap-1"><BookOpen className="h-3 w-3" />{lessons} lecciones</span>
                                        <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{duration}</span>
                                        <ChevronRight className="h-3.5 w-3.5 ml-auto text-gray-300 group-hover:text-indigo-500 transition-colors" />
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* ── PILARES / QUÉ ES DARKCODE ─────────────────────────────────── */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 border-y border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/30">
                <div className="max-w-5xl mx-auto">
                    <Reveal className="text-center mb-12">
                        <h2 className="text-3xl sm:text-4xl font-bold mb-3">{c.pillarsTitle}</h2>
                    </Reveal>
                    <Reveal>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                            {pillars.map(({ icon: Icon, label, desc }, i) => (
                                <div
                                    key={label}
                                    className="flex flex-col items-center text-center p-7 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 hover:border-indigo-500/30 transition-colors duration-300"
                                    style={{ transitionDelay: `${i * 100}ms` }}
                                >
                                    <div className="p-3.5 rounded-2xl bg-indigo-50 dark:bg-indigo-900/30 mb-5">
                                        <Icon className="h-7 w-7 text-indigo-500" />
                                    </div>
                                    <h3 className="font-bold text-lg mb-2">{label}</h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{desc}</p>
                                </div>
                            ))}
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* ── HOJA DE RUTA ───────────────────────────────────────────────── */}
            <section className="py-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-5xl mx-auto">
                    <Reveal className="text-center mb-12">
                        <h2 className="text-3xl sm:text-4xl font-bold mb-3">{c.roadmapTitle}</h2>
                        <p className="text-gray-500 dark:text-gray-400">{c.roadmapSub}</p>
                    </Reveal>
                    <Reveal>
                        <div className="relative">
                            {/* Línea conectora */}
                            <div className="hidden lg:block absolute top-8 left-[12.5%] right-[12.5%] h-0.5 bg-gradient-to-r from-orange-500 via-red-500 via-blue-500 to-purple-500 opacity-30" />
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                                {roadmap.map(({ step, color, title, desc }, i) => (
                                    <div
                                        key={step}
                                        className="flex flex-col items-center text-center"
                                        style={{ transitionDelay: `${i * 120}ms` }}
                                    >
                                        <div className={`h-16 w-16 rounded-2xl ${color} flex items-center justify-center text-white font-extrabold text-xl mb-4 shadow-lg`}>
                                            {step}
                                        </div>
                                        <h3 className="font-bold mb-1.5">{title}</h3>
                                        <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{desc}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* ── PREMIUM — CURSOS AVANZADOS ─────────────────────────────────── */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50/50 dark:bg-gray-900/30 border-y border-gray-100 dark:border-gray-800">
                <div className="max-w-6xl mx-auto">
                    <Reveal className="text-center mb-12">
                        <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-amber-500 border border-amber-500/30 bg-amber-500/10 px-4 py-1.5 rounded-full mb-4">
                            <Star className="h-3.5 w-3.5" /> Premium
                        </div>
                        <h2 className="text-3xl sm:text-4xl font-bold mb-3">{c.premiumTitle}</h2>
                        <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto">{c.premiumSub}</p>
                    </Reveal>

                    <Reveal>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                            {premiumCourses.map(({ icon: Icon, color, bg, title, lessons, duration }, i) => (
                                <div
                                    key={title}
                                    className="relative group flex flex-col rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-5 overflow-hidden"
                                    style={{ transitionDelay: `${i * 60}ms` }}
                                >
                                    {/* Blur overlay para indicar premium */}
                                    <div className="absolute inset-0 backdrop-blur-[1px] bg-white/30 dark:bg-gray-950/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl z-10">
                                        <Link href="/beta" className="flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white text-sm font-bold px-5 py-2.5 rounded-xl transition-colors">
                                            <Lock className="h-4 w-4" /> Desbloquear con Beta
                                        </Link>
                                    </div>
                                    <div className="flex items-start justify-between mb-3">
                                        <div className={`p-2 rounded-lg ${bg}`}>
                                            <Icon className={`h-5 w-5 ${color}`} />
                                        </div>
                                        <span className="text-xs font-bold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/30 px-2.5 py-1 rounded-full flex items-center gap-1">
                                            <Lock className="h-3 w-3" /> Premium
                                        </span>
                                    </div>
                                    <h3 className="font-semibold text-gray-900 dark:text-white mb-1">{title}</h3>
                                    <div className="flex items-center gap-3 text-xs text-gray-400 mt-auto pt-3 border-t border-gray-100 dark:border-gray-800">
                                        <span className="flex items-center gap-1"><BookOpen className="h-3 w-3" />{lessons} lecciones</span>
                                        <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{duration}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Reveal>

                    <Reveal delay={200} className="text-center mt-8">
                        <Link href="/cursos" className="text-sm text-indigo-500 hover:text-indigo-600 font-medium inline-flex items-center gap-1">
                            Ver todos los cursos <ArrowRight className="h-3.5 w-3.5" />
                        </Link>
                    </Reveal>
                </div>
            </section>

            {/* ── BETA CTA ───────────────────────────────────────────────────── */}
            <section className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
                <div className="pointer-events-none absolute inset-0">
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_50%,rgba(245,158,11,0.08),transparent)]" />
                </div>
                <div className="relative max-w-3xl mx-auto">
                    <Reveal className="text-center">
                        <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-amber-500 border border-amber-500/30 bg-amber-500/10 px-4 py-1.5 rounded-full mb-6">
                            <Star className="h-3.5 w-3.5" /> Early Adopter
                        </div>
                        <h2 className="text-4xl sm:text-5xl font-extrabold mb-4">{c.betaTitle}</h2>
                        <p className="text-gray-500 dark:text-gray-400 mb-10 text-lg max-w-lg mx-auto">{c.betaSub}</p>
                    </Reveal>

                    <Reveal delay={100}>
                        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-8 mb-6">
                            <ul className="space-y-3.5">
                                {c.betaItems.map((item, i) => (
                                    <li key={i} className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                                        <CheckCircle2 className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </Reveal>

                    <Reveal delay={200} className="flex flex-col items-center gap-3">
                        <Button size="lg" className="bg-amber-500 hover:bg-amber-600 text-white font-bold h-14 px-12 text-lg shadow-xl shadow-amber-500/25 w-full sm:w-auto" asChild>
                            <Link href="/beta">{c.betaBtn}</Link>
                        </Button>
                        <p className="text-xs text-gray-400">{c.betaNote}</p>
                    </Reveal>
                </div>
            </section>

            {/* ── PRODUCTOS + SOPORTE ────────────────────────────────────────── */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 border-t border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/30">
                <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6">
                    <Reveal delay={0} className="sm:col-span-1">
                        <div className="h-full rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-7">
                            <div className="p-3 rounded-xl bg-indigo-50 dark:bg-indigo-900/30 w-fit mb-5">
                                <Package className="h-6 w-6 text-indigo-500" />
                            </div>
                            <h3 className="text-lg font-bold mb-2">{c.productsTitle}</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mb-5">{c.productsSub}</p>
                            <Button variant="outline" size="sm" className="border-gray-300 dark:border-gray-700" asChild>
                                <Link href="/productos">{lang === 'en' ? 'See products' : lang === 'ca' ? 'Veure productes' : 'Ver productos'} <ArrowRight className="h-3.5 w-3.5" /></Link>
                            </Button>
                        </div>
                    </Reveal>

                    <Reveal delay={100} className="sm:col-span-1">
                        <div className="h-full rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-7">
                            <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-900/20 w-fit mb-5">
                                <Coffee className="h-6 w-6 text-amber-500" />
                            </div>
                            <h3 className="text-lg font-bold mb-2">{c.supportTitle}</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mb-5">{c.supportSub}</p>
                            <Button className="bg-amber-500 hover:bg-amber-600 text-white font-semibold" size="sm" asChild>
                                <Link href="/apoya">{lang === 'en' ? 'Support DarkCode ☕' : lang === 'ca' ? 'Donar suport ☕' : 'Apoyar DarkCode ☕'}</Link>
                            </Button>
                        </div>
                    </Reveal>

                    <Reveal delay={200} className="sm:col-span-1">
                        <div className="h-full rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-7 flex flex-col justify-between">
                            <div>
                                <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 w-fit mb-5">
                                    <Globe className="h-6 w-6 text-emerald-500" />
                                </div>
                                <h3 className="text-lg font-bold mb-2">{lang === 'en' ? '3 languages' : lang === 'ca' ? '3 idiomes' : '3 idiomas'}</h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400 mb-5">
                                    {lang === 'en' ? 'All content available in Spanish, Catalan and English.'
                                        : lang === 'ca' ? 'Tot el contingut disponible en espanyol, català i anglès.'
                                        : 'Todo el contenido disponible en español, catalán e inglés.'}
                                </p>
                            </div>
                            <div className="flex gap-2">
                                {['ES', 'CA', 'EN'].map(l => (
                                    <span key={l} className="text-xs font-bold px-2.5 py-1 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400">{l}</span>
                                ))}
                            </div>
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* ── CTA FINAL ──────────────────────────────────────────────────── */}
            <section className="py-24 px-4 sm:px-6 lg:px-8">
                <Reveal className="max-w-2xl mx-auto text-center">
                    <h2 className="text-4xl sm:text-5xl font-extrabold mb-4">{c.ctaFinalTitle}</h2>
                    <p className="text-gray-500 dark:text-gray-400 mb-8 text-lg">{c.ctaFinalSub}</p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700 text-white h-13 px-8 text-base shadow-lg shadow-indigo-500/25" asChild>
                            <Link href="/cursos">
                                <CirclePlay className="h-5 w-5" /> {lang === 'en' ? 'Browse courses' : lang === 'ca' ? 'Veure cursos' : 'Ver cursos'}
                            </Link>
                        </Button>
                        <Button size="lg" variant="outline" className="border-amber-500/50 text-amber-500 hover:bg-amber-500/10 h-13 px-8 text-base" asChild>
                            <Link href="/beta">
                                {lang === 'en' ? 'Join Beta — €19' : lang === 'ca' ? 'Unir-me al Beta — 19€' : 'Unirme al Beta — 19€'} <ArrowRight className="h-4 w-4" />
                            </Link>
                        </Button>
                    </div>
                </Reveal>
            </section>
        </AppLayout>
    );
}
