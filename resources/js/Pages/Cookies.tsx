import AppLayout from '@/layouts/AppLayout';
import { useTranslation } from 'react-i18next';
import { Cookie } from 'lucide-react';

export default function Cookies() {
    const { i18n } = useTranslation();
    const lang = i18n.language;

    const copy = {
        es: {
            badge: 'Legal',
            title: 'Política de Cookies',
            updated: 'Última actualización: mayo 2026',
            intro: 'Este sitio usa cookies propias estrictamente necesarias para el funcionamiento del servicio. No usamos cookies de seguimiento, publicidad ni análisis de terceros.',
            tableTitle: 'Cookies que utilizamos',
            headers: ['Nombre', 'Tipo', 'Finalidad', 'Duración'],
            cookies: [
                { name: 'darkcode_session', type: 'Propia · Necesaria', purpose: 'Mantiene la sesión del usuario autenticado', duration: 'Sesión' },
                { name: 'XSRF-TOKEN', type: 'Propia · Necesaria', purpose: 'Protección contra ataques CSRF', duration: 'Sesión' },
                { name: 'theme', type: 'Propia · Necesaria', purpose: 'Guarda tu preferencia de tema (claro/oscuro)', duration: '1 año' },
                { name: 'lang', type: 'Propia · Necesaria', purpose: 'Guarda tu preferencia de idioma', duration: '1 año' },
            ],
            noConsent: 'Al ser todas las cookies estrictamente necesarias para el funcionamiento del sitio, no se requiere consentimiento explícito conforme al art. 22.2 de la LSSI.',
            contact: 'Contacto: alexvillar10@gmail.com',
        },
        en: {
            badge: 'Legal',
            title: 'Cookie Policy',
            updated: 'Last updated: May 2026',
            intro: 'This site uses strictly necessary first-party cookies for the service to function. We do not use tracking, advertising or third-party analytics cookies.',
            tableTitle: 'Cookies we use',
            headers: ['Name', 'Type', 'Purpose', 'Duration'],
            cookies: [
                { name: 'darkcode_session', type: 'First-party · Necessary', purpose: 'Maintains the authenticated user session', duration: 'Session' },
                { name: 'XSRF-TOKEN', type: 'First-party · Necessary', purpose: 'Protection against CSRF attacks', duration: 'Session' },
                { name: 'theme', type: 'First-party · Necessary', purpose: 'Saves your theme preference (light/dark)', duration: '1 year' },
                { name: 'lang', type: 'First-party · Necessary', purpose: 'Saves your language preference', duration: '1 year' },
            ],
            noConsent: 'As all cookies are strictly necessary for the site to function, explicit consent is not required under ePrivacy Directive art. 5.3 exception.',
            contact: 'Contact: alexvillar10@gmail.com',
        },
        ca: {
            badge: 'Legal',
            title: 'Política de Cookies',
            updated: 'Darrera actualització: maig 2026',
            intro: 'Aquest lloc utilitza cookies pròpies estrictament necessàries per al funcionament del servei. No utilitzem cookies de seguiment, publicitat ni anàlisi de tercers.',
            tableTitle: 'Cookies que utilitzem',
            headers: ['Nom', 'Tipus', 'Finalitat', 'Durada'],
            cookies: [
                { name: 'darkcode_session', type: 'Pròpia · Necessària', purpose: 'Manté la sessió de l\'usuari autenticat', duration: 'Sessió' },
                { name: 'XSRF-TOKEN', type: 'Pròpia · Necessària', purpose: 'Protecció contra atacs CSRF', duration: 'Sessió' },
                { name: 'theme', type: 'Pròpia · Necessària', purpose: 'Desa la teva preferència de tema (clar/fosc)', duration: '1 any' },
                { name: 'lang', type: 'Pròpia · Necessària', purpose: 'Desa la teva preferència d\'idioma', duration: '1 any' },
            ],
            noConsent: 'En ser totes les cookies estrictament necessàries per al funcionament del lloc, no es requereix consentiment explícit conforme a l\'art. 22.2 de la LSSI.',
            contact: 'Contacte: alexvillar10@gmail.com',
        },
    };

    const c = copy[lang as keyof typeof copy] ?? copy.es;

    return (
        <AppLayout>
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
                <div className="mb-10">
                    <div className="flex items-center gap-2 text-indigo-500 text-sm font-medium mb-3">
                        <Cookie className="h-4 w-4" /> {c.badge}
                    </div>
                    <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">{c.title}</h1>
                    <p className="text-sm text-gray-400">{c.updated}</p>
                </div>

                <p className="text-sm text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">{c.intro}</p>

                <h2 className="text-base font-bold text-gray-900 dark:text-white mb-4">{c.tableTitle}</h2>
                <div className="rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden mb-8">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="bg-gray-50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-800">
                                {c.headers.map(h => (
                                    <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                            {c.cookies.map(ck => (
                                <tr key={ck.name} className="bg-white dark:bg-gray-900">
                                    <td className="px-4 py-3 font-mono text-xs text-indigo-600 dark:text-indigo-400">{ck.name}</td>
                                    <td className="px-4 py-3 text-gray-600 dark:text-gray-400 text-xs">{ck.type}</td>
                                    <td className="px-4 py-3 text-gray-600 dark:text-gray-400 text-xs">{ck.purpose}</td>
                                    <td className="px-4 py-3 text-gray-600 dark:text-gray-400 text-xs">{ck.duration}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-4 space-y-2">
                    <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{c.noConsent}</p>
                    <p className="text-xs text-gray-400">{c.contact}</p>
                </div>
            </div>
        </AppLayout>
    );
}
