import LessonLayout from '@/layouts/LessonLayout';
import { Head, Link } from '@inertiajs/react';
import { Lock, CheckCircle2 } from 'lucide-react';

const modules = [
    { id: '/lecciones/python-avanzado', title: 'Decoradores', free: true },
    { id: '/lecciones/python-avanzado#context', title: 'Context managers', free: true },
    { id: '#', title: 'Generators e iteradores', free: false },
    { id: '#', title: 'asyncio y programación asíncrona', free: false },
    { id: '#', title: 'Type hints y mypy', free: false },
    { id: '#', title: 'Dataclasses y Pydantic', free: false },
    { id: '#', title: 'Concurrencia: threads y multiprocessing', free: false },
    { id: '#', title: 'Patrones avanzados: metaclases y descriptores', free: false },
];

const betaFeatures = [
    'Generators e iteradores personalizados con __iter__ y __next__',
    'asyncio completo: coroutines, tasks, gather y timeouts',
    'Type hints avanzados: Generics, Protocol, TypeVar',
    'Dataclasses con @dataclass, field() y __post_init__',
    'Validación con Pydantic v2: modelos, validators y serialización',
    'Concurrencia con ThreadPoolExecutor y ProcessPoolExecutor',
    'Profiling y optimización: cProfile, memory_profiler',
    'Metaclases, descriptores y magia con __slots__',
];

export default function PythonAvanzado() {
    return (
        <LessonLayout
            title="Python avanzado"
            description="Decoradores, context managers, generators, asyncio y type hints para escribir código profesional y eficiente."
            duration="4h 30min"
            lessons={20}
            level="Avanzado"
            premium={true}
            modules={modules}
            activeModule="/lecciones/python-avanzado"
            category="Python"
        >
            <Head>
                <title>Python avanzado — DarkCode Premium</title>
                <meta name="description" content="Curso avanzado de Python: decoradores, generators, asyncio, type hints y Pydantic. Acceso Premium DarkCode." />
            </Head>

            <h1>Python avanzado</h1>

            <blockquote>
                La diferencia entre un script de Python y código de producción no está en los conceptos básicos — está en los patrones avanzados. Decoradores, generators y asyncio son las herramientas que convierten código correcto en código elegante, eficiente y mantenible.
            </blockquote>

            {/* ── 1. Decoradores ── */}
            <h2 id="decoradores">Decoradores</h2>
            <p>
                Un decorador es una función que envuelve otra función para modificar o extender su comportamiento <strong>sin cambiar su código</strong>. Es el patrón más pythónico para añadir funcionalidad transversal (logging, caché, autenticación, timing...).
            </p>

            <pre><code>{`import functools
import time

# Decorador básico
def medir_tiempo(func):
    @functools.wraps(func)   # preserva metadata de la función original
    def wrapper(*args, **kwargs):
        inicio = time.perf_counter()
        resultado = func(*args, **kwargs)
        fin = time.perf_counter()
        print(f"{func.__name__} tardó {fin - inicio:.4f}s")
        return resultado
    return wrapper

@medir_tiempo
def calcular_primos(n):
    return [x for x in range(2, n) if all(x % i != 0 for i in range(2, x))]

primos = calcular_primos(1000)  # calcular_primos tardó 0.0842s

# Decorador con parámetros
def reintentar(max_intentos=3, espera=1.0):
    def decorador(func):
        @functools.wraps(func)
        def wrapper(*args, **kwargs):
            for intento in range(max_intentos):
                try:
                    return func(*args, **kwargs)
                except Exception as e:
                    if intento == max_intentos - 1:
                        raise
                    print(f"Intento {intento + 1} fallido: {e}. Reintentando...")
                    time.sleep(espera)
        return wrapper
    return decorador

@reintentar(max_intentos=3, espera=0.5)
def llamar_api(url):
    import urllib.request
    with urllib.request.urlopen(url, timeout=5) as r:
        return r.read()

# Decorador de caché simple (memoización)
def cache(func):
    memo = {}
    @functools.wraps(func)
    def wrapper(*args):
        if args not in memo:
            memo[args] = func(*args)
        return memo[args]
    return wrapper

@cache
def fibonacci(n):
    if n < 2:
        return n
    return fibonacci(n - 1) + fibonacci(n - 2)

# Python incluye @functools.lru_cache y @functools.cache
from functools import cache as lru_cache

@lru_cache(maxsize=128)
def fib(n):
    return n if n < 2 else fib(n-1) + fib(n-2)`}</code></pre>

            {/* ── 2. Context managers ── */}
            <h2 id="context">Context managers</h2>
            <p>
                Los context managers garantizan que los recursos se liberen correctamente aunque ocurra una excepción. Los usas con <code>with</code>. Puedes crear los tuyos propios con una clase o con <code>contextlib</code>.
            </p>

            <pre><code>{`# Con clase — __enter__ y __exit__
class ConexionDB:
    def __init__(self, url):
        self.url = url
        self.conexion = None

    def __enter__(self):
        print(f"Conectando a {self.url}")
        self.conexion = {"url": self.url, "activa": True}  # simula conexión
        return self.conexion

    def __exit__(self, tipo_exc, valor_exc, tb):
        print("Cerrando conexión")
        self.conexion["activa"] = False
        # Retornar True suprimiría la excepción
        return False

with ConexionDB("postgres://localhost/mydb") as db:
    print(f"Usando conexión: {db}")

# Con contextlib.contextmanager (más conciso)
from contextlib import contextmanager

@contextmanager
def cronometro(etiqueta="Operación"):
    inicio = time.perf_counter()
    try:
        yield  # aquí se ejecuta el bloque with
    finally:
        duracion = time.perf_counter() - inicio
        print(f"{etiqueta}: {duracion:.4f}s")

with cronometro("Ordenar lista"):
    datos = sorted(range(100_000), reverse=True)

# Context manager para gestión de archivos temporal
import tempfile
from pathlib import Path

@contextmanager
def archivo_temporal(sufijo=".txt"):
    ruta = Path(tempfile.mktemp(suffix=sufijo))
    try:
        yield ruta
    finally:
        if ruta.exists():
            ruta.unlink()

with archivo_temporal(".json") as tmp:
    tmp.write_text('{"test": true}')
    datos = tmp.read_text()
    print(datos)
# El archivo se elimina automáticamente al salir`}</code></pre>

            {/* ── Paywall ── */}
            <div className="not-prose my-12">
                <div className="relative rounded-2xl border border-amber-500/30 bg-amber-500/5 overflow-hidden">
                    <div className="px-8 py-6 blur-sm pointer-events-none select-none opacity-50">
                        <h3 className="text-xl font-bold mb-3">Generators — procesar millones de filas sin agotar la RAM</h3>
                        <pre className="bg-gray-900 rounded-xl p-4 text-sm text-gray-300">
{`def leer_csv_grande(ruta):
    with open(ruta, encoding="utf-8") as f:
        cabecera = next(f).strip().split(",")
        for linea in f:
            valores = linea.strip().split(",")
            yield dict(zip(cabecera, valores))

# Procesa 10 millones de filas sin cargar nada en memoria
for fila in leer_csv_grande("ventas_2026.csv"):
    procesar(fila)`}
                        </pre>
                    </div>
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-b from-white/80 to-white/95 dark:from-gray-950/80 dark:to-gray-950/95 p-8 text-center">
                        <Lock className="h-10 w-10 text-amber-500 mb-4" />
                        <h3 className="text-2xl font-extrabold mb-2">Contenido Premium</h3>
                        <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-sm">
                            6 módulos más — generators, asyncio, type hints, Pydantic y concurrencia — disponibles con acceso Beta.
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
