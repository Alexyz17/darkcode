import LessonLayout from '@/layouts/LessonLayout';
import { Head, Link } from '@inertiajs/react';
import { Lock, CheckCircle2 } from 'lucide-react';

const modules = [
    { id: '/lecciones/microservicios-diseno', title: 'Cuándo usar microservicios', free: true },
    { id: '/lecciones/microservicios-diseno#patrones', title: 'API Gateway y comunicación', free: true },
    { id: '#', title: 'Domain-Driven Design (DDD)', free: false },
    { id: '#', title: 'Comunicación asíncrona y eventos', free: false },
    { id: '#', title: 'Event Sourcing y CQRS', free: false },
    { id: '#', title: 'Service mesh y observabilidad', free: false },
    { id: '#', title: 'Testing en microservicios', free: false },
    { id: '#', title: 'Migración de monolito a microservicios', free: false },
];

const betaFeatures = [
    'Bounded Contexts y aggregate design con DDD',
    'Mensajería asíncrona con RabbitMQ y Kafka',
    'Saga pattern para transacciones distribuidas',
    'Event Sourcing: proyecciones y snapshots',
    'CQRS: separar lecturas y escrituras',
    'Service mesh con Istio: mTLS, circuit breaker y observabilidad',
    'Contract testing con Pact para APIs entre servicios',
    'Strangler Fig pattern — migración incremental desde el monolito',
];

export default function MicroserviciosDisenoTeaser() {
    return (
        <LessonLayout
            title="Diseño de Microservicios"
            description="Patrones de arquitectura, API Gateway, comunicación asíncrona, Event Sourcing y CQRS."
            duration="5h 00min"
            lessons={24}
            level="Avanzado"
            premium={true}
            modules={modules}
            activeModule="/lecciones/microservicios-diseno"
            category="Arquitectura"
        >
            <Head>
                <title>Diseño de Microservicios — DarkCode Premium</title>
                <meta name="description" content="Microservicios: patrones, API Gateway, comunicación asíncrona, CQRS y Event Sourcing. Acceso Premium DarkCode." />
            </Head>

            <h1>Diseño de Microservicios</h1>

            <blockquote>
                Los microservicios no son una bala de plata. Mal implementados, son un monolito distribuido con todos los problemas de ambos mundos. Bien implementados, permiten escalar equipos y servicios de forma independiente. Este curso te enseña cuándo y cómo hacerlo bien.
            </blockquote>

            <h2 id="cuando">Cuándo usar microservicios</h2>
            <p>
                La respuesta honesta: la mayoría de proyectos no necesitan microservicios. Un monolito bien diseñado es más fácil de desarrollar, depurar y operar. Los microservicios tienen sentido cuando:
            </p>
            <ul>
                <li>Tienes <strong>múltiples equipos</strong> que necesitan desplegar de forma independiente</li>
                <li>Diferentes partes del sistema tienen <strong>requisitos de escalado muy distintos</strong></li>
                <li>Necesitas usar <strong>tecnologías distintas</strong> para diferentes componentes</li>
                <li>Tu monolito ya es tan grande que los <strong>tiempos de build/deploy son inasumibles</strong></li>
            </ul>

            <blockquote>
                La regla de Martin Fowler: "Empieza con el monolito. Cuando duela, extrae el microservicio." Construir microservicios desde el día 1 es un anti-patrón llamado "Microservices First".
            </blockquote>

            <h3>Los 8 errores de los sistemas distribuidos</h3>
            <pre><code>{`// Los 8 fallacies of distributed computing (Peter Deutsch, 1994):
// 1. La red es fiable           → timeouts, retries, circuit breakers
// 2. La latencia es cero        → medir, cachear, async donde sea posible
// 3. El ancho de banda es infinito → payloads pequeños, compresión
// 4. La red es segura           → mTLS entre servicios, zero-trust
// 5. La topología no cambia     → service discovery dinámico
// 6. Hay un solo administrador  → equipos autónomos por servicio
// 7. El coste de transporte es cero → protocolos eficientes (gRPC > REST para interno)
// 8. La red es homogénea        → abstracción de protocolos

// Implicaciones prácticas:
// - Toda llamada a otro servicio puede fallar → siempre maneja el error
// - No asumas consistencia fuerte entre servicios → eventual consistency
// - Las transacciones ACID no existen entre servicios → Saga pattern`}</code></pre>

            <h2 id="patrones">API Gateway y patrones de comunicación</h2>
            <pre><code>{`# Arquitectura con API Gateway

# ┌─────────────┐
# │   Cliente   │ (browser, mobile, third-party)
# └──────┬──────┘
#        │ HTTPS
# ┌──────▼──────┐
# │ API Gateway │ ← punto de entrada único
# │   (Kong /   │   - autenticación JWT
# │  AWS APIGW) │   - rate limiting
# └──┬───┬───┬──┘   - routing
#    │   │   │       - logging centralizado
#    │   │   │
# ┌──▼─┐ ┌─▼──┐ ┌─▼──────────┐
# │Usr │ │Pay │ │  Catalog   │  Microservicios
# │svc │ │svc │ │    svc     │
# └──┬─┘ └─┬──┘ └──────┬─────┘
#    │      │           │
# ┌──▼─┐ ┌──▼─┐ ┌───────▼───┐
# │ DB │ │ DB │ │    DB     │  Cada servicio tiene SU BD
# └────┘ └────┘ └───────────┘

# Comunicación SÍNCRONA (REST/gRPC) — cuando necesitas la respuesta ahora
# POST /api/orders → el Order Service llama síncronamente al:
#   - User Service: verificar que el usuario existe y tiene saldo
#   - Catalog Service: verificar stock
#   - Payment Service: cobrar
# Problema: si alguno falla, ¿qué hacemos con los que ya procesaron?

# Comunicación ASÍNCRONA (eventos) — más resiliente
# POST /api/orders → Order Service publica evento "order.created"
#   - Payment Service consume "order.created" → cobra → publica "payment.completed"
#   - Catalog Service consume "order.created" → reserva stock
#   - Notification Service consume "payment.completed" → envía email
# Ventaja: cada servicio funciona aunque otros estén caídos`}</code></pre>

            {/* ── Paywall ── */}
            <div className="not-prose my-12">
                <div className="relative rounded-2xl border border-amber-500/30 bg-amber-500/5 overflow-hidden">
                    <div className="px-8 py-6 blur-sm pointer-events-none select-none opacity-50">
                        <h3 className="text-xl font-bold mb-3">Saga Pattern — transacciones distribuidas</h3>
                        <pre className="bg-gray-900 rounded-xl p-4 text-sm text-gray-300">
{`// Cada paso tiene una transacción compensatoria en caso de fallo
const sagaOrden = [
    { ejecutar: reservarStock,     compensar: liberarStock },
    { ejecutar: cobrarPago,        compensar: reembolsarPago },
    { ejecutar: confirmarOrden,    compensar: cancelarOrden },
    { ejecutar: notificarUsuario,  compensar: null },
];`}
                        </pre>
                    </div>
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-b from-white/80 to-white/95 dark:from-gray-950/80 dark:to-gray-950/95 p-8 text-center">
                        <Lock className="h-10 w-10 text-amber-500 mb-4" />
                        <h3 className="text-2xl font-extrabold mb-2">Contenido Premium</h3>
                        <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-sm">
                            6 módulos más — DDD, Kafka, Event Sourcing, CQRS y service mesh — con el acceso Beta.
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
