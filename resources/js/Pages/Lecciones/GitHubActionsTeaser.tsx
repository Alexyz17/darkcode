import LessonLayout from '@/layouts/LessonLayout';
import { Head, Link } from '@inertiajs/react';
import { Lock, CheckCircle2 } from 'lucide-react';

const modules = [
    { id: '/lecciones/github-actions', title: 'Conceptos de CI/CD y GitHub Actions', free: true },
    { id: '/lecciones/github-actions#primer-workflow', title: 'Tu primer workflow', free: true },
    { id: '#', title: 'Jobs, steps y runners', free: false },
    { id: '#', title: 'Secrets y variables de entorno', free: false },
    { id: '#', title: 'Matrix builds — test en múltiples versiones', free: false },
    { id: '#', title: 'Deploy automático a producción', free: false },
    { id: '#', title: 'Cachés y artefactos', free: false },
    { id: '#', title: 'Actions propias y workflows reutilizables', free: false },
];

const betaFeatures = [
    'Jobs paralelos y dependencias con needs',
    'Secrets encriptados para credenciales de producción',
    'Matrix builds para Node 18/20/22 y múltiples OS',
    'Deploy a VPS (SSH), Vercel y AWS S3 + CloudFront',
    'Caché de dependencias npm/pip/composer para builds rápidos',
    'Artefactos: guardar y descargar entre jobs',
    'Crear Actions personalizadas con Docker o JavaScript',
    'Workflows reutilizables con inputs y outputs',
];

export default function GitHubActionsTeaser() {
    return (
        <LessonLayout
            title="GitHub Actions — CI/CD"
            description="Automatiza tests, builds y deploys con GitHub Actions. Workflows profesionales desde cero."
            duration="4h 00min"
            lessons={20}
            level="Intermedio"
            premium={true}
            modules={modules}
            activeModule="/lecciones/github-actions"
            category="DevOps"
        >
            <Head>
                <title>GitHub Actions CI/CD — DarkCode Premium</title>
                <meta name="description" content="Aprende GitHub Actions: workflows, jobs, secrets, matrix builds y deploy automático. Acceso Premium DarkCode." />
            </Head>

            <h1>GitHub Actions — CI/CD</h1>

            <blockquote>
                CI/CD significa que cada vez que haces push, tu código se testea, construye y despliega automáticamente. GitHub Actions es la solución más accesible para implementarlo: sin servidores que configurar, gratis para repos públicos, integrado con GitHub.
            </blockquote>

            {/* ── 1. Conceptos ── */}
            <h2 id="conceptos">Conceptos de CI/CD</h2>
            <p>
                <strong>CI (Integración Continua)</strong> — cada push dispara una pipeline que corre los tests automáticamente. Si algo se rompe, lo sabes antes de llegar a producción.
            </p>
            <p>
                <strong>CD (Despliegue Continuo)</strong> — si los tests pasan, el código se despliega automáticamente a staging o producción. Sin procesos manuales, sin errores humanos.
            </p>

            <h3>Anatomía de GitHub Actions</h3>
            <ul>
                <li><strong>Workflow</strong> — archivo YAML en <code>.github/workflows/</code> que define la automatización</li>
                <li><strong>Event</strong> — lo que dispara el workflow (push, PR, schedule, manual...)</li>
                <li><strong>Job</strong> — conjunto de steps que se ejecutan en el mismo runner</li>
                <li><strong>Step</strong> — una tarea individual (comando shell o Action)</li>
                <li><strong>Action</strong> — componente reutilizable del marketplace de GitHub</li>
                <li><strong>Runner</strong> — máquina virtual donde corre el workflow (ubuntu-latest, windows-latest, macos-latest)</li>
            </ul>

            {/* ── 2. Primer workflow ── */}
            <h2 id="primer-workflow">Tu primer workflow</h2>
            <p>
                Un workflow mínimo que corre tests en cada push y Pull Request:
            </p>

            <pre><code>{`# .github/workflows/ci.yml

name: CI

# ¿Cuándo ejecutar?
on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  tests:
    name: Tests y linting
    runs-on: ubuntu-latest   # VM gratuita de GitHub

    steps:
      # 1. Descargar el código
      - uses: actions/checkout@v4

      # 2. Configurar Node.js
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'         # cachear node_modules automáticamente

      # 3. Instalar dependencias
      - run: npm ci            # más rápido y reproducible que npm install

      # 4. Linting
      - run: npm run lint

      # 5. Type checking
      - run: npm run typecheck

      # 6. Tests unitarios
      - run: npm test

      # 7. Build de producción (para asegurar que compila)
      - run: npm run build`}</code></pre>

            <h3>Workflow para Laravel + PHP</h3>
            <pre><code>{`name: Laravel CI

on: [push, pull_request]

jobs:
  laravel:
    runs-on: ubuntu-latest

    services:
      mysql:
        image: mysql:8.0
        env:
          MYSQL_ROOT_PASSWORD: secret
          MYSQL_DATABASE: testing
        options: --health-cmd="mysqladmin ping" --health-interval=10s --health-timeout=5s --health-retries=3

    steps:
      - uses: actions/checkout@v4

      - uses: shivammathur/setup-php@v2
        with:
          php-version: '8.3'
          extensions: mbstring, pdo, pdo_mysql
          coverage: xdebug

      - name: Cache Composer
        uses: actions/cache@v4
        with:
          path: vendor
          key: composer-\${{ hashFiles('composer.lock') }}

      - run: composer install --no-interaction --prefer-dist

      - name: Preparar entorno
        run: |
          cp .env.testing .env
          php artisan key:generate
          php artisan migrate --force

      - run: php artisan test --coverage --min=80`}</code></pre>

            {/* ── Paywall ── */}
            <div className="not-prose my-12">
                <div className="relative rounded-2xl border border-amber-500/30 bg-amber-500/5 overflow-hidden">
                    <div className="px-8 py-6 blur-sm pointer-events-none select-none opacity-50">
                        <h3 className="text-xl font-bold mb-3">Deploy automático a producción</h3>
                        <pre className="bg-gray-900 rounded-xl p-4 text-sm text-gray-300">
{`deploy:
  needs: tests           # solo si los tests pasan
  runs-on: ubuntu-latest
  if: github.ref == 'refs/heads/main'

  steps:
    - uses: actions/checkout@v4
    - name: Deploy via SSH
      uses: appleboy/ssh-action@v1
      with:
        host: \${{ secrets.SERVER_HOST }}
        username: \${{ secrets.SERVER_USER }}
        key: \${{ secrets.SSH_PRIVATE_KEY }}
        script: |
          cd /var/www/mi-app
          git pull origin main
          composer install --no-dev
          php artisan migrate --force
          php artisan optimize`}
                        </pre>
                    </div>
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-b from-white/80 to-white/95 dark:from-gray-950/80 dark:to-gray-950/95 p-8 text-center">
                        <Lock className="h-10 w-10 text-amber-500 mb-4" />
                        <h3 className="text-2xl font-extrabold mb-2">Contenido Premium</h3>
                        <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-sm">
                            6 módulos más — secrets, matrix builds, deploy a producción y Actions personalizadas — con el acceso Beta.
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
