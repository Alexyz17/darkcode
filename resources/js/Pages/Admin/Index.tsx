import AppLayout from '@/layouts/AppLayout';
import { usePage } from '@inertiajs/react';
import { router } from '@inertiajs/react';
import { useState } from 'react';
import { ShieldCheck, Users, Star, User, Mail, Calendar, ChevronDown } from 'lucide-react';
import type { SharedProps } from '@/types';

interface AdminUser {
    id: number;
    name: string;
    email: string;
    role: 'user' | 'premium' | 'admin';
    created_at: string;
}

interface AdminProps extends SharedProps {
    users: AdminUser[];
    stats: { total: number; premium: number; admins: number; thisMonth: number };
}

const roleColors = {
    user:    'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300',
    premium: 'bg-amber-50 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400',
    admin:   'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400',
};

export default function AdminIndex() {
    const { users, stats } = usePage<AdminProps>().props;
    const [updating, setUpdating] = useState<number | null>(null);

    const changeRole = (userId: number, role: string) => {
        setUpdating(userId);
        router.patch(`/admin/users/${userId}/role`, { role }, {
            onFinish: () => setUpdating(null),
        });
    };

    const statCards = [
        { label: 'Usuarios totales', value: stats.total, icon: Users, color: 'text-indigo-500', bg: 'bg-indigo-50 dark:bg-indigo-900/20' },
        { label: 'Premium', value: stats.premium, icon: Star, color: 'text-amber-500', bg: 'bg-amber-50 dark:bg-amber-900/20' },
        { label: 'Admins', value: stats.admins, icon: ShieldCheck, color: 'text-emerald-500', bg: 'bg-emerald-50 dark:bg-emerald-900/20' },
        { label: 'Este mes', value: stats.thisMonth, icon: Calendar, color: 'text-purple-500', bg: 'bg-purple-50 dark:bg-purple-900/20' },
    ];

    return (
        <AppLayout>
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="mb-8">
                    <div className="flex items-center gap-2 text-indigo-500 text-sm font-medium mb-2">
                        <ShieldCheck className="h-4 w-4" /> Panel de administración
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Admin</h1>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
                    {statCards.map(s => {
                        const Icon = s.icon;
                        return (
                            <div key={s.label} className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-5">
                                <div className={`p-2 rounded-xl ${s.bg} w-fit mb-3`}>
                                    <Icon className={`h-5 w-5 ${s.color}`} />
                                </div>
                                <div className="text-2xl font-bold text-gray-900 dark:text-white">{s.value}</div>
                                <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{s.label}</div>
                            </div>
                        );
                    })}
                </div>

                {/* Users table */}
                <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-800 flex items-center gap-2">
                        <Users className="h-4 w-4 text-indigo-500" />
                        <h2 className="font-semibold text-gray-900 dark:text-white">Usuarios</h2>
                        <span className="ml-auto text-xs text-gray-400">{users.length} registrados</span>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="bg-gray-50 dark:bg-gray-800/50 border-b border-gray-100 dark:border-gray-800">
                                    <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">Usuario</th>
                                    <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">Email</th>
                                    <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">Registro</th>
                                    <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">Rol</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                                {users.map(u => (
                                    <tr key={u.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors">
                                        <td className="px-6 py-3">
                                            <div className="flex items-center gap-3">
                                                <div className="h-8 w-8 rounded-full bg-indigo-600 flex items-center justify-center text-xs font-bold text-white shrink-0">
                                                    {u.name.charAt(0).toUpperCase()}
                                                </div>
                                                <span className="font-medium text-gray-900 dark:text-white">{u.name}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-3 text-gray-500 dark:text-gray-400">
                                            <div className="flex items-center gap-1.5">
                                                <Mail className="h-3.5 w-3.5" />
                                                {u.email}
                                            </div>
                                        </td>
                                        <td className="px-6 py-3 text-gray-500 dark:text-gray-400 text-xs">
                                            {new Date(u.created_at).toLocaleDateString('es-ES')}
                                        </td>
                                        <td className="px-6 py-3">
                                            <div className="relative inline-block">
                                                <select
                                                    value={u.role}
                                                    disabled={updating === u.id}
                                                    onChange={e => changeRole(u.id, e.target.value)}
                                                    className={`appearance-none pr-7 pl-2.5 py-1 rounded-full text-xs font-semibold border-0 cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500 ${roleColors[u.role]} ${updating === u.id ? 'opacity-50' : ''}`}
                                                >
                                                    <option value="user">Usuario</option>
                                                    <option value="premium">Premium</option>
                                                    <option value="admin">Admin</option>
                                                </select>
                                                <ChevronDown className="h-3 w-3 absolute right-1.5 top-1/2 -translate-y-1/2 pointer-events-none text-current opacity-60" />
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
