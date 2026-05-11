import LessonLayout from '@/layouts/LessonLayout';
import { Head, Link } from '@inertiajs/react';
import { Lock, CheckCircle2 } from 'lucide-react';

const modules = [
    { id: '/lecciones/redis-cache', title: 'Redis — estructuras de datos', free: true },
    { id: '/lecciones/redis-cache#patrones', title: 'Patrones de caché', free: true },
    { id: '#', title: 'Sesiones y autenticación', free: false },
    { id: '#', title: 'Pub/Sub y mensajería', free: false },
    { id: '#', title: 'Streams — procesamiento de eventos', free: false },
    { id: '#', title: 'Queues con Redis y Bull', free: false },
    { id: '#', title: 'Redis Cluster y alta disponibilidad', free: false },
    { id: '#', title: 'Redis con Laravel y Node.js', free: false },
];

const betaFeatures = [
    'Sesiones en Redis: serialización, TTL y regeneración',
    'Rate limiting: token bucket y sliding window',
    'Pub/Sub para notificaciones en tiempo real',
    'Redis Streams para event sourcing ligero',
    'Queues con Bull/BullMQ: jobs, prioridades y reintentos',
    'Distributed locks con Redlock para concurrencia',
    'Redis Sentinel y Cluster para alta disponibilidad',
    'Integración con Laravel Cache y Queue drivers',
];

export default function RedisCacheTeaser() {
    return (
        <LessonLayout
            title="Redis — Caché y mensajería"
            description="Estructuras de datos, patrones de caché, pub/sub, streams y queues. Redis en producción."
            duration="3h 30min"
            lessons={18}
            level="Intermedio"
            premium={true}
            modules={modules}
            activeModule="/lecciones/redis-cache"
            category="Bases de datos"
        >
            <Head>
                <title>Redis Caché y mensajería — DarkCode Premium</title>
                <meta name="description" content="Redis: estructuras de datos, caché, pub/sub, streams y queues. Acceso Premium DarkCode." />
            </Head>

            <h1>Redis — Caché y mensajería</h1>

            <blockquote>
                Redis es el almacén de datos en memoria más rápido del mundo: 100.000+ operaciones por segundo en hardware modesto. No es solo caché — es una navaja suiza para sesiones, rate limiting, pub/sub, colas de trabajo y procesamiento de eventos.
            </blockquote>

            <h2 id="estructuras">Estructuras de datos de Redis</h2>
            <pre><code>{`# Redis tiene 10 tipos de datos nativos. Los más usados:

# ── STRINGS ──
SET usuario:1:nombre "Ana García"
GET usuario:1:nombre           # "Ana García"
SET contador 0
INCR contador                  # 1
INCRBY contador 5              # 6
SET sesion:abc123 '{"id":1}' EX 3600  # expira en 1h
TTL sesion:abc123              # segundos restantes

# ── HASHES — objeto como dict ──
HSET usuario:1 nombre "Ana" email "ana@test.com" activo 1
HGET usuario:1 nombre          # "Ana"
HGETALL usuario:1              # todos los campos
HMGET usuario:1 nombre email   # múltiples campos
HINCRBY usuario:1 login_count 1
HDEL usuario:1 campo_obsoleto

# ── LISTS — colas y stacks ──
RPUSH cola:emails "job1" "job2" "job3"   # añadir al final
LPUSH cola:emails "urgente"              # añadir al principio
LPOP cola:emails                         # extraer del principio (queue)
RPOP cola:emails                         # extraer del final (stack)
BRPOP cola:emails 30                     # extraer bloqueante (espera 30s)
LRANGE cola:emails 0 -1                  # ver todos
LLEN cola:emails                         # tamaño

# ── SETS — sin duplicados ──
SADD tags:post:1 "python" "tutorial" "gratis"
SMEMBERS tags:post:1           # todos los miembros
SISMEMBER tags:post:1 "python" # 1 (existe) / 0 (no existe)
SCARD tags:post:1              # número de elementos
SUNION tags:post:1 tags:post:2 # unión
SINTER tags:post:1 tags:post:2 # intersección

# ── SORTED SETS — ranking ──
ZADD leaderboard 1250 "ana" 980 "bob" 1450 "cal"
ZRANK leaderboard "ana"        # posición (0-indexed)
ZREVRANK leaderboard "ana"     # posición desde el final
ZSCORE leaderboard "ana"       # puntuación
ZREVRANGE leaderboard 0 9 WITHSCORES  # top 10 con puntuaciones
ZINCRBY leaderboard 100 "ana"  # añadir puntos`}</code></pre>

            <h2 id="patrones">Patrones de caché</h2>
            <pre><code>{`// Cache-Aside (Lazy Loading) — el patrón más común
async function obtenerUsuario(id: number): Promise<Usuario> {
    const cacheKey = \`usuario:\${id}\`;

    // 1. Intentar leer del caché
    const cached = await redis.get(cacheKey);
    if (cached) return JSON.parse(cached);

    // 2. Si no está, leer de la BD
    const usuario = await db.usuarios.findById(id);
    if (!usuario) throw new Error('Usuario no encontrado');

    // 3. Guardar en caché con TTL
    await redis.set(cacheKey, JSON.stringify(usuario), 'EX', 3600); // 1h

    return usuario;
}

// Invalidar caché al actualizar
async function actualizarUsuario(id: number, datos: Partial<Usuario>) {
    const usuario = await db.usuarios.update(id, datos);
    await redis.del(\`usuario:\${id}\`);  // invalidar
    return usuario;
}

// Write-Through — escribir en caché y BD simultáneamente
async function guardarConfig(userId: number, config: Config) {
    await Promise.all([
        db.configs.upsert(userId, config),
        redis.set(\`config:\${userId}\`, JSON.stringify(config), 'EX', 86400)
    ]);
}

// Cache con stampede protection — evitar la "avalancha de caché"
async function obtenerConLock<T>(clave: string, fn: () => Promise<T>): Promise<T> {
    const cached = await redis.get(clave);
    if (cached) return JSON.parse(cached);

    // Solo un proceso recalcula a la vez
    const lockKey = \`lock:\${clave}\`;
    const locked = await redis.set(lockKey, '1', 'NX', 'EX', 10); // 10s timeout

    if (!locked) {
        // Esperar a que otro proceso termine y leer del caché
        await new Promise(resolve => setTimeout(resolve, 100));
        return obtenerConLock(clave, fn);
    }

    try {
        const datos = await fn();
        await redis.set(clave, JSON.stringify(datos), 'EX', 3600);
        return datos;
    } finally {
        await redis.del(lockKey);
    }
}`}</code></pre>

            {/* ── Paywall ── */}
            <div className="not-prose my-12">
                <div className="relative rounded-2xl border border-amber-500/30 bg-amber-500/5 overflow-hidden">
                    <div className="px-8 py-6 blur-sm pointer-events-none select-none opacity-50">
                        <h3 className="text-xl font-bold mb-3">Rate limiting con sliding window</h3>
                        <pre className="bg-gray-900 rounded-xl p-4 text-sm text-gray-300">
{`async function rateLimiter(userId: string, limite = 100, ventana = 60) {
    const clave = \`ratelimit:\${userId}\`;
    const ahora = Date.now();
    const inicio = ahora - ventana * 1000;

    const [[, peticiones]] = await redis
        .multi()
        .zremrangebyscore(clave, 0, inicio)  // limpiar expiradas
        .zcard(clave)                         // contar actuales
        .zadd(clave, ahora, \`\${ahora}\`)       // añadir esta
        .expire(clave, ventana)
        .exec();

    return peticiones < limite;
}`}
                        </pre>
                    </div>
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-b from-white/80 to-white/95 dark:from-gray-950/80 dark:to-gray-950/95 p-8 text-center">
                        <Lock className="h-10 w-10 text-amber-500 mb-4" />
                        <h3 className="text-2xl font-extrabold mb-2">Contenido Premium</h3>
                        <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-sm">
                            6 módulos más — sesiones, pub/sub, streams, queues y clustering — disponibles con el acceso Beta.
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
