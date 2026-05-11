import LessonLayout from '@/layouts/LessonLayout';
import { Head, Link } from '@inertiajs/react';
import { Lock, CheckCircle2 } from 'lucide-react';

const modules = [
    { id: '/lecciones/kotlin-android', title: 'Kotlin para Android — fundamentos', free: true },
    { id: '/lecciones/kotlin-android#compose', title: 'Jetpack Compose básico', free: true },
    { id: '#', title: 'ViewModel y estado', free: false },
    { id: '#', title: 'Coroutines y Flow', free: false },
    { id: '#', title: 'Room — base de datos local', free: false },
    { id: '#', title: 'Retrofit y APIs REST', free: false },
    { id: '#', title: 'Navigation Component', free: false },
    { id: '#', title: 'Material 3 y temas', free: false },
];

const betaFeatures = [
    'ViewModel con StateFlow y UiState pattern',
    'Coroutines: launch, async, withContext y scopes',
    'Room con DAOs, relaciones y migraciones',
    'Retrofit con Kotlin serialization y manejo de errores',
    'Navigation Compose con argumentos y deep links',
    'Hilt para inyección de dependencias',
    'Material 3: componentes, colores dinámicos y temas',
    'Testing: unit tests y UI tests con Espresso',
];

export default function KotlinAndroidTeaser() {
    return (
        <LessonLayout
            title="Kotlin para Android"
            description="Desarrolla apps Android profesionales con Kotlin, Jetpack Compose, ViewModel, Room y Material 3."
            duration="6h 00min"
            lessons={32}
            level="Intermedio"
            premium={true}
            modules={modules}
            activeModule="/lecciones/kotlin-android"
            category="Mobile"
        >
            <Head>
                <title>Kotlin para Android — DarkCode Premium</title>
                <meta name="description" content="Aprende desarrollo Android con Kotlin y Jetpack Compose. ViewModel, Room, Retrofit y Material 3. Acceso Premium DarkCode." />
            </Head>

            <h1>Kotlin para Android</h1>

            <blockquote>
                Android tiene más de 3.000 millones de dispositivos activos. Con Kotlin — el lenguaje oficial de Google desde 2017 — y Jetpack Compose — el toolkit moderno de UI — puedes construir apps nativas de alta calidad. Este curso te lleva desde los fundamentos hasta una app completa lista para publicar.
            </blockquote>

            {/* ── 1. Kotlin fundamentos ── */}
            <h2 id="kotlin">Kotlin para Android — fundamentos</h2>
            <p>
                Kotlin es un lenguaje moderno que compila a bytecode de la JVM. Es conciso, seguro (null safety por diseño) e interoperable con Java. Dominar sus características es el primer paso para ser productivo en Android.
            </p>

            <pre><code>{`// Null safety — el gran avance de Kotlin sobre Java
var nombre: String = "Ana"      // no puede ser null
var apellido: String? = null    // puede ser null (nullable)

// Safe call operator
val longitud = apellido?.length  // null si apellido es null
val mayus = apellido?.uppercase() ?: "Sin apellido"  // Elvis operator

// Data classes — ideal para modelos
data class Usuario(
    val id: Int,
    val nombre: String,
    val email: String,
    val activo: Boolean = true
)

val usuario = Usuario(1, "Ana", "ana@ejemplo.com")
val copia = usuario.copy(nombre = "Eva")  // copy con cambios
val (id, nombre) = usuario               // destructuring

// Sealed classes — uniones discriminadas type-safe
sealed class Resultado<out T> {
    data class Exito<T>(val datos: T) : Resultado<T>()
    data class Error(val mensaje: String) : Resultado<Nothing>()
    object Cargando : Resultado<Nothing>()
}

// Usar con when (exhaustivo — el compilador obliga a cubrir todos los casos)
fun manejar(resultado: Resultado<Usuario>) = when (resultado) {
    is Resultado.Exito -> mostrarUsuario(resultado.datos)
    is Resultado.Error -> mostrarError(resultado.mensaje)
    Resultado.Cargando -> mostrarSpinner()
}

// Extension functions — añadir funciones a clases existentes sin herencia
fun String.esEmailValido(): Boolean {
    return android.util.Patterns.EMAIL_ADDRESS.matcher(this).matches()
}

"test@ejemplo.com".esEmailValido()  // true

// Scope functions
val usuario2 = Usuario(2, "Bob", "bob@ejemplo.com").also { u ->
    println("Creado usuario: \${u.nombre}")
}.apply {
    // configurar sin retornar el objeto
}

listOf("a", "b", "c").let { lista ->
    lista.map { it.uppercase() }
}`}</code></pre>

            {/* ── 2. Jetpack Compose ── */}
            <h2 id="compose">Jetpack Compose básico</h2>
            <p>
                Compose reemplaza los XML layouts con funciones de Kotlin anotadas con <code>@Composable</code>. La UI es una función del estado — cuando el estado cambia, Compose re-renderiza solo lo necesario.
            </p>

            <pre><code>{`import androidx.compose.runtime.*
import androidx.compose.material3.*
import androidx.compose.foundation.layout.*

// Composable básico
@Composable
fun Saludo(nombre: String) {
    Text(
        text = "Hola, $nombre!",
        style = MaterialTheme.typography.headlineMedium,
        color = MaterialTheme.colorScheme.primary
    )
}

// Estado local con remember y mutableStateOf
@Composable
fun Contador() {
    var cuenta by remember { mutableIntStateOf(0) }

    Column(
        horizontalAlignment = Alignment.CenterHorizontally,
        verticalArrangement = Arrangement.spacedBy(16.dp)
    ) {
        Text(
            text = "$cuenta",
            style = MaterialTheme.typography.displayLarge
        )
        Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
            OutlinedButton(onClick = { cuenta-- }) { Text("-") }
            Button(onClick = { cuenta++ }) { Text("+") }
        }
    }
}

// Lista con LazyColumn (equivalente a RecyclerView)
@Composable
fun ListaUsuarios(usuarios: List<Usuario>) {
    LazyColumn(
        contentPadding = PaddingValues(16.dp),
        verticalArrangement = Arrangement.spacedBy(8.dp)
    ) {
        items(usuarios, key = { it.id }) { usuario ->
            TarjetaUsuario(usuario)
        }
    }
}

@Composable
fun TarjetaUsuario(usuario: Usuario) {
    Card(
        modifier = Modifier.fillMaxWidth(),
        elevation = CardDefaults.cardElevation(2.dp)
    ) {
        Row(
            modifier = Modifier.padding(16.dp),
            horizontalArrangement = Arrangement.spacedBy(12.dp),
            verticalAlignment = Alignment.CenterVertically
        ) {
            // Avatar con initial
            Surface(
                shape = CircleShape,
                color = MaterialTheme.colorScheme.primaryContainer,
                modifier = Modifier.size(40.dp)
            ) {
                Box(contentAlignment = Alignment.Center) {
                    Text(
                        usuario.nombre.first().toString(),
                        style = MaterialTheme.typography.titleMedium
                    )
                }
            }
            Column {
                Text(usuario.nombre, style = MaterialTheme.typography.titleSmall)
                Text(usuario.email, style = MaterialTheme.typography.bodySmall,
                    color = MaterialTheme.colorScheme.onSurfaceVariant)
            }
        }
    }
}`}</code></pre>

            {/* ── Paywall ── */}
            <div className="not-prose my-12">
                <div className="relative rounded-2xl border border-amber-500/30 bg-amber-500/5 overflow-hidden">
                    <div className="px-8 py-6 blur-sm pointer-events-none select-none opacity-50">
                        <h3 className="text-xl font-bold mb-3">ViewModel — separar UI de lógica</h3>
                        <pre className="bg-gray-900 rounded-xl p-4 text-sm text-gray-300">
{`@HiltViewModel
class UsuariosViewModel @Inject constructor(
    private val repo: UsuarioRepositorio
) : ViewModel() {
    private val _estado = MutableStateFlow<Resultado<List<Usuario>>>(Resultado.Cargando)
    val estado: StateFlow<Resultado<List<Usuario>>> = _estado.asStateFlow()

    init { cargarUsuarios() }

    fun cargarUsuarios() {
        viewModelScope.launch {
            _estado.value = Resultado.Cargando
            _estado.value = repo.obtenerTodos()
        }
    }
}`}
                        </pre>
                    </div>
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-b from-white/80 to-white/95 dark:from-gray-950/80 dark:to-gray-950/95 p-8 text-center">
                        <Lock className="h-10 w-10 text-amber-500 mb-4" />
                        <h3 className="text-2xl font-extrabold mb-2">Contenido Premium</h3>
                        <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-sm">
                            6 módulos más — ViewModel, Coroutines, Room, Retrofit, Navigation y Material 3 — con el acceso Beta.
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
