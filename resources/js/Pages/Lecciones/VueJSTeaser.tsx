import LessonLayout from '@/layouts/LessonLayout';
import { Head, Link } from '@inertiajs/react';
import { Lock, CheckCircle2 } from 'lucide-react';

const modules = [
    { id: '/lecciones/vuejs', title: 'Composition API — fundamentos', free: true },
    { id: '/lecciones/vuejs#composables', title: 'Composables reutilizables', free: true },
    { id: '#', title: 'Pinia — gestión de estado', free: false },
    { id: '#', title: 'Vue Router 4', free: false },
    { id: '#', title: 'Nuxt 3 — SSR y SSG', free: false },
    { id: '#', title: 'Componentes avanzados', free: false },
    { id: '#', title: 'Testing con Vitest y Vue Test Utils', free: false },
    { id: '#', title: 'Rendimiento y optimización', free: false },
];

const betaFeatures = [
    'Pinia: stores, getters, actions y persistencia con localStorage',
    'Vue Router 4: guards, nested routes y lazy loading',
    'Nuxt 3: file-based routing, server routes y middleware',
    'useAsyncData y useFetch para fetching con SSR',
    'Provide/Inject y Teleport para casos avanzados',
    'defineModel y v-model bidireccional en componentes',
    'Testing de componentes con @vue/test-utils',
    'Bundle analysis y tree shaking con Vite',
];

export default function VueJSTeaser() {
    return (
        <LessonLayout
            title="Vue.js 3 — Composition API"
            description="Composition API, Pinia, Vue Router y Nuxt 3. Vue moderno para proyectos profesionales."
            duration="4h 30min"
            lessons={22}
            level="Intermedio"
            premium={true}
            modules={modules}
            activeModule="/lecciones/vuejs"
            category="Frontend"
        >
            <Head>
                <title>Vue.js 3 Composition API — DarkCode Premium</title>
                <meta name="description" content="Vue 3 con Composition API, Pinia, Vue Router y Nuxt 3. Acceso Premium DarkCode." />
            </Head>

            <h1>Vue.js 3 — Composition API</h1>

            <blockquote>
                Vue 3 con la Composition API es un salto de calidad enorme respecto a Vue 2. La lógica se organiza por funcionalidad (no por opciones), los composables reemplazan los mixins problemáticos y TypeScript encaja de forma natural.
            </blockquote>

            <h2 id="composition">Composition API — fundamentos</h2>
            <pre><code>{`<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue';

// ref — valores reactivos primitivos
const contador = ref(0);
const nombre = ref('');

// computed — valores derivados (se cachean)
const nombreMayus = computed(() => nombre.value.toUpperCase());
const esPar = computed(() => contador.value % 2 === 0);

// reactive — objetos reactivos
const usuario = reactive({
    id: 0,
    nombre: '',
    email: '',
    activo: true,
});

// watch — reaccionar a cambios
watch(contador, (nuevo, anterior) => {
    console.log(\`Cambió de \${anterior} a \${nuevo}\`);
});

// watchEffect — ejecutar efecto con tracking automático
watchEffect(() => {
    document.title = \`Contador: \${contador.value}\`;
});

// Lifecycle hooks
onMounted(async () => {
    const res = await fetch('/api/usuario');
    Object.assign(usuario, await res.json());
});

// defineProps y defineEmits
const props = defineProps<{
    titulo: string;
    items: string[];
    opciones?: { limite?: number };
}>();

const emit = defineEmits<{
    seleccionar: [item: string];
    cerrar: [];
}>();
</script>

<template>
    <div>
        <h2>{{ props.titulo }}</h2>
        <p>{{ nombreMayus }} — {{ esPar ? 'Par' : 'Impar' }}</p>
        <button @click="contador++">Incrementar</button>

        <ul>
            <li v-for="item in props.items" :key="item"
                @click="emit('seleccionar', item)">
                {{ item }}
            </li>
        </ul>
    </div>
</template>`}</code></pre>

            <h2 id="composables">Composables — lógica reutilizable</h2>
            <pre><code>{`// composables/useAsync.ts — manejo de async con estado
import { ref } from 'vue';

export function useAsync<T>(fn: () => Promise<T>) {
    const datos = ref<T | null>(null);
    const cargando = ref(false);
    const error = ref<string | null>(null);

    async function ejecutar() {
        cargando.value = true;
        error.value = null;
        try {
            datos.value = await fn();
        } catch (e) {
            error.value = e instanceof Error ? e.message : 'Error desconocido';
        } finally {
            cargando.value = false;
        }
    }

    return { datos, cargando, error, ejecutar };
}

// composables/usePaginacion.ts
export function usePaginacion(total: Ref<number>, porPagina = 10) {
    const pagina = ref(1);
    const totalPaginas = computed(() => Math.ceil(total.value / porPagina));
    const offset = computed(() => (pagina.value - 1) * porPagina);

    const anterior = () => { if (pagina.value > 1) pagina.value--; };
    const siguiente = () => { if (pagina.value < totalPaginas.value) pagina.value++; };
    const irA = (n: number) => { pagina.value = Math.max(1, Math.min(n, totalPaginas.value)); };

    return { pagina, totalPaginas, offset, anterior, siguiente, irA };
}

// Uso en un componente
const { datos: usuarios, cargando, error, ejecutar } = useAsync(() =>
    fetch('/api/usuarios').then(r => r.json())
);
const { pagina, totalPaginas, siguiente } = usePaginacion(computed(() => usuarios.value?.length ?? 0));

onMounted(ejecutar);`}</code></pre>

            {/* ── Paywall ── */}
            <div className="not-prose my-12">
                <div className="relative rounded-2xl border border-amber-500/30 bg-amber-500/5 overflow-hidden">
                    <div className="px-8 py-6 blur-sm pointer-events-none select-none opacity-50">
                        <h3 className="text-xl font-bold mb-3">Pinia — gestión de estado</h3>
                        <pre className="bg-gray-900 rounded-xl p-4 text-sm text-gray-300">
{`// stores/auth.ts
export const useAuthStore = defineStore('auth', () => {
    const usuario = ref<Usuario | null>(null);
    const estaLogueado = computed(() => !!usuario.value);

    async function login(email: string, password: string) {
        usuario.value = await api.login(email, password);
    }
    function logout() { usuario.value = null; }

    return { usuario, estaLogueado, login, logout };
}, { persist: true });  // persiste en localStorage`}
                        </pre>
                    </div>
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-b from-white/80 to-white/95 dark:from-gray-950/80 dark:to-gray-950/95 p-8 text-center">
                        <Lock className="h-10 w-10 text-amber-500 mb-4" />
                        <h3 className="text-2xl font-extrabold mb-2">Contenido Premium</h3>
                        <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-sm">
                            6 módulos más — Pinia, Vue Router, Nuxt 3 y testing — disponibles con el acceso Beta.
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
