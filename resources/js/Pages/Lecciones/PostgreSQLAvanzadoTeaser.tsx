import LessonLayout from '@/layouts/LessonLayout';
import { Head, Link } from '@inertiajs/react';
import { Lock, CheckCircle2 } from 'lucide-react';

const modules = [
    { id: '/lecciones/postgresql-avanzado', title: 'EXPLAIN ANALYZE — leer el plan de ejecución', free: true },
    { id: '/lecciones/postgresql-avanzado#indices', title: 'Índices: tipos y estrategias', free: true },
    { id: '#', title: 'CTEs y consultas recursivas', free: false },
    { id: '#', title: 'Window functions', free: false },
    { id: '#', title: 'Particionado de tablas', free: false },
    { id: '#', title: 'JSON y JSONB en PostgreSQL', free: false },
    { id: '#', title: 'pgvector — búsqueda semántica', free: false },
    { id: '#', title: 'Mantenimiento y monitorización', free: false },
];

const betaFeatures = [
    'CTEs (WITH) para consultas complejas y legibles',
    'Consultas recursivas para estructuras de árbol',
    'Window functions: ROW_NUMBER, RANK, LAG, LEAD, PARTITION BY',
    'Particionado por rango, lista y hash para tablas grandes',
    'JSONB: índices GIN, operadores y funciones',
    'pgvector: embeddings, búsqueda KNN y cosine similarity',
    'VACUUM, ANALYZE y pg_stat_statements para monitorizar',
    'Replicación streaming y conexiones con PgBouncer',
];

export default function PostgreSQLAvanzadoTeaser() {
    return (
        <LessonLayout
            title="PostgreSQL avanzado"
            description="Índices, EXPLAIN ANALYZE, CTEs, window functions, particionado y pgvector para búsqueda semántica."
            duration="4h 30min"
            lessons={22}
            level="Avanzado"
            premium={true}
            modules={modules}
            activeModule="/lecciones/postgresql-avanzado"
            category="Bases de datos"
        >
            <Head>
                <title>PostgreSQL avanzado — DarkCode Premium</title>
                <meta name="description" content="PostgreSQL avanzado: índices, EXPLAIN ANALYZE, window functions, particionado y pgvector. Acceso Premium DarkCode." />
            </Head>

            <h1>PostgreSQL avanzado</h1>

            <blockquote>
                La diferencia entre una consulta que tarda 0.5ms y una que tarda 30 segundos suele ser un índice que falta o un plan de ejecución mal elegido. PostgreSQL es el RDBMS más avanzado del mundo open source — pero hay que saber usarlo bien.
            </blockquote>

            {/* ── 1. EXPLAIN ANALYZE ── */}
            <h2 id="explain">EXPLAIN ANALYZE — leer el plan de ejecución</h2>
            <p>
                Antes de optimizar, mide. <code>EXPLAIN ANALYZE</code> ejecuta la consulta y muestra exactamente cómo la ejecutó PostgreSQL: qué índices usó, cuántas filas procesó y dónde se fue el tiempo.
            </p>

            <pre><code>{`-- La consulta que queremos optimizar
EXPLAIN (ANALYZE, BUFFERS, FORMAT TEXT)
SELECT u.nombre, u.email, COUNT(p.id) AS pedidos, SUM(p.total) AS total_gastado
FROM usuarios u
LEFT JOIN pedidos p ON p.usuario_id = u.id AND p.estado = 'completado'
WHERE u.activo = true
  AND u.creado_en >= '2025-01-01'
GROUP BY u.id
ORDER BY total_gastado DESC
LIMIT 20;

-- Resultado (simplificado):
-- Limit  (cost=1234.56..1234.61 rows=20) (actual time=89.234..89.241 rows=20)
--   -> Sort  (actual time=89.232..89.234 rows=20)
--       -> HashAggregate  (actual rows=4532)
--           -> Hash Left Join  (actual rows=12543)
--               ->  Seq Scan on usuarios  (actual rows=4532)   ← ⚠️ Seq Scan!
--                   Filter: (activo AND creado_en >= '2025-01-01')
--                   Rows Removed by Filter: 48321
--               -> Hash  (actual rows=12543)
--                   -> Seq Scan on pedidos
-- Planning Time: 2.345 ms
-- Execution Time: 89.567 ms

-- Leer el plan:
-- "Seq Scan" = escanea TODA la tabla → necesitamos un índice
-- "actual rows" >> "rows" → estimación mala → ANALYZE desactualizado
-- "Rows Removed by Filter" muy alto → el índice debería filtrar antes

-- Tras añadir índice:
CREATE INDEX CONCURRENTLY idx_usuarios_activo_creado
    ON usuarios (activo, creado_en) WHERE activo = true;

-- Ahora el plan usará:
-- Index Scan using idx_usuarios_activo_creado on usuarios
-- Execution Time: 3.421 ms  ← 96% más rápido`}</code></pre>

            {/* ── 2. Índices ── */}
            <h2 id="indices">Índices — tipos y estrategias</h2>
            <pre><code>{`-- B-Tree (por defecto) — para =, <, >, BETWEEN, IN, ORDER BY
CREATE INDEX idx_pedidos_usuario ON pedidos (usuario_id);
CREATE INDEX idx_pedidos_fecha ON pedidos (creado_en DESC);
-- Índice compuesto — el orden importa
CREATE INDEX idx_pedidos_usuario_estado ON pedidos (usuario_id, estado);
-- Útil para: WHERE usuario_id = ? AND estado = ?
-- También para: WHERE usuario_id = ?  (usa el primero)
-- No útil para: WHERE estado = ?       (no puede usar el índice)

-- Partial index — solo indexar filas relevantes
CREATE INDEX idx_pedidos_pendientes ON pedidos (creado_en)
    WHERE estado = 'pendiente';  -- solo 5% de filas, índice 20x más pequeño

-- Index-only scan — incluir columnas frecuentes en el índice
CREATE INDEX idx_usuarios_email_nombre ON usuarios (email)
    INCLUDE (nombre, activo);
-- La query: SELECT nombre FROM usuarios WHERE email = ?
-- No necesita tocar la tabla principal — todo está en el índice

-- Hash index — exactamente para =, no soporta rangos
CREATE INDEX idx_sesiones_token ON sesiones USING HASH (token);

-- GIN index — para arrays, JSONB y búsqueda de texto
CREATE INDEX idx_productos_tags ON productos USING GIN (tags);
CREATE INDEX idx_config_datos ON config USING GIN (datos jsonb_path_ops);

-- Índice único parcial — regla de negocio en la BD
CREATE UNIQUE INDEX idx_email_activo ON usuarios (email)
    WHERE activo = true;  -- solo un email activo, pueden existir emails de borrados

-- Ver uso de índices
SELECT
    schemaname, tablename, indexname,
    idx_scan AS veces_usado,
    pg_size_pretty(pg_relation_size(indexrelid)) AS tamaño
FROM pg_stat_user_indexes
ORDER BY idx_scan DESC;`}</code></pre>

            {/* ── Paywall ── */}
            <div className="not-prose my-12">
                <div className="relative rounded-2xl border border-amber-500/30 bg-amber-500/5 overflow-hidden">
                    <div className="px-8 py-6 blur-sm pointer-events-none select-none opacity-50">
                        <h3 className="text-xl font-bold mb-3">Window functions — analytics sin subconsultas</h3>
                        <pre className="bg-gray-900 rounded-xl p-4 text-sm text-gray-300">
{`-- Top 3 productos por categoría
SELECT nombre, categoria, ventas,
    RANK() OVER (PARTITION BY categoria ORDER BY ventas DESC) AS posicion,
    ventas - LAG(ventas) OVER (PARTITION BY categoria ORDER BY mes) AS crecimiento
FROM ventas_mensuales;`}
                        </pre>
                    </div>
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-b from-white/80 to-white/95 dark:from-gray-950/80 dark:to-gray-950/95 p-8 text-center">
                        <Lock className="h-10 w-10 text-amber-500 mb-4" />
                        <h3 className="text-2xl font-extrabold mb-2">Contenido Premium</h3>
                        <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-sm">
                            6 módulos más — CTEs, window functions, particionado, JSONB y pgvector — disponibles con el acceso Beta.
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
