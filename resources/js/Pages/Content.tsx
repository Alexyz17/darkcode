import AppLayout from '@/layouts/AppLayout';
import { useTranslation } from 'react-i18next';
import { CirclePlay, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Aquí irán los vídeos reales de tu canal. Por ahora placeholder honesto.
// Cuando subas vídeos a YouTube, reemplaza el array con los IDs reales.
const videos: { id: string; title: string; desc: string; duration: string }[] = [
    // Ejemplo (descomenta y pon tu ID real):
    // { id: 'dQw4w9WgXcQ', title: 'Título del vídeo', desc: 'Descripción breve', duration: '8 min' },
];

const CHANNEL_URL = 'https://youtube.com/@DarkCodeA';

export default function Content() {
    const { i18n } = useTranslation();
    const lang = i18n.language;

    const copy = {
        es: {
            title: 'Contenido gratuito',
            sub: 'Vídeos directos al grano. Sin registro, sin suscripción.',
            channelBtn: 'Ir al canal de YouTube',
            comingSoon: 'Próximamente',
            comingSoonSub: 'Los vídeos estarán disponibles aquí cuando se publiquen. Mientras tanto, suscríbete al canal para no perderte nada.',
            topics: 'Temas que se publicarán',
            topicList: ['IA práctica con Python', 'Proyectos para portfolio', 'Automatización con n8n', 'Programar desde cero', 'Linux esencial', 'Laravel paso a paso'],
        },
        en: {
            title: 'Free content',
            sub: 'Straight-to-the-point videos. No sign-up, no subscription.',
            channelBtn: 'Go to YouTube channel',
            comingSoon: 'Coming soon',
            comingSoonSub: 'Videos will be available here when published. In the meantime, subscribe to the channel so you don\'t miss anything.',
            topics: 'Topics coming up',
            topicList: ['Practical AI with Python', 'Portfolio projects', 'Automation with n8n', 'Coding from scratch', 'Essential Linux', 'Laravel step by step'],
        },
        ca: {
            title: 'Contingut gratuït',
            sub: 'Vídeos directes al gra. Sense registre, sense subscripció.',
            channelBtn: 'Anar al canal de YouTube',
            comingSoon: 'Pròximament',
            comingSoonSub: 'Els vídeos estaran disponibles aquí quan es publiquin. Mentrestant, subscriu-te al canal per no perdre-t\'ho.',
            topics: 'Temes que es publicaran',
            topicList: ['IA pràctica amb Python', 'Projectes per a portfolio', 'Automatització amb n8n', 'Programar des de zero', 'Linux essencial', 'Laravel pas a pas'],
        },
    };

    const c = copy[lang as keyof typeof copy] ?? copy.es;

    return (
        <AppLayout>
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
                {/* Cabecera */}
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
                    <div>
                        <div className="flex items-center gap-2 text-red-500 text-sm font-medium mb-2">
                            <CirclePlay className="h-5 w-5" /> YouTube
                        </div>
                        <h1 className="text-4xl font-bold">{c.title}</h1>
                        <p className="text-gray-500 dark:text-gray-400 mt-1">{c.sub}</p>
                    </div>
                    <Button className="bg-red-500 hover:bg-red-600 text-white shrink-0" asChild>
                        <a href={CHANNEL_URL} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="h-4 w-4" /> {c.channelBtn}
                        </a>
                    </Button>
                </div>

                {videos.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {videos.map(v => (
                            <div key={v.id} className="rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
                                <div className="aspect-video">
                                    <iframe
                                        className="w-full h-full"
                                        src={`https://www.youtube.com/embed/${v.id}`}
                                        title={v.title}
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    />
                                </div>
                                <div className="p-4">
                                    <h3 className="font-semibold text-sm mb-1">{v.title}</h3>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">{v.desc}</p>
                                    <span className="text-xs text-gray-400">{v.duration}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    /* Estado honesto: sin vídeos todavía */
                    <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-12 text-center">
                        <CirclePlay className="h-14 w-14 text-red-500 mx-auto mb-4 opacity-70" />
                        <h2 className="text-2xl font-bold mb-2">{c.comingSoon}</h2>
                        <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto mb-8">{c.comingSoonSub}</p>
                        <Button className="bg-red-500 hover:bg-red-600 text-white" asChild>
                            <a href={CHANNEL_URL} target="_blank" rel="noopener noreferrer">
                                <ExternalLink className="h-4 w-4" /> {c.channelBtn}
                            </a>
                        </Button>
                        <div className="mt-10 pt-8 border-t border-gray-100 dark:border-gray-800">
                            <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4">{c.topics}</p>
                            <div className="flex flex-wrap justify-center gap-2">
                                {c.topicList.map(topic => (
                                    <span key={topic} className="text-xs px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400">
                                        {topic}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
