import LessonLayout from '@/layouts/LessonLayout';
import { Head, Link } from '@inertiajs/react';
import { Lock, CheckCircle2 } from 'lucide-react';

const modules = [
    { id: '/lecciones/react-avanzado', title: 'Hooks avanzados', free: true },
    { id: '/lecciones/react-avanzado#context', title: 'Context y gestión de estado', free: true },
    { id: '#', title: 'React Query — server state', free: false },
    { id: '#', title: 'Zustand — client state', free: false },
    { id: '#', title: 'Server Components y RSC', free: false },
    { id: '#', title: 'Optimización y rendimiento', free: false },
    { id: '#', title: 'Patrones avanzados de componentes', free: false },
    { id: '#', title: 'Testing con Vitest y Testing Library', free: false },
];

const betaFeatures = [
    'React Query: queries, mutations, cache invalidation y optimistic updates',
    'Zustand: stores, slices, devtools y persistencia',
    'Server Components: cuándo y cómo usarlos correctamente',
    'memo, useMemo, useCallback — cuándo sirven y cuándo no',
    'Patrones: Compound Components, Render Props y Custom Hooks',
    'Suspense y Error Boundaries en producción',
    'React Profiler y diagnóstico de renders innecesarios',
    'Testing completo: unitario, integración y E2E con Playwright',
];

export default function ReactAvanzadoTeaser() {
    return (
        <LessonLayout
            title="React avanzado"
            description="Hooks avanzados, React Query, Zustand, Server Components y optimización de rendimiento para apps React en producción."
            duration="5h 00min"
            lessons={26}
            level="Avanzado"
            premium={true}
            modules={modules}
            activeModule="/lecciones/react-avanzado"
            category="Frontend"
        >
            <Head>
                <title>React avanzado — DarkCode Premium</title>
                <meta name="description" content="Hooks avanzados, React Query, Zustand, Server Components y optimización. React para producción. Acceso Premium DarkCode." />
            </Head>

            <h1>React avanzado</h1>

            <blockquote>
                La mayoría de devs sabe usar <code>useState</code> y <code>useEffect</code>. Pero dominar React de verdad significa entender cuándo <em>no</em> usar un hook, cómo separar el estado del servidor del estado del cliente, y cómo construir componentes que se pueden mantener en equipos grandes.
            </blockquote>

            {/* ── 1. Hooks avanzados ── */}
            <h2 id="hooks">Hooks avanzados</h2>

            <h3>useReducer — estado complejo</h3>
            <pre><code>{`import { useReducer } from 'react';

type EstadoFormulario = {
    nombre: string;
    email: string;
    cargando: boolean;
    errores: Record<string, string>;
};

type Accion =
    | { tipo: 'SET_CAMPO'; campo: keyof Pick<EstadoFormulario, 'nombre' | 'email'>; valor: string }
    | { tipo: 'SET_CARGANDO'; valor: boolean }
    | { tipo: 'SET_ERROR'; campo: string; mensaje: string }
    | { tipo: 'LIMPIAR_ERRORES' }
    | { tipo: 'RESET' };

const estadoInicial: EstadoFormulario = {
    nombre: '', email: '', cargando: false, errores: {}
};

function reducer(estado: EstadoFormulario, accion: Accion): EstadoFormulario {
    switch (accion.tipo) {
        case 'SET_CAMPO':
            return { ...estado, [accion.campo]: accion.valor,
                errores: { ...estado.errores, [accion.campo]: '' } };
        case 'SET_CARGANDO':
            return { ...estado, cargando: accion.valor };
        case 'SET_ERROR':
            return { ...estado, errores: { ...estado.errores, [accion.campo]: accion.mensaje } };
        case 'LIMPIAR_ERRORES':
            return { ...estado, errores: {} };
        case 'RESET':
            return estadoInicial;
        default:
            return estado;
    }
}

function Formulario() {
    const [estado, dispatch] = useReducer(reducer, estadoInicial);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        dispatch({ tipo: 'SET_CARGANDO', valor: true });
        try {
            await api.registrar(estado);
        } catch (err) {
            dispatch({ tipo: 'SET_ERROR', campo: 'general', mensaje: 'Error al enviar' });
        } finally {
            dispatch({ tipo: 'SET_CARGANDO', valor: false });
        }
    };
    // ...
}`}</code></pre>

            <h3>Custom Hooks — lógica reutilizable</h3>
            <pre><code>{`// useDebounce — retrasar actualizaciones
function useDebounce<T>(valor: T, delay: number = 300): T {
    const [valorDebounced, setValorDebounced] = useState(valor);

    useEffect(() => {
        const timer = setTimeout(() => setValorDebounced(valor), delay);
        return () => clearTimeout(timer);
    }, [valor, delay]);

    return valorDebounced;
}

// Uso
function BuscadorProductos() {
    const [busqueda, setBusqueda] = useState('');
    const busquedaDebounced = useDebounce(busqueda, 400);

    // Solo hace la petición 400ms después de que el usuario deje de escribir
    const { data } = useQuery({
        queryKey: ['productos', busquedaDebounced],
        queryFn: () => api.buscar(busquedaDebounced),
        enabled: busquedaDebounced.length >= 2,
    });

    return (
        <input value={busqueda} onChange={e => setBusqueda(e.target.value)} />
    );
}

// useLocalStorage — persistencia automática
function useLocalStorage<T>(clave: string, valorInicial: T) {
    const [valor, setValor] = useState<T>(() => {
        try {
            const item = window.localStorage.getItem(clave);
            return item ? JSON.parse(item) : valorInicial;
        } catch {
            return valorInicial;
        }
    });

    const setValorPersistido = useCallback((nuevoValor: T | ((v: T) => T)) => {
        setValor(prev => {
            const val = typeof nuevoValor === 'function'
                ? (nuevoValor as (v: T) => T)(prev)
                : nuevoValor;
            localStorage.setItem(clave, JSON.stringify(val));
            return val;
        });
    }, [clave]);

    return [valor, setValorPersistido] as const;
}`}</code></pre>

            {/* ── 2. Context ── */}
            <h2 id="context">Context — estado global sin librería</h2>
            <pre><code>{`// Patrón correcto: Context + custom hook + Provider separado
interface AuthContextType {
    usuario: Usuario | null;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
    cargando: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [usuario, setUsuario] = useState<Usuario | null>(null);
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        // Recuperar sesión al cargar
        api.me().then(setUsuario).catch(() => {}).finally(() => setCargando(false));
    }, []);

    const login = useCallback(async (email: string, password: string) => {
        const u = await api.login(email, password);
        setUsuario(u);
    }, []);

    const logout = useCallback(() => {
        api.logout();
        setUsuario(null);
    }, []);

    return (
        <AuthContext.Provider value={{ usuario, login, logout, cargando }}>
            {children}
        </AuthContext.Provider>
    );
}

// Custom hook para consumir el context (lanza error si se usa fuera del Provider)
export function useAuth(): AuthContextType {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error('useAuth debe usarse dentro de <AuthProvider>');
    return ctx;
}`}</code></pre>

            {/* ── Paywall ── */}
            <div className="not-prose my-12">
                <div className="relative rounded-2xl border border-amber-500/30 bg-amber-500/5 overflow-hidden">
                    <div className="px-8 py-6 blur-sm pointer-events-none select-none opacity-50">
                        <h3 className="text-xl font-bold mb-3">React Query — servidor como fuente de verdad</h3>
                        <pre className="bg-gray-900 rounded-xl p-4 text-sm text-gray-300">
{`const { data, isLoading, error } = useQuery({
    queryKey: ['usuarios', filtros],
    queryFn: () => api.getUsuarios(filtros),
    staleTime: 5 * 60 * 1000,  // 5 minutos en caché
});

const mutation = useMutation({
    mutationFn: api.crearUsuario,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['usuarios'] }),
});`}
                        </pre>
                    </div>
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-b from-white/80 to-white/95 dark:from-gray-950/80 dark:to-gray-950/95 p-8 text-center">
                        <Lock className="h-10 w-10 text-amber-500 mb-4" />
                        <h3 className="text-2xl font-extrabold mb-2">Contenido Premium</h3>
                        <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-sm">
                            6 módulos más — React Query, Zustand, Server Components, optimización y testing disponibles con el acceso Beta.
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
