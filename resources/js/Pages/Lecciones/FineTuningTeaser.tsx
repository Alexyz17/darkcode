import LessonLayout from '@/layouts/LessonLayout';
import { Head, Link } from '@inertiajs/react';
import { Lock, CheckCircle2 } from 'lucide-react';

const modules = [
    { id: '/lecciones/fine-tuning', title: '¿Qué es el fine-tuning?', free: true },
    { id: '#', title: 'Preparar el dataset', free: false },
    { id: '#', title: 'Fine-tuning con OpenAI', free: false },
    { id: '#', title: 'Fine-tuning local con Ollama', free: false },
    { id: '#', title: 'Evaluación del modelo', free: false },
    { id: '#', title: 'Despliegue del modelo propio', free: false },
    { id: '#', title: 'Casos de uso reales', free: false },
];

const betaFeatures = [
    'Cuándo tiene sentido el fine-tuning vs prompting',
    'Formato JSONL para datasets de entrenamiento',
    'Fine-tuning con GPT-4o mini (OpenAI API)',
    'Fine-tuning local: Llama 3 con Ollama y LoRA',
    'Métricas de evaluación: perplexidad, BLEU, ROUGE',
    'Desplegar tu modelo en un endpoint propio',
    'Caso real: clasificador de tickets de soporte',
    'Caso real: generador de código al estilo de tu empresa',
];

export default function FineTuningTeaser() {
    return (
        <LessonLayout
            title="Fine-tuning de modelos"
            description="Ajusta modelos de lenguaje con tus propios datos para especializarlos en tu caso de uso."
            duration="6h 20min"
            lessons={30}
            level="Avanzado"
            premium={true}
            modules={modules}
            activeModule="/lecciones/fine-tuning"
            category="IA & Automatización"
        >
            <Head>
                <title>Fine-tuning de modelos — DarkCode Premium</title>
                <meta name="description" content="Aprende a hacer fine-tuning de LLMs con tus propios datos: datasets JSONL, GPT-4o mini, Llama 3 con LoRA." />
            </Head>

            <h1>Fine-tuning de modelos</h1>

            <blockquote>
                El prompting tiene un límite. Cuando necesitas que el modelo adopte un <strong>estilo muy específico</strong>, sepa sobre tu dominio sin context window ilimitado, o responda de forma consistente sin instrucciones largas — el fine-tuning es la respuesta.
            </blockquote>

            <h2>¿Qué es el fine-tuning y cuándo usarlo?</h2>
            <p>
                Fine-tuning es el proceso de continuar el entrenamiento de un modelo preentrenado con un dataset propio, para que aprenda un comportamiento, estilo o dominio específico. Es distinto de RAG: RAG le da información en el contexto, fine-tuning modifica los pesos del modelo.
            </p>

            <pre><code>{`¿Cuándo usar cada enfoque?

Prompting (system prompt):
✅ Comportamiento general, tono, idioma
✅ Instrucciones simples que caben en el contexto
✅ Prototipado rápido
❌ Conocimiento muy específico de dominio
❌ Formato de salida muy preciso y consistente

RAG (Retrieval Augmented Generation):
✅ Tu documentación cambia frecuentemente
✅ Necesitas citar fuentes
✅ Gran volumen de datos de referencia
❌ Lento en producción (requiere búsqueda vectorial)

Fine-tuning:
✅ Estilo de escritura muy específico
✅ Formato de salida predecible y consistente
✅ Clasificación con muchas categorías
✅ Dominio muy técnico y estable (código interno, jerga)
❌ Datos cambian frecuentemente
❌ Necesitas explicaciones o razonamiento complejo`}</code></pre>

            <h3>Formato del dataset — JSONL</h3>
            <pre><code>{`# Cada línea es un ejemplo de entrenamiento
# Formato de mensajes (igual que la API de chat)

{"messages": [
    {"role": "system", "content": "Eres el asistente de soporte de DarkCode. Respondes en español, de forma concisa."},
    {"role": "user", "content": "¿Cuánto cuesta el acceso premium?"},
    {"role": "assistant", "content": "El acceso Beta de DarkCode cuesta 19€ de por vida, con acceso a los 12 cursos y todas las actualizaciones futuras. Sin renovaciones ni suscripción mensual."}
]}
{"messages": [
    {"role": "system", "content": "Eres el asistente de soporte de DarkCode. Respondes en español, de forma concisa."},
    {"role": "user", "content": "¿Qué cursos incluye el acceso?"},
    {"role": "assistant", "content": "El acceso Beta incluye los 12 cursos: Linux Esencial, Comandos Linux, Shell Scripting, Laravel, Seguridad Web, Eloquent avanzado, APIs REST, Docker, Máquinas Virtuales, n8n, IA Programación y Fine-tuning."}
]}

# Recomendaciones:
# - Mínimo 50 ejemplos (idealmente 200-500+)
# - Ejemplos variados que cubran todos los casos
# - Consistencia en el estilo de respuesta
# - Sin ejemplos incorrectos o contradictorios`}</code></pre>

            {/* ── Paywall ── */}
            <div className="not-prose my-12">
                <div className="relative rounded-2xl border border-amber-500/30 bg-amber-500/5 overflow-hidden">
                    <div className="px-8 py-6 blur-sm pointer-events-none select-none opacity-50">
                        <h3 className="text-xl font-bold mb-3">Fine-tuning con OpenAI API</h3>
                        <pre className="bg-gray-900 rounded-xl p-4 text-sm text-gray-300">
{`from openai import OpenAI
client = OpenAI()

# 1. Subir dataset
file = client.files.create(
    file=open("dataset.jsonl", "rb"),
    purpose="fine-tune"
)

# 2. Lanzar fine-tuning
job = client.fine_tuning.jobs.create(
    training_file=file.id,
    model="gpt-4o-mini-2024-07-18",
    hyperparameters={"n_epochs": 3}
)

# 3. Usar el modelo entrenado
# model="ft:gpt-4o-mini:org:custom:abc123"`}
                        </pre>
                    </div>
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-b from-white/80 to-white/95 dark:from-gray-950/80 dark:to-gray-950/95 p-8 text-center">
                        <Lock className="h-10 w-10 text-amber-500 mb-4" />
                        <h3 className="text-2xl font-extrabold mb-2">Contenido Premium</h3>
                        <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-sm">
                            El resto del curso — 29 lecciones más — está disponible con el acceso Beta de DarkCode.
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
                        <p className="text-xs text-gray-400 mt-3">Pago único · Acceso a los 12 cursos · Sin renovaciones</p>
                    </div>
                </div>
            </div>
        </LessonLayout>
    );
}
