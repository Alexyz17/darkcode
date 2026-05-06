import AppLayout from '@/layouts/AppLayout';
import { useTranslation } from 'react-i18next';
import { Package, ExternalLink, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Añade tus productos aquí cuando los tengas en Gumroad.
// price: en texto (ej. '9€'). gumroadUrl: enlace directo al producto.
const products: {
    id: string;
    emoji: string;
    titleEs: string; titleEn: string; titleCa: string;
    descEs: string; descEn: string; descCa: string;
    price: string;
    tag: 'pdf' | 'template' | 'checklist' | 'pack';
    gumroadUrl: string;
}[] = [
    {
        id: 'roadmap-ia',
        emoji: '🗺️',
        titleEs: 'Roadmap IA para Portfolio',
        titleEn: 'AI Roadmap for Portfolio',
        titleCa: 'Roadmap IA per a Portfolio',
        descEs: 'Plan de 10 semanas para pasar de cero a 3 proyectos reales de IA en tu portfolio. Con código, herramientas y checklist de publicación.',
        descEn: '10-week plan to go from zero to 3 real AI projects in your portfolio. Includes code, tools and a publishing checklist.',
        descCa: 'Pla de 10 setmanes per passar de zero a 3 projectes reals d\'IA al teu portfolio. Amb codi, eines i checklist de publicació.',
        price: '9€',
        tag: 'pdf',
        gumroadUrl: 'https://villarious0.gumroad.com/l/pehpkc',
    },
];

const TAG_LABELS: Record<string, { es: string; en: string; ca: string }> = {
    pdf:       { es: 'PDF', en: 'PDF', ca: 'PDF' },
    template:  { es: 'Plantilla', en: 'Template', ca: 'Plantilla' },
    checklist: { es: 'Checklist', en: 'Checklist', ca: 'Checklist' },
    pack:      { es: 'Pack', en: 'Pack', ca: 'Pack' },
};

export default function Productos() {
    const { i18n } = useTranslation();
    const lang = i18n.language as 'es' | 'en' | 'ca';

    const copy = {
        es: {
            badge: 'Recursos descargables',
            title: 'Mini productos',
            sub: 'Guías, plantillas y recursos de pago único para acelerar tu aprendizaje. Sin suscripciones.',
            comingSoon: 'Próximamente',
            comingSoonSub: 'Los primeros productos estarán disponibles en breve. Suscríbete al canal o únete al Beta para ser el primero en enterarte.',
            betaBtn: 'Unirme al Beta — 19€',
            buyBtn: 'Comprar',
        },
        en: {
            badge: 'Downloadable resources',
            title: 'Mini products',
            sub: 'Guides, templates, and one-time-payment resources to speed up your learning. No subscriptions.',
            comingSoon: 'Coming soon',
            comingSoonSub: 'First products coming shortly. Subscribe to the channel or join Beta to be the first to know.',
            betaBtn: 'Join Beta — €19',
            buyBtn: 'Buy',
        },
        ca: {
            badge: 'Recursos descarregables',
            title: 'Mini productes',
            sub: 'Guies, plantilles i recursos de pagament únic per accelerar el teu aprenentatge. Sense subscripcions.',
            comingSoon: 'Pròximament',
            comingSoonSub: 'Els primers productes estaran disponibles aviat. Subscriu-te al canal o uneix-te al Beta per ser el primer en saber-ho.',
            betaBtn: 'Unir-me al Beta — 19€',
            buyBtn: 'Comprar',
        },
    };

    const c = copy[lang] ?? copy.es;

    return (
        <AppLayout>
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
                    <div>
                        <div className="flex items-center gap-2 text-indigo-500 text-sm font-medium mb-2">
                            <Package className="h-5 w-5" /> {c.badge}
                        </div>
                        <h1 className="text-4xl font-bold">{c.title}</h1>
                        <p className="text-gray-500 dark:text-gray-400 mt-1 max-w-xl">{c.sub}</p>
                    </div>
                </div>

                {products.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {products.map(p => {
                            const title = p[`title${lang.charAt(0).toUpperCase() + lang.slice(1)}` as keyof typeof p] as string ?? p.titleEs;
                            const desc  = p[`desc${lang.charAt(0).toUpperCase() + lang.slice(1)}` as keyof typeof p] as string ?? p.descEs;
                            const tagLabel = TAG_LABELS[p.tag]?.[lang] ?? p.tag;
                            return (
                                <div key={p.id} className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 flex flex-col">
                                    <div className="text-4xl mb-4">{p.emoji}</div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="text-xs px-2 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-900/30 text-indigo-500 font-medium flex items-center gap-1">
                                            <Tag className="h-3 w-3" /> {tagLabel}
                                        </span>
                                    </div>
                                    <h3 className="font-bold text-base mb-2">{title}</h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 flex-1">{desc}</p>
                                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100 dark:border-gray-800">
                                        <span className="text-xl font-bold text-indigo-600 dark:text-indigo-400">{p.price}</span>
                                        <Button className="bg-indigo-600 hover:bg-indigo-700 text-white" size="sm" asChild>
                                            <a href={p.gumroadUrl} target="_blank" rel="noopener noreferrer">
                                                <ExternalLink className="h-3.5 w-3.5" /> {c.buyBtn}
                                            </a>
                                        </Button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-12 text-center">
                        <Package className="h-14 w-14 text-indigo-500 mx-auto mb-4 opacity-70" />
                        <h2 className="text-2xl font-bold mb-2">{c.comingSoon}</h2>
                        <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto mb-8">{c.comingSoonSub}</p>
                        <Button className="bg-amber-500 hover:bg-amber-600 text-white font-semibold" asChild>
                            <a href="/beta">
                                {c.betaBtn}
                            </a>
                        </Button>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
