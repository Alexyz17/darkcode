import AppLayout from '@/layouts/AppLayout';
import { usePage, Link } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BookOpen, User, Mail, ShieldCheck, Zap, Star, Download, FileText, ArrowRight } from 'lucide-react';
import type { SharedProps } from '@/types';

const roleColors = {
    user:    'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300',
    premium: 'bg-amber-50 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400',
    admin:   'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400',
};

const roleIcons = {
    user:    User,
    premium: Star,
    admin:   ShieldCheck,
};

export default function Dashboard() {
    const { auth } = usePage<SharedProps>().props;
    const user = auth.user!;
    const { t } = useTranslation();
    const RoleIcon = roleIcons[user.role];

    return (
        <AppLayout>
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Cabecera */}
                <div className="mb-10">
                    <h1 className="text-3xl font-bold mb-1">
                        {t('dashboard.welcome')}, {user.name.split(' ')[0]} 👋
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">{t('dashboard.title')}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Información de cuenta */}
                    <div className="md:col-span-2 space-y-6">
                        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6">
                            <h2 className="font-semibold text-lg mb-5 flex items-center gap-2">
                                <User className="h-5 w-5 text-indigo-500" />
                                {t('dashboard.accountInfo')}
                            </h2>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between py-3 border-b border-gray-100 dark:border-gray-800">
                                    <span className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-2">
                                        <User className="h-4 w-4" /> {t('dashboard.name')}
                                    </span>
                                    <span className="text-sm font-medium">{user.name}</span>
                                </div>
                                <div className="flex items-center justify-between py-3 border-b border-gray-100 dark:border-gray-800">
                                    <span className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-2">
                                        <Mail className="h-4 w-4" /> {t('dashboard.email')}
                                    </span>
                                    <span className="text-sm font-medium">{user.email}</span>
                                </div>
                                <div className="flex items-center justify-between py-3">
                                    <span className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-2">
                                        <RoleIcon className="h-4 w-4" /> {t('dashboard.role')}
                                    </span>
                                    <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full ${roleColors[user.role]}`}>
                                        <RoleIcon className="h-3 w-3" />
                                        {t(`dashboard.roles.${user.role}`)}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Recurso gratuito */}
                        <div className="rounded-2xl border border-emerald-200 dark:border-emerald-900/50 bg-emerald-50 dark:bg-emerald-900/10 p-6">
                            <h2 className="font-semibold text-lg mb-1 flex items-center gap-2 text-emerald-700 dark:text-emerald-400">
                                <Download className="h-5 w-5" />
                                {t('dashboard.freeResource')}
                            </h2>
                            <p className="text-sm text-emerald-600 dark:text-emerald-500 mb-5">{t('dashboard.freeResourceDesc')}</p>
                            <div className="rounded-xl border border-emerald-200 dark:border-emerald-800 bg-white dark:bg-gray-900 p-4 flex items-center gap-4">
                                <div className="p-2.5 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 shrink-0">
                                    <FileText className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="font-semibold text-sm text-gray-900 dark:text-white">Checklist Python para IA</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">PDF · 5 bloques · Gratis para usuarios registrados</p>
                                </div>
                                <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-white shrink-0" asChild>
                                    <a href="/downloads/checklist">
                                        <Download className="h-3.5 w-3.5" />
                                    </a>
                                </Button>
                            </div>
                        </div>

                        {/* Recursos premium */}
                        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6">
                            <h2 className="font-semibold text-lg mb-4 flex items-center gap-2">
                                <BookOpen className="h-5 w-5 text-indigo-500" />
                                {t('dashboard.resources')}
                            </h2>
                            <div className="rounded-xl border border-amber-200 dark:border-amber-900/50 bg-amber-50 dark:bg-amber-900/10 p-4 flex items-start gap-3">
                                <Star className="h-4 w-4 text-amber-500 mt-0.5 shrink-0" />
                                <div>
                                    <p className="text-sm font-semibold text-amber-700 dark:text-amber-400 mb-1">Roadmap IA para Portfolio</p>
                                    <p className="text-xs text-amber-600 dark:text-amber-500 mb-3">Plan de 10 semanas con proyectos reales y código incluido.</p>
                                    <div className="flex gap-2">
                                        <Button size="sm" className="bg-amber-500 hover:bg-amber-600 text-white text-xs h-7" asChild>
                                            <Link href="/beta">Incluido en Beta <ArrowRight className="h-3 w-3" /></Link>
                                        </Button>
                                        <Button size="sm" variant="outline" className="text-xs h-7 border-amber-300 dark:border-amber-700 text-amber-600 dark:text-amber-400" asChild>
                                            <Link href="/productos">9€</Link>
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-4">
                        {/* Avatar / resumen */}
                        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 text-center">
                            <div className="h-16 w-16 rounded-full bg-indigo-600 flex items-center justify-center text-2xl font-bold text-white mx-auto mb-3">
                                {user.name.charAt(0).toUpperCase()}
                            </div>
                            <p className="font-semibold">{user.name}</p>
                            <p className="text-xs text-gray-400 mt-0.5 truncate">{user.email}</p>
                            <span className={`mt-3 inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full ${roleColors[user.role]}`}>
                                <RoleIcon className="h-3 w-3" />
                                {t(`dashboard.roles.${user.role}`)}
                            </span>
                        </div>

                        {/* Upgrade si no es premium ni admin */}
                        {user.role === 'user' && (
                            <div className="rounded-2xl border border-amber-200 dark:border-amber-900/50 bg-amber-50 dark:bg-amber-900/10 p-5">
                                <div className="flex items-center gap-2 mb-2">
                                    <Zap className="h-5 w-5 text-amber-500" />
                                    <h3 className="font-semibold text-amber-700 dark:text-amber-400">{t('dashboard.upgradePremium')}</h3>
                                </div>
                                <p className="text-xs text-amber-600 dark:text-amber-500 mb-4">{t('dashboard.upgradeDesc')}</p>
                                <Button size="sm" className="w-full bg-amber-500 hover:bg-amber-600 text-white font-semibold" asChild>
                                    <Link href="/premium">{t('dashboard.seePlans')}</Link>
                                </Button>
                            </div>
                        )}

                        {/* Panel admin */}
                        {user.is_admin && (
                            <div className="rounded-2xl border border-indigo-200 dark:border-indigo-800 bg-indigo-50 dark:bg-indigo-900/10 p-5">
                                <div className="flex items-center gap-2 mb-2">
                                    <ShieldCheck className="h-5 w-5 text-indigo-500" />
                                    <h3 className="font-semibold text-indigo-700 dark:text-indigo-400">Administrador</h3>
                                </div>
                                <p className="text-xs text-indigo-600 dark:text-indigo-400 mb-4">Tienes acceso completo a la plataforma.</p>
                                <Button size="sm" variant="outline" className="w-full border-indigo-300 dark:border-indigo-700 text-indigo-600 dark:text-indigo-400" asChild>
                                    <Link href="/admin">Panel de admin</Link>
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
