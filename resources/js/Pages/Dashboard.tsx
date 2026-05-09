import AppLayout from '@/layouts/AppLayout';
import { usePage, Link } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import { Head } from '@inertiajs/react';
import {
    BookOpen, User, Mail, ShieldCheck, Zap, Star, Download,
    FileText, ArrowRight, CheckCircle2, Lock, Terminal, Code2,
    Brain, Server, Shield,
} from 'lucide-react';
import type { SharedProps } from '@/types';

const roleColors = {
    user:    'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300',
    premium: 'bg-amber-50 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400',
    admin:   'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400',
};
const roleIcons = { user: User, premium: Star, admin: ShieldCheck };

const freeCourses = [
    { title: 'Introducción a Linux',   href: '/lecciones/linux-esencial',  icon: Terminal, color: 'text-orange-400' },
    { title: 'Comandos Linux',          href: '/lecciones/comandos-linux',  icon: Terminal, color: 'text-orange-400' },
    { title: 'Shell Scripting',         href: '/lecciones/shell-scripting', icon: Terminal, color: 'text-orange-400' },
    { title: 'Primeros pasos Laravel',  href: '/lecciones/laravel',         icon: Code2,    color: 'text-red-400'    },
    { title: 'Seguridad Web',           href: '/lecciones/seguridad-web',   icon: Shield,   color: 'text-emerald-400'},
];

const premiumCourses = [
    { title: 'Docker desde cero',       href: '/lecciones/docker',           icon: Server, color: 'text-blue-400'   },
    { title: 'Automatización con n8n',  href: '/lecciones/n8n',              icon: Zap,    color: 'text-yellow-400' },
    { title: 'IA aplicada al código',   href: '/lecciones/ia-programacion',  icon: Brain,  color: 'text-purple-400' },
    { title: 'Eloquent ORM avanzado',   href: '/lecciones/eloquent',          icon: Code2,  color: 'text-red-400'   },
    { title: 'APIs REST con Laravel',   href: '/lecciones/apis-rest',         icon: Code2,  color: 'text-red-400'   },
    { title: 'Máquinas Virtuales',      href: '/lecciones/maquinas-virtuales',icon: Server, color: 'text-blue-400'  },
    { title: 'Fine-tuning de modelos',  href: '/lecciones/fine-tuning',       icon: Brain,  color: 'text-purple-400'},
];

export default function Dashboard() {
    const { auth } = usePage<SharedProps>().props;
    const user = auth.user!;
    const { t } = useTranslation();
    const RoleIcon = roleIcons[user.role];
    const isPremium = user.role === 'premium' || user.role === 'admin';

    return (
        <AppLayout>
            <Head>
                <title>Mi área — DarkCode</title>
            </Head>
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">

                {/* Cabecera */}
                <div className="flex items-center justify-between gap-4 flex-wrap">
                    <div>
                        <h1 className="text-3xl font-bold mb-1">
                            {t('dashboard.welcome')}, {user.name.split(' ')[0]} 👋
                        </h1>
                        <p className="text-gray-500 dark:text-gray-400 text-sm">{t('dashboard.title')}</p>
                    </div>
                    <span className={`inline-flex items-center gap-1.5 text-sm font-bold px-3 py-1.5 rounded-full ${roleColors[user.role]}`}>
                        <RoleIcon className="h-4 w-4" />
                        {t(`dashboard.roles.${user.role}`)}
                    </span>
                </div>

                {/* Banner premium para usuarios gratuitos */}
                {!isPremium && (
                    <div className="rounded-2xl border border-amber-400/40 bg-gradient-to-r from-amber-500/10 to-orange-500/5 p-6 flex flex-col sm:flex-row items-start sm:items-center gap-5">
                        <div className="p-3 rounded-xl bg-amber-500/20 shrink-0">
                            <Zap className="h-6 w-6 text-amber-500" />
                        </div>
                        <div className="flex-1">
                            <p className="font-bold text-amber-700 dark:text-amber-400 mb-1">{t('dashboard.upgradePremium')}</p>
                            <p className="text-sm text-amber-600/80 dark:text-amber-500/80">{t('dashboard.upgradeDesc')}</p>
                        </div>
                        <Link href="/beta"
                            className="shrink-0 inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white font-bold px-5 py-2.5 rounded-xl text-sm transition-colors shadow-lg shadow-amber-500/20">
                            Ver acceso Beta <ArrowRight className="h-4 w-4" />
                        </Link>
                    </div>
                )}

                {/* Banner bienvenida premium */}
                {isPremium && (
                    <div className="rounded-2xl border border-amber-400/40 bg-gradient-to-r from-amber-500/10 to-yellow-500/5 p-6 flex items-center gap-5">
                        <div className="p-3 rounded-xl bg-amber-500/20 shrink-0">
                            <Star className="h-6 w-6 text-amber-500" />
                        </div>
                        <div>
                            <p className="font-bold text-amber-700 dark:text-amber-400 mb-0.5">Acceso Premium activo</p>
                            <p className="text-sm text-amber-600/80 dark:text-amber-500/80">Tienes acceso completo a los 12 cursos y todo el contenido de DarkCode.</p>
                        </div>
                    </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-6">

                        {/* Cursos gratuitos */}
                        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6">
                            <h2 className="font-bold text-lg mb-4 flex items-center gap-2">
                                <BookOpen className="h-5 w-5 text-emerald-500" />
                                Cursos gratuitos
                            </h2>
                            <div className="space-y-1">
                                {freeCourses.map(course => {
                                    const Icon = course.icon;
                                    return (
                                        <Link key={course.href} href={course.href}
                                            className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors group">
                                            <Icon className={`h-4 w-4 shrink-0 ${course.color}`} />
                                            <span className="flex-1 text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
                                                {course.title}
                                            </span>
                                            <CheckCircle2 className="h-4 w-4 text-emerald-500 opacity-70" />
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Cursos premium */}
                        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6">
                            <h2 className="font-bold text-lg mb-4 flex items-center gap-2">
                                <Star className="h-5 w-5 text-amber-500" />
                                Cursos premium
                                {isPremium && <span className="ml-auto text-xs font-bold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/30 px-2 py-0.5 rounded-full">Desbloqueados</span>}
                            </h2>
                            <div className="space-y-1">
                                {premiumCourses.map(course => {
                                    const Icon = course.icon;
                                    return (
                                        <Link key={course.href} href={course.href}
                                            className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors group">
                                            <Icon className={`h-4 w-4 shrink-0 ${course.color}`} />
                                            <span className="flex-1 text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
                                                {course.title}
                                            </span>
                                            {isPremium
                                                ? <CheckCircle2 className="h-4 w-4 text-amber-500 opacity-70" />
                                                : <Lock className="h-3.5 w-3.5 text-gray-400" />
                                            }
                                        </Link>
                                    );
                                })}
                            </div>
                            {!isPremium && (
                                <Link href="/beta"
                                    className="mt-4 w-full flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-600 text-white font-bold text-sm py-2.5 rounded-xl transition-colors">
                                    Desbloquear todo — 19€ de por vida
                                </Link>
                            )}
                        </div>

                        {/* Recurso gratuito */}
                        <div className="rounded-2xl border border-emerald-200 dark:border-emerald-900/50 bg-emerald-50 dark:bg-emerald-900/10 p-6">
                            <h2 className="font-semibold text-lg mb-1 flex items-center gap-2 text-emerald-700 dark:text-emerald-400">
                                <Download className="h-5 w-5" />
                                {t('dashboard.freeResource')}
                            </h2>
                            <p className="text-sm text-emerald-600 dark:text-emerald-500 mb-4">{t('dashboard.freeResourceDesc')}</p>
                            <div className="rounded-xl border border-emerald-200 dark:border-emerald-800 bg-white dark:bg-gray-900 p-4 flex items-center gap-4">
                                <div className="p-2.5 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 shrink-0">
                                    <FileText className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="font-semibold text-sm">Checklist Python para IA</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">PDF · 5 bloques · Gratis para registrados</p>
                                </div>
                                <a href="/downloads/checklist"
                                    className="shrink-0 inline-flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs px-3 py-1.5 rounded-lg transition-colors">
                                    <Download className="h-3.5 w-3.5" /> Descargar
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-4">
                        {/* Avatar */}
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

                        {/* Información de cuenta */}
                        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-5">
                            <h3 className="text-sm font-semibold mb-3 flex items-center gap-2 text-gray-700 dark:text-gray-300">
                                <User className="h-4 w-4" /> {t('dashboard.accountInfo')}
                            </h3>
                            <div className="space-y-2 text-xs text-gray-500 dark:text-gray-400">
                                <div className="flex items-center gap-2">
                                    <Mail className="h-3.5 w-3.5 shrink-0" />
                                    <span className="truncate">{user.email}</span>
                                </div>
                            </div>
                        </div>

                        {/* Panel admin */}
                        {user.is_admin && (
                            <div className="rounded-2xl border border-indigo-200 dark:border-indigo-800 bg-indigo-50 dark:bg-indigo-900/10 p-5">
                                <div className="flex items-center gap-2 mb-2">
                                    <ShieldCheck className="h-5 w-5 text-indigo-500" />
                                    <h3 className="font-semibold text-indigo-700 dark:text-indigo-400 text-sm">Administrador</h3>
                                </div>
                                <Link href="/admin"
                                    className="mt-2 w-full flex items-center justify-center gap-2 border border-indigo-300 dark:border-indigo-700 text-indigo-600 dark:text-indigo-400 font-semibold text-sm py-2 rounded-xl hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-colors">
                                    Panel de admin
                                </Link>
                            </div>
                        )}

                        {/* Quick links */}
                        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-5">
                            <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3">Accesos rápidos</h3>
                            <div className="space-y-1">
                                {[
                                    { href: '/cursos', label: 'Todos los cursos' },
                                    { href: '/contenido', label: 'Recursos y contenido' },
                                    { href: '/productos', label: 'Productos' },
                                    { href: '/beta', label: 'Acceso Beta' },
                                ].map(link => (
                                    <Link key={link.href} href={link.href}
                                        className="flex items-center justify-between px-2 py-1.5 rounded-lg text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                                        {link.label}
                                        <ArrowRight className="h-3.5 w-3.5 opacity-40" />
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
