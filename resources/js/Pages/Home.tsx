import AppLayout from '@/layouts/AppLayout';
import { Link } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import {
    ArrowRight, CirclePlay, Package, Coffee,
    Zap, Brain, Code2, CheckCircle2, Star
} from 'lucide-react';

const pillars = [
    { icon: Brain, label: 'IA práctica', desc: 'Sin teoría inútil. Proyectos reales.' },
    { icon: Code2, label: 'Programación', desc: 'Desde cero hasta portfolio.' },
    { icon: Zap,   label: 'Automatización', desc: 'Haz más, trabaja menos.' },
];

const freeContent = [
    'Vídeos cortos y directos al grano',
    'Sin fluff ni relleno',
    'Proyectos que puedes añadir a tu portfolio',
    'Acceso permanente y sin registro',
];

export default function Home() {
    const { t, i18n } = useTranslation();
    const lang = i18n.language;

    const copy = {
        es: {
            badge: 'Plataforma en construcción — Únete ahora',
            h1a: 'Aprende', h1b: 'IA y programación', h1c: 'con proyectos reales',
            sub: 'Contenido gratuito, directo y sin relleno. Cuando estés listo, da el siguiente paso.',
            cta1: 'Ver contenido gratis', cta2: 'Acceso Beta — 19€',
            pillarsTitle: '¿Qué es DarkCode?',
            freeTitle: 'Contenido 100% gratis',
            freeSub: 'Sin registro. Sin suscripción. Solo aprender.',
            betaTitle: 'Acceso Beta DarkCode',
            betaSub: 'Entra mientras la plataforma crece. Precio de early adopter, acceso de por vida.',
            betaItems: [
                'Vídeos privados antes de publicarlos',
                'Roadmaps y guías descargables',
                'Comunidad privada en Discord',
                'Precio sube cuando salga la v1',
            ],
            betaBtn: 'Unirme al Beta — 19€',
            betaNote: 'Pago único. Sin renovaciones. Sin sorpresas.',
            supportTitle: '¿Te aporta valor?',
            supportSub: 'Invítame a un café y ayudas a que DarkCode siga creciendo.',
            supportBtn: 'Apoyar DarkCode ☕',
            productsTitle: 'Mini productos',
            productsSub: 'Recursos descargables para acelerar tu aprendizaje.',
            productsBtn: 'Ver productos',
        },
        en: {
            badge: 'Platform in progress — Join now',
            h1a: 'Learn', h1b: 'AI and coding', h1c: 'with real projects',
            sub: 'Free, straight-to-the-point content. When you\'re ready, take the next step.',
            cta1: 'See free content', cta2: 'Beta access — €19',
            pillarsTitle: 'What is DarkCode?',
            freeTitle: '100% free content',
            freeSub: 'No sign-up. No subscription. Just learning.',
            betaTitle: 'DarkCode Beta Access',
            betaSub: 'Join while the platform grows. Early adopter price, lifetime access.',
            betaItems: [
                'Private videos before they go public',
                'Downloadable roadmaps and guides',
                'Private Discord community',
                'Price goes up at v1 launch',
            ],
            betaBtn: 'Join Beta — €19',
            betaNote: 'One-time payment. No renewals. No surprises.',
            supportTitle: 'Getting value from this?',
            supportSub: 'Buy me a coffee and help DarkCode keep growing.',
            supportBtn: 'Support DarkCode ☕',
            productsTitle: 'Mini products',
            productsSub: 'Downloadable resources to speed up your learning.',
            productsBtn: 'See products',
        },
        ca: {
            badge: 'Plataforma en construcció — Uneix-te ara',
            h1a: 'Aprèn', h1b: 'IA i programació', h1c: 'amb projectes reals',
            sub: 'Contingut gratuït, directe i sense farcit. Quan estiguis llest, dóna el següent pas.',
            cta1: 'Veure contingut gratis', cta2: 'Accés Beta — 19€',
            pillarsTitle: 'Què és DarkCode?',
            freeTitle: 'Contingut 100% gratuït',
            freeSub: 'Sense registre. Sense subscripció. Només aprendre.',
            betaTitle: 'Accés Beta DarkCode',
            betaSub: 'Entra mentre la plataforma creix. Preu d\'early adopter, accés de per vida.',
            betaItems: [
                'Vídeos privats abans de publicar-los',
                'Roadmaps i guies descarregables',
                'Comunitat privada a Discord',
                'El preu puja quan surti la v1',
            ],
            betaBtn: 'Unir-me al Beta — 19€',
            betaNote: 'Pagament únic. Sense renovacions. Sense sorpreses.',
            supportTitle: 'T\'aporta valor?',
            supportSub: 'Convida\'m a un cafè i ajudes a que DarkCode segueixi creixent.',
            supportBtn: 'Donar suport a DarkCode ☕',
            productsTitle: 'Mini productes',
            productsSub: 'Recursos descarregables per accelerar el teu aprenentatge.',
            productsBtn: 'Veure productes',
        },
    };

    const c = copy[lang as keyof typeof copy] ?? copy.es;

    return (
        <AppLayout>
            {/* HERO */}
            <section className="relative overflow-hidden px-4 pt-24 pb-28 sm:px-6 lg:px-8">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(99,102,241,0.15),transparent)] dark:bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(99,102,241,0.25),transparent)] pointer-events-none" />
                <div className="relative max-w-3xl mx-auto text-center">
                    <span className="inline-block mb-6 text-xs font-semibold uppercase tracking-widest text-indigo-500 border border-indigo-500/30 bg-indigo-500/10 px-4 py-1.5 rounded-full">
                        {c.badge}
                    </span>
                    <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-tight mb-6">
                        {c.h1a}{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500">
                            {c.h1b}
                        </span>
                        <br />{c.h1c}
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400 text-lg sm:text-xl max-w-xl mx-auto mb-10 leading-relaxed">
                        {c.sub}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700 text-white h-12 px-8 text-base" asChild>
                            <Link href="/contenido">
                                <CirclePlay className="h-5 w-5" /> {c.cta1}
                            </Link>
                        </Button>
                        <Button size="lg" variant="outline" className="border-indigo-500/40 text-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 h-12 px-8 text-base" asChild>
                            <Link href="/beta">
                                {c.cta2} <ArrowRight className="h-4 w-4" />
                            </Link>
                        </Button>
                    </div>
                </div>
            </section>

            {/* PILARES */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 border-y border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/30">
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-center text-2xl font-bold mb-10">{c.pillarsTitle}</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                        {pillars.map(({ icon: Icon, label, desc }) => (
                            <div key={label} className="flex flex-col items-center text-center p-6 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
                                <div className="p-3 rounded-xl bg-indigo-50 dark:bg-indigo-900/30 mb-4">
                                    <Icon className="h-6 w-6 text-indigo-500" />
                                </div>
                                <h3 className="font-semibold mb-1">{label}</h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400">{desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CONTENIDO GRATIS */}
            <section className="py-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div>
                        <div className="inline-flex items-center gap-2 text-sm font-medium text-red-500 mb-4">
                            <CirclePlay className="h-5 w-5" /> YouTube
                        </div>
                        <h2 className="text-3xl font-bold mb-4">{c.freeTitle}</h2>
                        <p className="text-gray-500 dark:text-gray-400 mb-6">{c.freeSub}</p>
                        <ul className="space-y-3 mb-8">
                            {freeContent.map(item => (
                                <li key={item} className="flex items-start gap-2.5 text-sm text-gray-700 dark:text-gray-300">
                                    <CheckCircle2 className="h-4 w-4 text-emerald-500 mt-0.5 shrink-0" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                        <Button className="bg-red-500 hover:bg-red-600 text-white" asChild>
                            <Link href="/contenido">
                                <CirclePlay className="h-4 w-4" /> {c.cta1}
                            </Link>
                        </Button>
                    </div>
                    <div className="rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-800 aspect-video bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                        <div className="text-center text-gray-400">
                            <CirclePlay className="h-12 w-12 mx-auto mb-2 text-red-500" />
                            <p className="text-sm">Vídeos en YouTube</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* BETA */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50/50 dark:bg-gray-900/30 border-y border-gray-100 dark:border-gray-800">
                <div className="max-w-3xl mx-auto text-center">
                    <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-amber-500 border border-amber-500/30 bg-amber-500/10 px-4 py-1.5 rounded-full mb-6">
                        <Star className="h-3.5 w-3.5" /> Early Adopter
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-bold mb-3">{c.betaTitle}</h2>
                    <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-lg mx-auto">{c.betaSub}</p>
                    <ul className="space-y-3 mb-10 inline-block text-left">
                        {c.betaItems.map(item => (
                            <li key={item} className="flex items-center gap-2.5 text-sm text-gray-700 dark:text-gray-300">
                                <CheckCircle2 className="h-4 w-4 text-amber-500 shrink-0" /> {item}
                            </li>
                        ))}
                    </ul>
                    <div className="flex flex-col items-center gap-3">
                        <Button size="lg" className="bg-amber-500 hover:bg-amber-600 text-white font-bold h-12 px-10 text-base" asChild>
                            <Link href="/beta">{c.betaBtn}</Link>
                        </Button>
                        <p className="text-xs text-gray-400">{c.betaNote}</p>
                    </div>
                </div>
            </section>

            {/* PRODUCTOS + SOPORTE */}
            <section className="py-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Productos */}
                    <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-8">
                        <div className="p-3 rounded-xl bg-indigo-50 dark:bg-indigo-900/30 w-fit mb-5">
                            <Package className="h-6 w-6 text-indigo-500" />
                        </div>
                        <h3 className="text-xl font-bold mb-2">{c.productsTitle}</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">{c.productsSub}</p>
                        <Button variant="outline" className="border-gray-300 dark:border-gray-700" asChild>
                            <Link href="/productos">
                                {c.productsBtn} <ArrowRight className="h-4 w-4" />
                            </Link>
                        </Button>
                    </div>

                    {/* Soporte */}
                    <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-8">
                        <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-900/20 w-fit mb-5">
                            <Coffee className="h-6 w-6 text-amber-500" />
                        </div>
                        <h3 className="text-xl font-bold mb-2">{c.supportTitle}</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">{c.supportSub}</p>
                        <Button className="bg-amber-500 hover:bg-amber-600 text-white font-semibold" asChild>
                            <Link href="/apoya">{c.supportBtn}</Link>
                        </Button>
                    </div>
                </div>
            </section>
        </AppLayout>
    );
}
