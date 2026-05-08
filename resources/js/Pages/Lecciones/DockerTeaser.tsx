import LessonLayout from '@/layouts/LessonLayout';
import { Head, Link } from '@inertiajs/react';
import { Lock, CheckCircle2 } from 'lucide-react';

const modules = [
    { id: '/lecciones/docker', title: '¿Qué es Docker?', free: true },
    { id: '#', title: 'Imágenes y contenedores', free: false },
    { id: '#', title: 'Dockerfile paso a paso', free: false },
    { id: '#', title: 'Volúmenes y redes', free: false },
    { id: '#', title: 'Docker Compose', free: false },
    { id: '#', title: 'Docker en producción', free: false },
    { id: '#', title: 'Multi-stage builds', free: false },
    { id: '#', title: 'Docker con Laravel', free: false },
];

const betaFeatures = [
    'Imágenes y contenedores en profundidad',
    'Dockerfile optimizado para PHP/Node',
    'Docker Compose para stack completo',
    'Volúmenes, redes y variables de entorno',
    'Multi-stage builds para producción',
    'Docker con Laravel, nginx y MySQL',
    'Docker Desktop 4.50 — nuevas funciones 2026',
];

export default function DockerTeaser() {
    return (
        <LessonLayout
            title="Docker desde cero"
            description="Contenedores, imágenes, volúmenes y Docker Compose explicados paso a paso."
            duration="4h 50min"
            lessons={24}
            level="Intermedio"
            premium={true}
            modules={modules}
            activeModule="/lecciones/docker"
            category="Servidores"
        >
            <Head>
                <title>Docker desde cero — DarkCode Premium</title>
                <meta name="description" content="Aprende Docker desde cero: contenedores, imágenes, Compose y despliegue en producción. Curso premium DarkCode." />
            </Head>

            <h1>Docker desde cero</h1>

            <blockquote>
                Docker cambió para siempre cómo desplegamos software. En 2026, <strong>Docker Engine 29</strong> y <strong>Docker Desktop 4.50</strong> traen mejoras masivas de rendimiento (hasta 98% más rápido con virtiofs en Mac) y el nuevo MCP Toolkit para integrar IA en tus pipelines de contenedores.
            </blockquote>

            {/* ── Módulo gratuito ── */}
            <h2>¿Qué es Docker y por qué lo necesitas?</h2>

            <p>
                Docker es una plataforma de <strong>contenedores</strong>. Un contenedor es un entorno aislado que empaqueta tu aplicación con todas sus dependencias (código, runtime, librerías, configuración) en una unidad portable que se ejecuta igual en cualquier máquina.
            </p>

            <h3>El problema que resuelve</h3>
            <pre><code>{`# Sin Docker:
"En mi máquina funciona"
→ Diferente versión de PHP
→ Diferente sistema operativo
→ Librerías que faltan
→ Variables de entorno distintas

# Con Docker:
"Si el contenedor funciona aquí, funciona en cualquier lado"
→ Siempre PHP 8.3
→ Siempre el mismo sistema base (Alpine/Debian)
→ Todas las dependencias incluidas
→ Variables en .env → docker-compose.yml`}</code></pre>

            <h3>Conceptos clave</h3>
            <ul>
                <li><strong>Imagen</strong> — plantilla inmutable. Como un ISO de sistema operativo.</li>
                <li><strong>Contenedor</strong> — instancia en ejecución de una imagen. Como una VM pero mucho más ligera.</li>
                <li><strong>Dockerfile</strong> — receta para construir una imagen.</li>
                <li><strong>Docker Compose</strong> — orquestador para múltiples contenedores (app + BD + Redis).</li>
                <li><strong>Docker Hub</strong> — registro público de imágenes (como npm para contenedores).</li>
            </ul>

            <h3>Instalación rápida</h3>
            <pre><code>{`# Ubuntu 24.04
curl -fsSL https://get.docker.com | sh
sudo usermod -aG docker $USER   # Usar sin sudo
newgrp docker                   # Aplicar cambios de grupo

# Verificar instalación
docker --version                # Docker version 29.x.x
docker compose version          # Docker Compose version 2.x.x
docker run hello-world          # Test completo`}</code></pre>

            <h3>Tu primer contenedor</h3>
            <pre><code>{`# Correr un servidor nginx en segundos
docker run -d -p 8080:80 --name mi-nginx nginx

# Ver contenedores activos
docker ps

# Acceder a http://localhost:8080 → nginx funcionando ✅

# Entrar al contenedor
docker exec -it mi-nginx bash

# Parar y eliminar
docker stop mi-nginx
docker rm mi-nginx`}</code></pre>

            {/* ── Paywall ── */}
            <div className="not-prose my-12">
                <div className="relative rounded-2xl border border-amber-500/30 bg-amber-500/5 overflow-hidden">
                    {/* Blur del contenido debajo */}
                    <div className="px-8 py-6 blur-sm pointer-events-none select-none opacity-50">
                        <h3 className="text-xl font-bold mb-3">Imágenes y contenedores en profundidad</h3>
                        <pre className="bg-gray-900 rounded-xl p-4 text-sm text-gray-300">
{`# Gestión de imágenes
docker pull ubuntu:24.04
docker images
docker image inspect ubuntu:24.04
docker build -t mi-app:1.0 .
docker push mi-usuario/mi-app:1.0`}
                        </pre>
                    </div>

                    {/* CTA superpuesto */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-b from-white/80 to-white/95 dark:from-gray-950/80 dark:to-gray-950/95 p-8 text-center">
                        <Lock className="h-10 w-10 text-amber-500 mb-4" />
                        <h3 className="text-2xl font-extrabold mb-2">Contenido Premium</h3>
                        <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-sm">
                            El resto del curso — 23 lecciones más — está disponible con el acceso Beta de DarkCode.
                        </p>
                        <ul className="text-left space-y-2 mb-8 max-w-sm">
                            {betaFeatures.map((f, i) => (
                                <li key={i} className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                                    <CheckCircle2 className="h-4 w-4 text-amber-500 shrink-0" />
                                    {f}
                                </li>
                            ))}
                        </ul>
                        <Link
                            href="/beta"
                            className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white font-bold px-8 py-3.5 rounded-xl text-base transition-colors shadow-lg shadow-amber-500/25"
                        >
                            Desbloquear todo — 19€ de por vida
                        </Link>
                        <p className="text-xs text-gray-400 mt-3">Pago único · Acceso a los 12 cursos · Sin renovaciones</p>
                    </div>
                </div>
            </div>
        </LessonLayout>
    );
}
