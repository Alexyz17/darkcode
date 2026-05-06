import AppLayout from '@/layouts/AppLayout';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Link } from '@inertiajs/react';
import {
    Clock, BookOpen, Star, Play, Lock, CheckCircle2,
    ChevronLeft, Terminal, Users, Award
} from 'lucide-react';

const course = {
    id: 1,
    title: 'Introducción a Linux',
    description: 'Aprende a moverte por la terminal, gestionar archivos y entender el sistema operativo más usado en servidores del mundo. Este curso te lleva desde cero hasta sentirte cómodo con la línea de comandos.',
    duration: '2h 30min',
    lessons: 12,
    level: 'Básico',
    icon: Terminal,
    premium: false,
    category: 'Linux',
    students: 843,
    rating: 4.8,
    instructor: 'TechLearn',
    syllabus: [
        { section: '1. Introducción', lessons: [
            { title: '¿Qué es Linux y por qué aprenderlo?', duration: '8 min', free: true },
            { title: 'Distribuciones: Ubuntu, Debian, Arch', duration: '6 min', free: true },
            { title: 'Instalando tu primer Linux', duration: '12 min', free: true },
        ]},
        { section: '2. La terminal', lessons: [
            { title: 'Abriendo y configurando la terminal', duration: '5 min', free: true },
            { title: 'Navegación: pwd, ls, cd', duration: '10 min', free: true },
            { title: 'Creación y borrado de archivos', duration: '8 min', free: false },
        ]},
        { section: '3. Permisos y usuarios', lessons: [
            { title: 'Sistema de permisos rwx', duration: '12 min', free: false },
            { title: 'chmod y chown', duration: '10 min', free: false },
            { title: 'Usuarios, grupos y sudo', duration: '14 min', free: false },
        ]},
        { section: '4. Gestión de paquetes', lessons: [
            { title: 'apt, yum y pacman', duration: '10 min', free: false },
            { title: 'Instalando software desde fuente', duration: '15 min', free: false },
            { title: 'Proyecto final: servidor web en Linux', duration: '20 min', free: false },
        ]},
    ],
    whatYouLearn: [
        'Navegar y gestionar el sistema de archivos desde la terminal',
        'Entender y configurar permisos de archivos y directorios',
        'Gestionar usuarios y grupos del sistema',
        'Instalar y actualizar software con el gestor de paquetes',
        'Montar un servidor web básico en Linux',
        'Automatizar tareas simples con scripts Bash',
    ],
};

export default function CourseShow() {
    const isEnrolled = false;

    return (
        <AppLayout>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <Link href="/courses" className="inline-flex items-center gap-1.5 text-gray-400 hover:text-white text-sm mb-8 transition-colors">
                    <ChevronLeft className="h-4 w-4" /> Todos los cursos
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                    {/* Contenido principal */}
                    <div className="lg:col-span-2">
                        <div className="flex items-center gap-3 mb-4">
                            <Badge variant="outline" className="text-gray-400 border-gray-700">{course.category}</Badge>
                            <Badge variant={course.premium ? 'premium' : 'free'}>{course.premium ? 'Premium' : 'Gratis'}</Badge>
                            <Badge variant="outline" className="text-gray-400 border-gray-700">{course.level}</Badge>
                        </div>

                        <h1 className="text-4xl font-bold text-white mb-4">{course.title}</h1>
                        <p className="text-gray-300 text-lg leading-relaxed mb-6">{course.description}</p>

                        <div className="flex flex-wrap items-center gap-5 text-sm text-gray-400 mb-10 pb-10 border-b border-gray-800">
                            <span className="flex items-center gap-1.5"><Star className="h-4 w-4 text-amber-400" />{course.rating} valoración</span>
                            <span className="flex items-center gap-1.5"><Users className="h-4 w-4" />{course.students} alumnos</span>
                            <span className="flex items-center gap-1.5"><Clock className="h-4 w-4" />{course.duration}</span>
                            <span className="flex items-center gap-1.5"><BookOpen className="h-4 w-4" />{course.lessons} lecciones</span>
                            <span className="flex items-center gap-1.5"><Award className="h-4 w-4" />{course.instructor}</span>
                        </div>

                        {/* Qué aprenderás */}
                        <div className="mb-10">
                            <h2 className="text-xl font-bold mb-4">Qué aprenderás</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {course.whatYouLearn.map((item, i) => (
                                    <div key={i} className="flex items-start gap-2.5 text-gray-300 text-sm">
                                        <CheckCircle2 className="h-4 w-4 text-emerald-400 mt-0.5 shrink-0" />
                                        {item}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Temario */}
                        <div>
                            <h2 className="text-xl font-bold mb-4">Temario</h2>
                            <div className="space-y-3">
                                {course.syllabus.map((section, si) => (
                                    <div key={si} className="border border-gray-800 rounded-xl overflow-hidden">
                                        <div className="bg-gray-900 px-4 py-3">
                                            <h3 className="font-semibold text-sm text-white">{section.section}</h3>
                                        </div>
                                        <div className="divide-y divide-gray-800/50">
                                            {section.lessons.map((lesson, li) => (
                                                <div key={li} className="flex items-center justify-between px-4 py-3 bg-gray-900/30">
                                                    <div className="flex items-center gap-3">
                                                        {lesson.free || isEnrolled
                                                            ? <Play className="h-3.5 w-3.5 text-indigo-400" />
                                                            : <Lock className="h-3.5 w-3.5 text-gray-600" />
                                                        }
                                                        <span className={`text-sm ${lesson.free || isEnrolled ? 'text-gray-200' : 'text-gray-500'}`}>
                                                            {lesson.title}
                                                        </span>
                                                        {lesson.free && (
                                                            <span className="text-xs text-emerald-400 font-medium">Vista previa</span>
                                                        )}
                                                    </div>
                                                    <span className="text-xs text-gray-500 shrink-0">{lesson.duration}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Card lateral */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-24 rounded-2xl border border-gray-800 bg-gray-900 overflow-hidden">
                            <div className="aspect-video bg-gray-800 flex items-center justify-center relative">
                                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-orange-600/5" />
                                <div className="relative flex flex-col items-center gap-3">
                                    <div className="p-4 rounded-full bg-white/10 backdrop-blur">
                                        <Play className="h-8 w-8 text-white" />
                                    </div>
                                    <span className="text-sm text-gray-300">Vista previa gratuita</span>
                                </div>
                            </div>

                            <div className="p-6">
                                <div className="text-3xl font-bold text-white mb-1">
                                    {course.premium ? '9,99 €/mes' : 'Gratis'}
                                </div>
                                {course.premium && (
                                    <p className="text-gray-400 text-sm mb-4">Con suscripción Premium</p>
                                )}

                                <Button className="w-full h-11 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold mb-3 mt-4">
                                    {course.premium ? 'Acceder con Premium' : 'Empezar gratis'}
                                </Button>

                                {course.premium && (
                                    <Button variant="outline" className="w-full h-11 border-gray-700 text-gray-300 hover:bg-gray-800" asChild>
                                        <Link href="/premium">Ver planes Premium</Link>
                                    </Button>
                                )}

                                <div className="mt-6 space-y-2.5 text-sm text-gray-400">
                                    <div className="flex items-center gap-2"><Clock className="h-4 w-4" />{course.duration} de contenido</div>
                                    <div className="flex items-center gap-2"><BookOpen className="h-4 w-4" />{course.lessons} lecciones</div>
                                    <div className="flex items-center gap-2"><Star className="h-4 w-4" />Nivel {course.level}</div>
                                    <div className="flex items-center gap-2"><Users className="h-4 w-4" />{course.students} alumnos inscritos</div>
                                    <div className="flex items-center gap-2"><Award className="h-4 w-4" />Certificado al completar</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
