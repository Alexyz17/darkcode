import LessonLayout from '@/layouts/LessonLayout';
import { Head, Link } from '@inertiajs/react';
import { Lock, CheckCircle2 } from 'lucide-react';

const modules = [
    { id: '/lecciones/n8n', title: '¿Qué es n8n?', free: true },
    { id: '#', title: 'Interfaz y conceptos', free: false },
    { id: '#', title: 'Triggers y webhooks', free: false },
    { id: '#', title: 'Integraciones HTTP/API', free: false },
    { id: '#', title: 'Base de datos y archivos', free: false },
    { id: '#', title: 'Agentes de IA', free: false },
    { id: '#', title: 'n8n Self-hosted', free: false },
    { id: '#', title: 'Flujos de producción', free: false },
];

const betaFeatures = [
    'Interfaz visual: nodos, conexiones y flujos',
    'Webhooks para escuchar eventos externos',
    'Integraciones: Gmail, Slack, GitHub, Notion y más',
    'HTTP Request node para cualquier API REST',
    'AI Agent node con Claude y GPT-4',
    'MCP Protocol — conectar n8n con herramientas IA',
    'Self-hosted en VPS con Docker',
    'Flujos reales: alertas, informes automáticos',
];

export default function N8nTeaser() {
    return (
        <LessonLayout
            title="Automatización con n8n"
            description="Automatiza flujos de trabajo conectando apps, APIs e IA con n8n — sin apenas código."
            duration="3h 40min"
            lessons={20}
            level="Intermedio"
            premium={true}
            modules={modules}
            activeModule="/lecciones/n8n"
            category="Automatización"
        >
            <Head>
                <title>Automatización con n8n — DarkCode Premium</title>
                <meta name="description" content="Aprende n8n 2026: automatiza flujos con 400+ integraciones, agentes de IA y MCP Protocol. Curso premium DarkCode." />
            </Head>

            <h1>Automatización con n8n</h1>

            <blockquote>
                n8n es la alternativa open-source a Zapier y Make — pero más potente, más barata y con <strong>agentes de IA integrados</strong>. En 2026, n8n 1.x trae el AI Agent node nativo, soporte para MCP Protocol y mejoras de rendimiento de hasta el 80% en flujos complejos.
            </blockquote>

            {/* ── Módulo gratuito ── */}
            <h2>¿Qué es n8n y por qué usarlo?</h2>

            <p>
                n8n (pronunciado "n-eight-n" o "nodemation") es una plataforma de <strong>automatización de flujos de trabajo</strong> visual. Conectas nodos — cada uno representa una app, una API o una operación — y defines qué pasa con los datos entre ellos.
            </p>

            <h3>n8n vs la competencia</h3>
            <pre><code>{`┌──────────────────┬──────────┬────────┬───────────┐
│                  │  n8n     │ Zapier │   Make    │
├──────────────────┼──────────┼────────┼───────────┤
│ Open Source      │  ✅      │  ❌    │    ❌     │
│ Self-hosted      │  ✅      │  ❌    │    ❌     │
│ Código JS/Python │  ✅      │  ❌    │  parcial  │
│ AI Agent nativo  │  ✅      │  ❌    │    ❌     │
│ MCP Protocol     │  ✅      │  ❌    │    ❌     │
│ Integraciones    │  400+    │  6000+ │   1500+   │
│ Precio base      │  gratis* │  20$/m │   9$/m    │
└──────────────────┴──────────┴────────┴───────────┘
* Self-hosted gratis, cloud desde 20$/mes`}</code></pre>

            <h3>Instalación rápida con Docker</h3>
            <pre><code>{`# Levantar n8n en segundos
docker run -d \
  --name n8n \
  -p 5678:5678 \
  -v n8n_data:/home/node/.n8n \
  -e N8N_BASIC_AUTH_ACTIVE=true \
  -e N8N_BASIC_AUTH_USER=admin \
  -e N8N_BASIC_AUTH_PASSWORD=secreto123 \
  n8nio/n8n

# Acceder en: http://localhost:5678`}</code></pre>

            <h3>Conceptos clave</h3>
            <ul>
                <li><strong>Workflow</strong> — el flujo completo: un conjunto de nodos conectados.</li>
                <li><strong>Nodo</strong> — cada bloque del flujo. Puede ser un trigger, una app o una operación.</li>
                <li><strong>Trigger</strong> — el nodo que inicia el flujo (webhook, cron, evento de app).</li>
                <li><strong>Item</strong> — cada unidad de dato que fluye entre nodos (como un objeto JSON).</li>
                <li><strong>Expresiones</strong> — código JavaScript inline para transformar datos: <code>{"{{ $json.nombre }}"}</code>.</li>
            </ul>

            <h3>Tu primer workflow — Webhook → Slack</h3>
            <pre><code>{`Flujo: POST /webhook → filtrar datos → notificar Slack

1. Añadir nodo "Webhook" (trigger)
   - Method: POST
   - Path: /nueva-venta
   - Copiar URL: https://tu-n8n.com/webhook/nueva-venta

2. Añadir nodo "IF" (condicional)
   - Condición: {{ $json.importe }} > 100
   - Si TRUE → continuar

3. Añadir nodo "Slack"
   - Operation: Send Message
   - Channel: #ventas
   - Text: Nueva venta de {{ $json.cliente }}: {{ $json.importe }}€

4. Activar workflow → probar con curl:
   curl -X POST https://tu-n8n.com/webhook/nueva-venta \
        -H "Content-Type: application/json" \
        -d '{"cliente":"Alex","importe":150}'`}</code></pre>

            <h3>n8n en 2026 — Novedades</h3>
            <ul>
                <li><strong>AI Agent node</strong> — agentes autónomos que razonan, llaman herramientas y toman decisiones. Compatible con Claude, GPT-4o y modelos locales via Ollama.</li>
                <li><strong>MCP Protocol</strong> — conecta n8n como cliente MCP para usar herramientas de IA de terceros directamente en tus flujos.</li>
                <li><strong>Sub-workflows</strong> mejorados — divide flujos complejos en módulos reutilizables.</li>
                <li><strong>Mejor rendimiento</strong> — mejoras de carga del 30-80% en workflows con muchos nodos.</li>
                <li><strong>400+ integraciones</strong> — GitHub, GitLab, Linear, Notion, Airtable, MySQL, PostgreSQL, S3, y mucho más.</li>
            </ul>

            {/* ── Paywall ── */}
            <div className="not-prose my-12">
                <div className="relative rounded-2xl border border-amber-500/30 bg-amber-500/5 overflow-hidden">
                    <div className="px-8 py-6 blur-sm pointer-events-none select-none opacity-50">
                        <h3 className="text-xl font-bold mb-3">Nodos y triggers avanzados</h3>
                        <pre className="bg-gray-900 rounded-xl p-4 text-sm text-gray-300">
{`// Expresión para transformar datos entre nodos
const items = $input.all();
return items.map(item => ({
  json: {
    nombre: item.json.nombre.toUpperCase(),
    fecha: new Date().toISOString(),
    procesado: true,
  }
}));`}
                        </pre>
                    </div>

                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-b from-white/80 to-white/95 dark:from-gray-950/80 dark:to-gray-950/95 p-8 text-center">
                        <Lock className="h-10 w-10 text-amber-500 mb-4" />
                        <h3 className="text-2xl font-extrabold mb-2">Contenido Premium</h3>
                        <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-sm">
                            El resto del curso — 19 lecciones más — está disponible con el acceso Beta de DarkCode.
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
