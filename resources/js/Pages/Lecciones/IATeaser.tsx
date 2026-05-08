import LessonLayout from '@/layouts/LessonLayout';
import { Head, Link } from '@inertiajs/react';
import { Lock, CheckCircle2 } from 'lucide-react';

const modules = [
    { id: '/lecciones/ia-programacion', title: 'IA en el desarrollo moderno', free: true },
    { id: '#', title: 'Claude API desde cero', free: false },
    { id: '#', title: 'Prompts y contexto', free: false },
    { id: '#', title: 'Tool use y function calling', free: false },
    { id: '#', title: 'Agentes autónomos', free: false },
    { id: '#', title: 'RAG con embeddings', free: false },
    { id: '#', title: 'IA en Laravel', free: false },
    { id: '#', title: 'Proyectos reales con IA', free: false },
];

const betaFeatures = [
    'Claude API: mensajes, streaming y herramientas',
    'Diseño de prompts de sistema efectivos',
    'Tool use para conectar IA con tus APIs',
    'Agentes autónomos con memoria y planificación',
    'RAG: respuestas sobre tu propia documentación',
    'Laravel AI SDK — integración nativa',
    'Buenas prácticas: coste, latencia y seguridad',
    '3 proyectos completos con IA generativa',
];

export default function IATeaser() {
    return (
        <LessonLayout
            title="IA aplicada a la programación"
            description="Aprende a integrar IA generativa en tus proyectos: Claude API, agentes, RAG y herramientas reales."
            duration="4h 20min"
            lessons={22}
            level="Avanzado"
            premium={true}
            modules={modules}
            activeModule="/lecciones/ia-programacion"
            category="IA & Automatización"
        >
            <Head>
                <title>IA aplicada a la programación — DarkCode Premium</title>
                <meta name="description" content="Integra IA generativa en tus apps con Claude API, agentes autónomos y RAG. Curso premium DarkCode 2026." />
            </Head>

            <h1>IA aplicada a la programación</h1>

            <blockquote>
                En 2026, los desarrolladores que saben integrar IA tienen una ventaja competitiva enorme. No se trata de usar ChatGPT para escribir código — se trata de <strong>construir productos con IA como capa fundamental</strong>: asistentes, agentes autónomos, búsqueda semántica y automatizaciones inteligentes.
            </blockquote>

            {/* ── Módulo gratuito ── */}
            <h2>IA en el desarrollo moderno — panorama 2026</h2>

            <p>
                Los modelos de lenguaje (LLMs) han madurado hasta el punto de ser componentes fiables en sistemas de producción. Esta lección te da el mapa completo: qué es posible, qué herramientas existen y cómo empezar.
            </p>

            <h3>El ecosistema actual (2026)</h3>
            <pre><code>{`Modelos principales:
├── Anthropic Claude 4
│   ├── claude-opus-4      # Máxima capacidad
│   ├── claude-sonnet-4-6  # Balance rendimiento/coste
│   └── claude-haiku-4-5   # Más rápido y barato
├── OpenAI GPT-4o / o3
├── Google Gemini 2.5 Pro
└── Modelos locales (Ollama)
    ├── Llama 3.3 70B
    ├── Mistral 7B
    └── Phi-4

Capacidades clave:
├── Generación de texto y código
├── Análisis de imágenes (multimodal)
├── Tool use / Function calling
├── Extended thinking (razonamiento largo)
└── Computer use (control del ordenador)`}</code></pre>

            <h3>Casos de uso reales</h3>
            <ul>
                <li><strong>Asistente de soporte</strong> — responde preguntas de usuarios basándose en tu documentación (RAG).</li>
                <li><strong>Generador de contenido</strong> — artículos, descripciones de producto, emails personalizados.</li>
                <li><strong>Agente de código</strong> — revisa PRs, genera tests, detecta bugs automáticamente.</li>
                <li><strong>Extractor de datos</strong> — procesa facturas, contratos o emails y extrae campos estructurados.</li>
                <li><strong>Chatbot con memoria</strong> — asistente que recuerda el contexto de la conversación y el usuario.</li>
                <li><strong>Pipeline de clasificación</strong> — categoriza tickets de soporte, comentarios o transacciones.</li>
            </ul>

            <h3>Primeros pasos — llamada básica a Claude API</h3>
            <pre><code>{`<?php
// Instalar: composer require anthropics/anthropic-sdk-php

use Anthropic\Anthropic;

$client = Anthropic::client(env('ANTHROPIC_API_KEY'));

$response = $client->messages()->create([
    'model'      => 'claude-sonnet-4-6',
    'max_tokens' => 1024,
    'messages'   => [
        [
            'role'    => 'user',
            'content' => '¿Cuál es la diferencia entre Docker y una VM?',
        ],
    ],
]);

echo $response->content[0]->text;`}</code></pre>

            <pre><code>{`// TypeScript / Node.js
// npm install @anthropic-ai/sdk

import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const message = await client.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 1024,
    messages: [{ role: 'user', content: 'Explica qué es un webhook' }],
});

console.log(message.content[0].text);`}</code></pre>

            <h3>Arquitecturas de aplicaciones con IA</h3>
            <pre><code>{`1. Prompt simple
   Usuario → Prompt → LLM → Respuesta
   Casos: generación, clasificación, resumen

2. RAG (Retrieval-Augmented Generation)
   Consulta → Búsqueda vectorial → Contexto + Prompt → LLM → Respuesta
   Casos: Q&A sobre documentación propia

3. Tool use / Function calling
   LLM decide qué herramientas llamar
   → buscar en BD, llamar API, calcular...
   Casos: agentes que interactúan con sistemas reales

4. Agente autónomo
   Objetivo → Plan → Loop(acción, observación, decisión) → Resultado
   Casos: tareas multi-paso, investigación, automatización`}</code></pre>

            <h3>Costes orientativos (Claude, mayo 2026)</h3>
            <pre><code>{`Modelo                  Input           Output
claude-haiku-4-5        $0.80/MTok      $4/MTok
claude-sonnet-4-6       $3/MTok         $15/MTok
claude-opus-4           $15/MTok        $75/MTok

Ejemplo real (Sonnet):
- Procesar 1000 tickets de soporte (~500 tokens c/u)
- Coste estimado: ~1.50$ de input + ~7.50$ output = ~9$ total
- Con caché de prompts: hasta 90% de ahorro en prompts repetidos`}</code></pre>

            {/* ── Paywall ── */}
            <div className="not-prose my-12">
                <div className="relative rounded-2xl border border-amber-500/30 bg-amber-500/5 overflow-hidden">
                    <div className="px-8 py-6 blur-sm pointer-events-none select-none opacity-50">
                        <h3 className="text-xl font-bold mb-3">Tool use — conectar IA con tus sistemas</h3>
                        <pre className="bg-gray-900 rounded-xl p-4 text-sm text-gray-300">
{`const tools = [{
    name: 'buscar_usuario',
    description: 'Busca un usuario por email en la base de datos',
    input_schema: {
        type: 'object',
        properties: {
            email: { type: 'string', description: 'Email del usuario' }
        },
        required: ['email']
    }
}];

const response = await client.messages.create({
    model: 'claude-sonnet-4-6',
    tools,
    messages: [{ role: 'user', content: '¿Existe alex@ejemplo.com?' }]
});`}
                        </pre>
                    </div>

                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-b from-white/80 to-white/95 dark:from-gray-950/80 dark:to-gray-950/95 p-8 text-center">
                        <Lock className="h-10 w-10 text-amber-500 mb-4" />
                        <h3 className="text-2xl font-extrabold mb-2">Contenido Premium</h3>
                        <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-sm">
                            El resto del curso — 21 lecciones más — está disponible con el acceso Beta de DarkCode.
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
