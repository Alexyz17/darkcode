import AppLayout from '@/layouts/AppLayout';
import { useTranslation } from 'react-i18next';
import { Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
    const { i18n } = useTranslation();
    const lang = i18n.language;

    const copy = {
        es: { code: '404', title: 'Página no encontrada', sub: 'La página que buscas no existe o ha sido movida.', home: 'Volver al inicio', back: 'Volver atrás' },
        en: { code: '404', title: 'Page not found', sub: 'The page you\'re looking for doesn\'t exist or has been moved.', home: 'Back to home', back: 'Go back' },
        ca: { code: '404', title: 'Pàgina no trobada', sub: 'La pàgina que cerques no existeix o ha estat moguda.', home: 'Tornar a l\'inici', back: 'Tornar enrere' },
    };

    const c = copy[lang as keyof typeof copy] ?? copy.es;

    return (
        <AppLayout>
            <div className="min-h-[60vh] flex items-center justify-center px-4">
                <div className="text-center">
                    <div className="text-8xl sm:text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500 mb-4 leading-none">
                        {c.code}
                    </div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-3">{c.title}</h1>
                    <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-sm mx-auto">{c.sub}</p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <Button className="bg-indigo-600 hover:bg-indigo-700 text-white" asChild>
                            <Link href="/"><Home className="h-4 w-4" /> {c.home}</Link>
                        </Button>
                        <Button variant="outline" onClick={() => window.history.back()}>
                            <ArrowLeft className="h-4 w-4" /> {c.back}
                        </Button>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
