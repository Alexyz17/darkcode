import AppLayout from '@/layouts/AppLayout';
import { useTranslation } from 'react-i18next';
import { CheckCircle2, Star, Zap, Lock, BookOpen, ArrowRight, FileText, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { FadeInUp } from '@/components/animations/FadeInUp';
import { StaggerChildren, StaggerItem } from '@/components/animations/StaggerChildren';
import { ScaleIn } from '@/components/animations/ScaleIn';
import { SlideIn } from '@/components/animations/SlideIn';

const GUMROAD_URL = 'https://villarious0.gumroad.com/l/yabnoy';

export default function Beta() {
    const { i18n } = useTranslation();
    const lang = i18n.language;

    const copy = {
        es: {
            badge: 'Early Adopter · Precio de lanzamiento',
            title: 'Acceso Beta',
            titleBrand: 'DarkCode',
            sub: 'Entra ahora mientras la plataforma crece. Precio único, acceso de por vida.',
            priceLabel: 'Precio de lanzamiento',
            price: '19€',
            priceNote: 'Pago único · Sin renovaciones · Sin sorpresas',
            btn: 'Conseguir acceso Beta',
            btnSub: 'Pago seguro vía Gumroad',
            includes: 'Qué incluye',
            items: [
                { title: 'Vídeos privados antes de publicarse', desc: 'Accede a los vídeos antes de que lleguen al canal de YouTube.' },
                { title: 'Roadmaps y guías descargables', desc: 'Materiales estructurados para aprender IA, automatización y programación.' },
                { title: 'Acceso de por vida', desc: 'Todo lo que se publique durante y después del Beta. Sin fechas de corte.' },
            ],
            whyTitle: '¿Por qué entrar ahora?',
            whyItems: [
                'El precio actual es el más bajo que tendrá la plataforma',
                'Tu feedback decide qué contenido se publica primero',
                'El precio sube a 49€ cuando salga la versión 1',
                'Formas parte de los que construyen DarkCode desde dentro',
            ],
            faqTitle: 'Preguntas frecuentes',
            faqs: [
                { q: '¿Cuándo tengo acceso?', a: 'Inmediatamente después del pago. Recibes un email con el enlace.' },
                { q: '¿Hay mensualidades después?', a: 'No. El pago es único y el acceso es de por vida.' },
                { q: '¿Cómo puedo pagar?', a: 'Tarjeta de crédito/débito o PayPal a través de Gumroad.' },
            ],
            legalTitle: 'Aviso legal — Contenido digital',
            legalText: 'Al completar la compra aceptas que se trata de contenido digital de acceso inmediato. Conforme al art. 103.a) del RDL 1/2007 (LGDCU), el derecho de desistimiento no aplica a contenidos digitales cuya ejecución haya comenzado con tu consentimiento previo y expreso.',
            v1Price: '49€',
            v1Label: 'precio v1',
        },
        en: {
            badge: 'Early Adopter · Launch price',
            title: 'Beta Access',
            titleBrand: 'DarkCode',
            sub: 'Join now while the platform grows. One-time payment, lifetime access.',
            priceLabel: 'Launch price',
            price: '€19',
            priceNote: 'One-time payment · No renewals · No surprises',
            btn: 'Get Beta access',
            btnSub: 'Secure payment via Gumroad',
            includes: "What's included",
            items: [
                { title: 'Private videos before they go public', desc: 'Watch videos before they land on the YouTube channel.' },
                { title: 'Downloadable roadmaps and guides', desc: 'Structured materials for learning AI, automation and coding.' },
                { title: 'Lifetime access', desc: 'Everything published during and after Beta. No cutoff dates.' },
            ],
            whyTitle: 'Why join now?',
            whyItems: [
                'This is the lowest price the platform will ever have',
                'Your feedback decides what content gets published first',
                'Price goes up to €49 at v1 launch',
                "You're part of building DarkCode from the inside",
            ],
            faqTitle: 'Frequently asked questions',
            faqs: [
                { q: 'When do I get access?', a: 'Immediately after payment. You receive an email with the access link.' },
                { q: 'Are there monthly fees after?', a: 'No. One-time payment, lifetime access.' },
                { q: 'How can I pay?', a: 'Credit/debit card or PayPal through Gumroad.' },
            ],
            legalTitle: 'Legal notice — Digital content',
            legalText: "By completing the purchase you agree this is digital content with immediate access. Under EU Directive 2011/83/EU, the right of withdrawal does not apply to digital content where delivery has begun with your prior express consent.",
            v1Price: '€49',
            v1Label: 'v1 price',
        },
        ca: {
            badge: 'Early Adopter · Preu de llançament',
            title: 'Accés Beta',
            titleBrand: 'DarkCode',
            sub: 'Entra ara mentre la plataforma creix. Pagament únic, accés de per vida.',
            priceLabel: 'Preu de llançament',
            price: '19€',
            priceNote: 'Pagament únic · Sense renovacions · Sense sorpreses',
            btn: 'Aconseguir accés Beta',
            btnSub: 'Pagament segur via Gumroad',
            includes: 'Què inclou',
            items: [
                { title: 'Vídeos privats abans de publicar-se', desc: "Accedeix als vídeos abans que arribin al canal de YouTube." },
                { title: 'Roadmaps i guies descarregables', desc: "Materials estructurats per aprendre IA, automatització i programació." },
                { title: 'Accés de per vida', desc: "Tot el que es publiqui durant i després del Beta. Sense dates de tall." },
            ],
            whyTitle: 'Per què entrar ara?',
            whyItems: [
                'El preu actual és el més baix que tindrà la plataforma',
                'El teu feedback decideix quin contingut es publica primer',
                'El preu puja a 49€ quan surti la versió 1',
                "Formes part dels que construeixen DarkCode des de dins",
            ],
            faqTitle: 'Preguntes freqüents',
            faqs: [
                { q: "Quan tinc accés?", a: "Immediatament després del pagament. Reps un email amb l'enllaç." },
                { q: "Hi ha mensualitats després?", a: "No. El pagament és únic i l'accés és de per vida." },
                { q: "Com puc pagar?", a: "Targeta de crèdit/dèbit o PayPal a través de Gumroad." },
            ],
            legalTitle: 'Avís legal — Contingut digital',
            legalText: "En completar la compra acceptes que es tracta de contingut digital d'accés immediat. Conforme a l'art. 103.a) del RDL 1/2007 (LGDCU), el dret de desistiment no aplica a continguts digitals l'execució dels quals hagi començat amb el teu consentiment previ i exprés.",
            v1Price: '49€',
            v1Label: 'preu v1',
        },
    };

    const c = copy[lang as keyof typeof copy] ?? copy.es;
    const featureIcons = [Lock, BookOpen, Zap];

    return (
        <AppLayout>
            {/* Hero */}
            <div className="relative overflow-hidden bg-gradient-to-b from-amber-50 to-white dark:from-gray-900 dark:to-gray-950 border-b border-amber-100 dark:border-gray-800">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_80%_at_50%_-20%,rgba(251,191,36,0.2),transparent)] dark:bg-[radial-gradient(ellipse_60%_80%_at_50%_-20%,rgba(251,191,36,0.07),transparent)] pointer-events-none" />
                <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
                    <FadeInUp delay={0}>
                        <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-amber-700 dark:text-amber-400 border border-amber-300 dark:border-amber-700/60 bg-amber-100 dark:bg-amber-900/20 px-4 py-1.5 rounded-full mb-6">
                            <Star className="h-3.5 w-3.5" /> {c.badge}
                        </div>
                    </FadeInUp>
                    <FadeInUp delay={0.1}>
                        <h1 className="text-5xl sm:text-6xl font-bold mb-4 text-gray-900 dark:text-white tracking-tight">
                            {c.title}{' '}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-400">
                                {c.titleBrand}
                            </span>
                        </h1>
                    </FadeInUp>
                    <FadeInUp delay={0.2}>
                        <p className="text-gray-500 dark:text-gray-400 text-lg max-w-lg mx-auto leading-relaxed">{c.sub}</p>
                    </FadeInUp>
                </div>
            </div>

            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">

                    {/* Left — content */}
                    <SlideIn from="left" className="lg:col-span-3 space-y-5">

                        {/* Included */}
                        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6">
                            <h2 className="font-bold text-base uppercase tracking-wide text-gray-400 dark:text-gray-500 mb-5">{c.includes}</h2>
                            <StaggerChildren className="space-y-4">
                                {c.items.map((item, i) => {
                                    const Icon = featureIcons[i];
                                    return (
                                        <StaggerItem key={i}>
                                            <div className="flex gap-4 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                                                <div className="p-2 rounded-lg bg-amber-100 dark:bg-amber-900/30 h-fit shrink-0">
                                                    <Icon className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                                                </div>
                                                <div>
                                                    <p className="font-semibold text-sm text-gray-900 dark:text-white mb-0.5">{item.title}</p>
                                                    <p className="text-sm text-gray-500 dark:text-gray-400">{item.desc}</p>
                                                </div>
                                            </div>
                                        </StaggerItem>
                                    );
                                })}
                            </StaggerChildren>
                        </div>

                        {/* Why now */}
                        <FadeInUp delay={0.1}>
                            <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6">
                                <h2 className="font-bold text-base uppercase tracking-wide text-gray-400 dark:text-gray-500 mb-4">{c.whyTitle}</h2>
                                <ul className="space-y-3">
                                    {c.whyItems.map((item, i) => (
                                        <li key={i} className="flex items-start gap-3 text-sm text-gray-700 dark:text-gray-300">
                                            <CheckCircle2 className="h-4 w-4 text-amber-500 mt-0.5 shrink-0" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </FadeInUp>

                        {/* FAQ */}
                        <FadeInUp delay={0.15}>
                            <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6">
                                <h2 className="font-bold text-base uppercase tracking-wide text-gray-400 dark:text-gray-500 mb-5">{c.faqTitle}</h2>
                                <div className="divide-y divide-gray-100 dark:divide-gray-800">
                                    {c.faqs.map((faq, i) => (
                                        <div key={i} className="py-4 first:pt-0 last:pb-0">
                                            <p className="font-semibold text-sm text-gray-900 dark:text-white mb-1">{faq.q}</p>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">{faq.a}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </FadeInUp>

                        {/* Legal */}
                        <FadeInUp delay={0.2}>
                            <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/40 p-4 flex gap-3">
                                <FileText className="h-4 w-4 text-gray-400 shrink-0 mt-0.5" />
                                <div>
                                    <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">{c.legalTitle}</p>
                                    <p className="text-xs text-gray-400 dark:text-gray-500 leading-relaxed">{c.legalText}</p>
                                </div>
                            </div>
                        </FadeInUp>
                    </SlideIn>

                    {/* Right — purchase card */}
                    <SlideIn from="right" className="lg:col-span-2">
                        <div className="sticky top-24 rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700 shadow-xl shadow-gray-200/60 dark:shadow-none bg-white dark:bg-gray-900">
                            {/* Card header */}
                            <div className="bg-gradient-to-br from-amber-400 to-orange-400 dark:from-amber-500 dark:to-orange-500 p-6 text-center">
                                <div className="flex items-center justify-center gap-1.5 mb-3">
                                    <Sparkles className="h-4 w-4 text-amber-900/70" />
                                    <span className="text-xs font-bold uppercase tracking-widest text-amber-900/80">Early Adopter</span>
                                </div>
                                <div className="text-6xl font-bold text-white mb-1">{c.price}</div>
                                <p className="text-amber-100 text-xs">{c.priceNote}</p>
                            </div>

                            {/* Card body */}
                            <div className="p-6">
                                <Button
                                    className="w-full bg-amber-500 hover:bg-amber-600 text-white font-bold h-12 text-base mb-2 rounded-xl"
                                    asChild
                                >
                                    <a href={GUMROAD_URL} target="_blank" rel="noopener noreferrer">
                                        {c.btn} <ArrowRight className="h-4 w-4 ml-1" />
                                    </a>
                                </Button>
                                <p className="text-center text-xs text-gray-400 dark:text-gray-500 mb-5">{c.btnSub}</p>

                                <div className="space-y-2.5 mb-5">
                                    {c.items.map((item, i) => (
                                        <div key={i} className="flex items-center gap-2.5">
                                            <CheckCircle2 className="h-4 w-4 text-amber-500 shrink-0" />
                                            <span className="text-sm text-gray-700 dark:text-gray-300">{item.title}</span>
                                        </div>
                                    ))}
                                </div>

                                {/* Price comparison */}
                                <div className="rounded-xl bg-gray-50 dark:bg-gray-800 p-3 flex items-center justify-between">
                                    <span className="text-xs text-gray-500 dark:text-gray-400">{c.v1Label}</span>
                                    <span className="text-sm font-bold text-gray-400 dark:text-gray-500 line-through">{c.v1Price}</span>
                                </div>
                            </div>
                        </div>
                    </SlideIn>
                </div>
            </div>
        </AppLayout>
    );
}
