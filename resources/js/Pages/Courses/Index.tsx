import AppLayout from '@/layouts/AppLayout';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Link } from '@inertiajs/react';
import { useState } from 'react';
import {
    BookOpen, Clock, Star, Search, Filter,
    Terminal, Server, Code2, Brain, Zap, Shield, ChevronRight
} from 'lucide-react';

const allCourses = [
    { id: 1, href: '/lecciones/linux-esencial',  title: 'Introducción a Linux', description: 'Aprende a moverte por la terminal, gestionar archivos y entender el sistema operativo más usado en servidores.', duration: '2h 30min', lessons: 12, level: 'Básico', icon: Terminal, premium: false, category: 'Linux', iconColor: 'text-orange-400', bg: 'bg-orange-500/10' },
    { id: 2, href: '/lecciones/comandos-linux',  title: 'Comandos Linux esenciales', description: 'Domina los 50 comandos que usarás cada día: grep, awk, sed, find, pipes y más.', duration: '1h 45min', lessons: 9, level: 'Básico', icon: Terminal, premium: false, category: 'Linux', iconColor: 'text-orange-400', bg: 'bg-orange-500/10' },
    { id: 3, href: '/lecciones/shell-scripting', title: 'Shell scripting con Bash', description: 'Automatiza tareas repetitivas escribiendo tus propios scripts de shell.', duration: '3h 10min', lessons: 15, level: 'Intermedio', icon: Terminal, premium: false, category: 'Linux', iconColor: 'text-orange-400', bg: 'bg-orange-500/10' },
    { id: 4, href: '/lecciones/laravel',         title: 'Primeros pasos con Laravel', description: 'Crea tu primera aplicación web con el framework PHP más popular. Rutas, controladores y Eloquent.', duration: '3h 15min', lessons: 18, level: 'Básico', icon: Code2, premium: false, category: 'PHP / Laravel', iconColor: 'text-red-400', bg: 'bg-red-500/10' },
    { id: 5, href: '/beta',                      title: 'Eloquent ORM avanzado', description: 'Relaciones, scopes, observers, mutators y todo lo que necesitas para dominar la capa de datos.', duration: '4h 30min', lessons: 22, level: 'Avanzado', icon: Code2, premium: true, category: 'PHP / Laravel', iconColor: 'text-red-400', bg: 'bg-red-500/10' },
    { id: 6, href: '/beta',                      title: 'APIs REST con Laravel', description: 'Diseña, construye y documenta APIs profesionales con autenticación y versionado.', duration: '5h 00min', lessons: 25, level: 'Avanzado', icon: Code2, premium: true, category: 'PHP / Laravel', iconColor: 'text-red-400', bg: 'bg-red-500/10' },
    { id: 7, href: '/lecciones/ia-programacion', title: 'Programación con IA', description: 'Integra modelos de lenguaje en tus proyectos. APIs, prompts, agentes y automatizaciones con IA.', duration: '5h 45min', lessons: 28, level: 'Avanzado', icon: Brain, premium: true, category: 'Inteligencia Artificial', iconColor: 'text-purple-400', bg: 'bg-purple-500/10' },
    { id: 8, href: '/beta',                      title: 'Fine-tuning de modelos', description: 'Ajusta modelos de lenguaje con tus propios datos para casos de uso específicos.', duration: '6h 20min', lessons: 30, level: 'Avanzado', icon: Brain, premium: true, category: 'Inteligencia Artificial', iconColor: 'text-purple-400', bg: 'bg-purple-500/10' },
    { id: 9, href: '/beta',                      title: 'Máquinas Virtuales con Linux', description: 'Configura y gestiona VMs con VirtualBox y VMware. Networking, snapshots y entornos de producción.', duration: '4h 20min', lessons: 22, level: 'Intermedio', icon: Server, premium: true, category: 'Servidores', iconColor: 'text-blue-400', bg: 'bg-blue-500/10' },
    { id: 10, href: '/lecciones/docker',         title: 'Docker desde cero', description: 'Contenedores, imágenes, volúmenes y Docker Compose explicados paso a paso.', duration: '4h 50min', lessons: 24, level: 'Intermedio', icon: Server, premium: true, category: 'Servidores', iconColor: 'text-blue-400', bg: 'bg-blue-500/10' },
    { id: 11, href: '/lecciones/n8n',            title: 'Automatiza con n8n', description: 'Crea flujos de trabajo automáticos sin código. Conecta apps, APIs e IA en minutos.', duration: '3h 50min', lessons: 20, level: 'Intermedio', icon: Zap, premium: true, category: 'Automatización', iconColor: 'text-yellow-400', bg: 'bg-yellow-500/10' },
    { id: 12, href: '/lecciones/seguridad-web',  title: 'Seguridad básica en la web', description: 'Entiende las vulnerabilidades más comunes y cómo proteger tus aplicaciones desde el principio.', duration: '2h 10min', lessons: 10, level: 'Básico', icon: Shield, premium: false, category: 'Seguridad', iconColor: 'text-emerald-400', bg: 'bg-emerald-500/10' },
];

const categories = ['Todos', 'Linux', 'PHP / Laravel', 'Inteligencia Artificial', 'Servidores', 'Automatización', 'Seguridad'];
const levels = ['Todos', 'Básico', 'Intermedio', 'Avanzado'];

export default function CoursesIndex() {
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('Todos');
    const [level, setLevel] = useState('Todos');
    const [filter, setFilter] = useState<'todos' | 'free' | 'premium'>('todos');

    const filtered = allCourses.filter(c => {
        const matchSearch = c.title.toLowerCase().includes(search.toLowerCase()) || c.description.toLowerCase().includes(search.toLowerCase());
        const matchCat = category === 'Todos' || c.category === category;
        const matchLevel = level === 'Todos' || c.level === level;
        const matchFilter = filter === 'todos' || (filter === 'free' && !c.premium) || (filter === 'premium' && c.premium);
        return matchSearch && matchCat && matchLevel && matchFilter;
    });

    return (
        <AppLayout>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Cabecera */}
                <div className="mb-10">
                    <h1 className="text-4xl font-bold mb-2">Todos los cursos</h1>
                    <p className="text-gray-400">{filtered.length} cursos disponibles</p>
                </div>

                {/* Buscador */}
                <div className="relative mb-6">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                    <input
                        type="text"
                        placeholder="Buscar cursos..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-gray-900 border border-gray-800 text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 transition-colors"
                    />
                </div>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Sidebar filtros */}
                    <aside className="lg:w-56 shrink-0 space-y-6">
                        <div>
                            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                                <Filter className="h-3.5 w-3.5" /> Acceso
                            </h3>
                            <div className="space-y-1">
                                {[['todos', 'Todos'], ['free', 'Gratuito'], ['premium', 'Premium']].map(([val, label]) => (
                                    <button key={val} onClick={() => setFilter(val as typeof filter)}
                                        className={`w-full text-left px-3 py-1.5 rounded-lg text-sm transition-colors ${filter === val ? 'bg-indigo-600 text-white' : 'text-gray-400 hover:text-white hover:bg-gray-800'}`}>
                                        {label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Categoría</h3>
                            <div className="space-y-1">
                                {categories.map(cat => (
                                    <button key={cat} onClick={() => setCategory(cat)}
                                        className={`w-full text-left px-3 py-1.5 rounded-lg text-sm transition-colors ${category === cat ? 'bg-indigo-600 text-white' : 'text-gray-400 hover:text-white hover:bg-gray-800'}`}>
                                        {cat}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Nivel</h3>
                            <div className="space-y-1">
                                {levels.map(l => (
                                    <button key={l} onClick={() => setLevel(l)}
                                        className={`w-full text-left px-3 py-1.5 rounded-lg text-sm transition-colors ${level === l ? 'bg-indigo-600 text-white' : 'text-gray-400 hover:text-white hover:bg-gray-800'}`}>
                                        {l}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </aside>

                    {/* Grid cursos */}
                    <div className="flex-1">
                        {filtered.length === 0 ? (
                            <div className="text-center py-20 text-gray-500">
                                <BookOpen className="h-12 w-12 mx-auto mb-4 opacity-30" />
                                <p>No hay cursos que coincidan con tu búsqueda.</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                                {filtered.map(course => {
                                    const Icon = course.icon;
                                    return (
                                        <Link key={course.id} href={course.href}
                                            className="group flex flex-col rounded-2xl border border-gray-800 bg-gray-900/60 hover:border-gray-700 hover:bg-gray-900 transition-all overflow-hidden">
                                            <div className={`h-2 w-full ${course.premium ? 'bg-amber-500' : 'bg-emerald-600'}`} />
                                            <div className="p-5 flex flex-col h-full">
                                                <div className="flex items-start justify-between mb-3">
                                                    <div className={`p-2 rounded-lg ${course.bg}`}>
                                                        <Icon className={`h-5 w-5 ${course.iconColor}`} />
                                                    </div>
                                                    <Badge variant={course.premium ? 'premium' : 'free'}>
                                                        {course.premium ? 'Premium' : 'Gratis'}
                                                    </Badge>
                                                </div>
                                                <h3 className="font-semibold text-white mb-1.5 group-hover:text-indigo-300 transition-colors">
                                                    {course.title}
                                                </h3>
                                                <p className="text-gray-400 text-sm leading-relaxed mb-4 flex-1 line-clamp-2">
                                                    {course.description}
                                                </p>
                                                <div className="flex items-center gap-3 text-xs text-gray-500 border-t border-gray-800 pt-3">
                                                    <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{course.duration}</span>
                                                    <span className="flex items-center gap-1"><BookOpen className="h-3.5 w-3.5" />{course.lessons} lecciones</span>
                                                    <span className="flex items-center gap-1"><Star className="h-3.5 w-3.5" />{course.level}</span>
                                                </div>
                                            </div>
                                        </Link>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
