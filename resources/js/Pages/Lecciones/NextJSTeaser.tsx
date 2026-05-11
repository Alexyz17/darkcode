import LessonLayout from '@/layouts/LessonLayout';
import { Head, Link } from '@inertiajs/react';
import { Lock, CheckCircle2 } from 'lucide-react';

const modules = [
    { id: '/lecciones/nextjs', title: 'App Router — fundamentos', free: true },
    { id: '/lecciones/nextjs#server-actions', title: 'Server Actions', free: true },
    { id: '#', title: 'Layouts, loading y error boundaries', free: false },
    { id: '#', title: 'Caché y revalidación', free: false },
    { id: '#', title: 'Middleware y autenticación', free: false },
    { id: '#', title: 'Internacionalización (i18n)', free: false },
    { id: '#', title: 'SEO y metadatos dinámicos', free: false },
    { id: '#', title: 'Deploy en Vercel y optimización', free: false },
];

const betaFeatures = [
    'Layouts anidados y Route Groups para organizar el código',
    'loading.tsx y error.tsx para UX profesional',
    'fetch caching, revalidatePath y revalidateTag',
    'Middleware para auth, redirects y headers',
    'next-intl para i18n con rutas y mensajes',
    'generateMetadata dinámica y Open Graph',
    'Image y Font optimization automática',
    'Deploy a Vercel con variables de entorno y previews',
];

export default function NextJSTeaser() {
    return (
        <LessonLayout
            title="Next.js — App Router"
            description="App Router, Server Components, Server Actions, middleware, i18n, SEO y deploy a Vercel."
            duration="5h 00min"
            lessons={25}
            level="Avanzado"
            premium={true}
            modules={modules}
            activeModule="/lecciones/nextjs"
            category="Frontend"
        >
            <Head>
                <title>Next.js App Router — DarkCode Premium</title>
                <meta name="description" content="Next.js con App Router, Server Actions, middleware, i18n, SEO y Vercel. Acceso Premium DarkCode." />
            </Head>

            <h1>Next.js — App Router</h1>

            <blockquote>
                Next.js es el framework React más usado en producción. Con el App Router de Next.js 14+, la forma de construir apps ha cambiado fundamentalmente: Server Components por defecto, Server Actions para formularios, y un sistema de caché granular que hace que las páginas sean instantáneas.
            </blockquote>

            <h2 id="approuter">App Router — fundamentos</h2>
            <p>El App Router usa convenciones de ficheros en la carpeta <code>app/</code> para definir rutas, layouts y comportamiento:</p>
            <pre><code>{`# Estructura del proyecto
app/
├── layout.tsx          # Layout raíz (siempre Server Component)
├── page.tsx            # Página inicial /
├── loading.tsx         # Spinner automático mientras carga
├── error.tsx           # Error boundary automático
├── not-found.tsx       # 404
├── (auth)/             # Route Group — agrupa sin afectar la URL
│   ├── login/page.tsx  # /login
│   └── register/page.tsx # /register
├── dashboard/
│   ├── layout.tsx      # Layout anidado para /dashboard/*
│   ├── page.tsx        # /dashboard
│   └── [userId]/
│       └── page.tsx    # /dashboard/123 — segmento dinámico
└── api/
    └── webhooks/route.ts  # API Route: /api/webhooks

// app/layout.tsx — Root Layout
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: { template: '%s — MiApp', default: 'MiApp' },
    description: 'La plataforma más rápida para...',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="es">
            <body className={inter.className}>
                <Navbar />
                <main>{children}</main>
                <Footer />
            </body>
        </html>
    );
}

// app/dashboard/page.tsx — Server Component
async function DashboardPage() {
    // Fetch directo a la BD — cero JavaScript extra en el cliente
    const stats = await db.query('SELECT ...');

    return (
        <div>
            <h1>Dashboard</h1>
            <Stats data={stats} />           {/* Server Component */}
            <GraficoInteractivo />           {/* 'use client' */}
        </div>
    );
}`}</code></pre>

            <h2 id="server-actions">Server Actions — formularios sin API</h2>
            <pre><code>{`// app/actions/usuarios.ts
'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const CrearUsuarioSchema = z.object({
    nombre: z.string().min(2).max(100),
    email: z.string().email(),
    rol: z.enum(['admin', 'user']),
});

export async function crearUsuario(formData: FormData) {
    // Validar con Zod
    const resultado = CrearUsuarioSchema.safeParse({
        nombre: formData.get('nombre'),
        email: formData.get('email'),
        rol: formData.get('rol'),
    });

    if (!resultado.success) {
        return { error: resultado.error.flatten().fieldErrors };
    }

    // Guardar en la BD (directamente — no hace falta una API)
    await db.insert(usuarios).values(resultado.data);

    // Invalidar la caché de la página de usuarios
    revalidatePath('/dashboard/usuarios');
    redirect('/dashboard/usuarios');
}

// app/dashboard/usuarios/nuevo/page.tsx
import { crearUsuario } from '@/actions/usuarios';

export default function NuevoUsuarioPage() {
    return (
        <form action={crearUsuario}>  {/* Server Action directo en el form */}
            <input name="nombre" required />
            <input name="email" type="email" required />
            <select name="rol">
                <option value="user">Usuario</option>
                <option value="admin">Admin</option>
            </select>
            <button type="submit">Crear</button>
        </form>
    );
}`}</code></pre>

            {/* ── Paywall ── */}
            <div className="not-prose my-12">
                <div className="relative rounded-2xl border border-amber-500/30 bg-amber-500/5 overflow-hidden">
                    <div className="px-8 py-6 blur-sm pointer-events-none select-none opacity-50">
                        <h3 className="text-xl font-bold mb-3">Caché granular — páginas instantáneas</h3>
                        <pre className="bg-gray-900 rounded-xl p-4 text-sm text-gray-300">
{`// Revalidar cada hora
const datos = await fetch('/api/stats', { next: { revalidate: 3600 } });

// Revalidar por tag
const posts = await fetch('/api/posts', { next: { tags: ['posts'] } });

// En una Server Action:
revalidateTag('posts');  // invalida todas las respuestas con ese tag`}
                        </pre>
                    </div>
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-b from-white/80 to-white/95 dark:from-gray-950/80 dark:to-gray-950/95 p-8 text-center">
                        <Lock className="h-10 w-10 text-amber-500 mb-4" />
                        <h3 className="text-2xl font-extrabold mb-2">Contenido Premium</h3>
                        <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-sm">
                            6 módulos más — caché, middleware, i18n, SEO y deploy — disponibles con el acceso Beta.
                        </p>
                        <ul className="text-left space-y-2 mb-8 max-w-sm">
                            {betaFeatures.map((f, i) => (
                                <li key={i} className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                                    <CheckCircle2 className="h-4 w-4 text-amber-500 shrink-0" />
                                    {f}
                                </li>
                            ))}
                        </ul>
                        <Link href="/beta"
                            className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white font-bold px-8 py-3.5 rounded-xl text-base transition-colors shadow-lg shadow-amber-500/25">
                            Desbloquear todo — 19€ de por vida
                        </Link>
                        <p className="text-xs text-gray-400 mt-3">Pago único · Acceso a todos los cursos · Sin renovaciones</p>
                    </div>
                </div>
            </div>
        </LessonLayout>
    );
}
