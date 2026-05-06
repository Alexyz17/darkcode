import AppLayout from '@/layouts/AppLayout';
import { useTranslation } from 'react-i18next';
import { Coffee, Heart, CirclePlay, Package, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from '@inertiajs/react';

const KOFI_URL = 'https://ko-fi.com/darkcodeproduct';

export default function Apoya() {
    const { i18n } = useTranslation();
    const lang = i18n.language as 'es' | 'en' | 'ca';

    const copy = {
        es: {
            badge: 'Apoya el proyecto',
            title: '¿Te aporta valor DarkCode?',
            sub: 'El contenido es gratuito y seguirá siéndolo. Si te ha ayudado, invítame a un café. No es obligatorio, pero se agradece muchísimo.',
            coffeeTitle: 'Invítame a un café',
            coffeeDesc: 'Cada café cubre una hora de trabajo en contenido nuevo. Sin suscripciones, sin presión.',
            coffeeBtn: 'Apoyar en Ko-fi ☕',
            coffeeNote: 'Pago único desde 1€ · Gestionado por Ko-fi',
            otherTitle: 'Otras formas de apoyar',
            ways: [
                {
                    icon: CirclePlay,
                    title: 'Suscríbete al canal',
                    desc: 'Es gratis y ayuda al algoritmo a que DarkCode llegue a más gente.',
                    btnLabel: 'Ir al canal',
                    href: 'https://youtube.com/@DarkCodeA',
                    external: true,
                },
                {
                    icon: Package,
                    title: 'Compra un mini producto',
                    desc: 'Recursos de pago único que te ayudan y financian la plataforma a la vez.',
                    btnLabel: 'Ver productos',
                    href: '/productos',
                    external: false,
                },
            ],
            transparencyTitle: 'Transparencia total',
            transparencyText: 'DarkCode es un proyecto unipersonal. El dinero va directamente a pagar el servidor, herramientas, y el tiempo dedicado a crear contenido de calidad. No hay empresa detrás, solo trabajo real.',
        },
        en: {
            badge: 'Support the project',
            title: 'Is DarkCode adding value for you?',
            sub: 'Content is free and will stay free. If it\'s helped you, buy me a coffee. No pressure — just appreciated.',
            coffeeTitle: 'Buy me a coffee',
            coffeeDesc: 'Each coffee covers an hour of work on new content. No subscriptions, no pressure.',
            coffeeBtn: 'Support on Ko-fi ☕',
            coffeeNote: 'One-time from €1 · Managed by Ko-fi',
            otherTitle: 'Other ways to support',
            ways: [
                {
                    icon: CirclePlay,
                    title: 'Subscribe to the channel',
                    desc: 'It\'s free and helps the algorithm push DarkCode to more people.',
                    btnLabel: 'Go to channel',
                    href: 'https://youtube.com/@DarkCodeA',
                    external: true,
                },
                {
                    icon: Package,
                    title: 'Buy a mini product',
                    desc: 'One-time resources that help you and fund the platform at the same time.',
                    btnLabel: 'See products',
                    href: '/productos',
                    external: false,
                },
            ],
            transparencyTitle: 'Full transparency',
            transparencyText: 'DarkCode is a one-person project. Money goes directly toward paying for the server, tools, and time spent creating quality content. No company behind it — just real work.',
        },
        ca: {
            badge: 'Dóna suport al projecte',
            title: 'Et dóna valor DarkCode?',
            sub: 'El contingut és gratuït i continuarà sent-ho. Si t\'ha ajudat, convida\'m a un cafè. No és obligatori, però s\'agraeix molt.',
            coffeeTitle: 'Convida\'m a un cafè',
            coffeeDesc: 'Cada cafè cobreix una hora de treball en nou contingut. Sense subscripcions, sense pressió.',
            coffeeBtn: 'Donar suport a Ko-fi ☕',
            coffeeNote: 'Pagament únic des d\'1€ · Gestionat per Ko-fi',
            otherTitle: 'Altres formes de donar suport',
            ways: [
                {
                    icon: CirclePlay,
                    title: 'Subscriu-te al canal',
                    desc: 'És gratuït i ajuda l\'algoritme a que DarkCode arribi a més gent.',
                    btnLabel: 'Anar al canal',
                    href: 'https://youtube.com/@DarkCodeA',
                    external: true,
                },
                {
                    icon: Package,
                    title: 'Compra un mini producte',
                    desc: 'Recursos de pagament únic que t\'ajuden i financen la plataforma a la vegada.',
                    btnLabel: 'Veure productes',
                    href: '/productos',
                    external: false,
                },
            ],
            transparencyTitle: 'Transparència total',
            transparencyText: 'DarkCode és un projecte unipersonal. Els diners van directament a pagar el servidor, eines, i el temps dedicat a crear contingut de qualitat. No hi ha empresa darrere, només feina real.',
        },
    };

    const c = copy[lang] ?? copy.es;

    return (
        <AppLayout>
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-amber-500 border border-amber-500/30 bg-amber-500/10 px-4 py-1.5 rounded-full mb-6">
                        <Heart className="h-3.5 w-3.5" /> {c.badge}
                    </div>
                    <h1 className="text-4xl sm:text-5xl font-bold mb-4">{c.title}</h1>
                    <p className="text-gray-500 dark:text-gray-400 text-lg leading-relaxed">{c.sub}</p>
                </div>

                {/* Ko-fi card */}
                <div className="rounded-2xl border-2 border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-900/10 p-8 text-center mb-8">
                    <Coffee className="h-14 w-14 text-amber-500 mx-auto mb-4" />
                    <h2 className="text-2xl font-bold mb-2">{c.coffeeTitle}</h2>
                    <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-sm mx-auto">{c.coffeeDesc}</p>
                    <Button className="bg-amber-500 hover:bg-amber-600 text-white font-bold h-12 px-8 text-base" asChild>
                        <a href={KOFI_URL} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="h-4 w-4" /> {c.coffeeBtn}
                        </a>
                    </Button>
                    <p className="text-xs text-gray-400 mt-3">{c.coffeeNote}</p>
                </div>

                {/* Other ways */}
                <h2 className="font-bold text-lg mb-4">{c.otherTitle}</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                    {c.ways.map((way, i) => {
                        const Icon = way.icon;
                        return (
                            <div key={i} className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6">
                                <div className="p-2 rounded-xl bg-gray-100 dark:bg-gray-800 w-fit mb-4">
                                    <Icon className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                                </div>
                                <h3 className="font-semibold mb-1">{way.title}</h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">{way.desc}</p>
                                <Button variant="outline" size="sm" className="border-gray-300 dark:border-gray-700" asChild>
                                    {way.external ? (
                                        <a href={way.href} target="_blank" rel="noopener noreferrer">
                                            <ExternalLink className="h-3.5 w-3.5" /> {way.btnLabel}
                                        </a>
                                    ) : (
                                        <Link href={way.href}>{way.btnLabel}</Link>
                                    )}
                                </Button>
                            </div>
                        );
                    })}
                </div>

                {/* Transparency */}
                <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6">
                    <h2 className="font-semibold mb-2">{c.transparencyTitle}</h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{c.transparencyText}</p>
                </div>
            </div>
        </AppLayout>
    );
}
