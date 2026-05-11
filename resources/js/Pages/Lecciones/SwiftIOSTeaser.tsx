import LessonLayout from '@/layouts/LessonLayout';
import { Head, Link } from '@inertiajs/react';
import { Lock, CheckCircle2 } from 'lucide-react';

const modules = [
    { id: '/lecciones/swift-ios', title: 'Swift y SwiftUI — fundamentos', free: true },
    { id: '/lecciones/swift-ios#swiftui', title: 'Vistas, estado y binding', free: true },
    { id: '#', title: 'MVVM con @Observable', free: false },
    { id: '#', title: 'Networking con async/await', free: false },
    { id: '#', title: 'Persistencia con SwiftData', free: false },
    { id: '#', title: 'Navigation y tabs', free: false },
    { id: '#', title: 'HIG — diseño para iOS', free: false },
    { id: '#', title: 'Publicar en App Store', free: false },
];

const betaFeatures = [
    'MVVM con @Observable y @Bindable (iOS 17+)',
    'URLSession y async/await para APIs REST',
    'SwiftData: modelos, queries y relaciones',
    'NavigationStack con NavigationPath y deep links',
    'Animaciones con withAnimation y matchedGeometryEffect',
    'HIG: tipografía SF, colores adaptativos y haptics',
    'Notificaciones push con APNs y UserNotifications',
    'Proceso completo de publicación en App Store',
];

export default function SwiftIOSTeaser() {
    return (
        <LessonLayout
            title="Swift para iOS"
            description="Desarrolla apps iOS modernas con SwiftUI, MVVM, SwiftData y los patrones que Apple recomienda en 2026."
            duration="5h 30min"
            lessons={28}
            level="Intermedio"
            premium={true}
            modules={modules}
            activeModule="/lecciones/swift-ios"
            category="Mobile"
        >
            <Head>
                <title>Swift para iOS — DarkCode Premium</title>
                <meta name="description" content="Desarrolla apps iOS con SwiftUI, MVVM, SwiftData y URLSession. Acceso Premium DarkCode." />
            </Head>

            <h1>Swift para iOS</h1>

            <blockquote>
                iOS es la plataforma con los usuarios más rentables del mundo. Swift es el lenguaje moderno, seguro y expresivo de Apple — y SwiftUI es la forma declarativa de construir interfaces que funcionan en iPhone, iPad, Mac y Apple Watch con el mismo código.
            </blockquote>

            {/* ── 1. Swift fundamentos ── */}
            <h2 id="swift">Swift — fundamentos esenciales</h2>
            <p>
                Swift es seguro por diseño: los opcionales obligan a manejar la ausencia de valor, el sistema de tipos evita errores comunes y las clausuras son ciudadanos de primera clase.
            </p>

            <pre><code>{`// Opcionales — nil safety
var nombre: String? = nil
let longitud = nombre?.count ?? 0   // 0 si nil
let mayus = nombre?.uppercased()    // nil si nombre es nil

// Guard let — salida temprana
func procesarUsuario(nombre: String?) -> String {
    guard let nombre = nombre, !nombre.isEmpty else {
        return "Nombre inválido"
    }
    return "Hola, \\(nombre)!"
}

// Structs y clases
struct Punto {
    var x: Double
    var y: Double

    // Computed property
    var magnitud: Double { sqrt(x*x + y*y) }

    // Método mutante
    mutating func escalar(por factor: Double) {
        x *= factor
        y *= factor
    }
}

// Enums con valores asociados
enum Resultado<T> {
    case exito(T)
    case error(String)
}

func dividir(_ a: Double, _ b: Double) -> Resultado<Double> {
    guard b != 0 else { return .error("División por cero") }
    return .exito(a / b)
}

// Pattern matching
switch dividir(10, 3) {
case .exito(let valor):
    print("Resultado: \\(valor)")
case .error(let msg):
    print("Error: \\(msg)")
}

// Closures
let numeros = [3, 1, 4, 1, 5, 9, 2, 6]
let pares = numeros.filter { $0 % 2 == 0 }           // [4, 2, 6]
let dobles = numeros.map { $0 * 2 }                   // [6, 2, 8, ...]
let suma = numeros.reduce(0, +)                        // 31
let ordenados = numeros.sorted { $0 < $1 }            // [1, 1, 2, 3, 4, 5, 6, 9]`}</code></pre>

            {/* ── 2. SwiftUI ── */}
            <h2 id="swiftui">Vistas, estado y bindings</h2>
            <pre><code>{`import SwiftUI

// Vista básica con @State
struct ContadorView: View {
    @State private var cuenta = 0

    var body: some View {
        VStack(spacing: 20) {
            Text("\\(cuenta)")
                .font(.system(size: 72, weight: .bold, design: .rounded))
                .contentTransition(.numericText())
                .animation(.spring, value: cuenta)

            HStack(spacing: 16) {
                Button("-") {
                    withAnimation { cuenta -= 1 }
                }
                .buttonStyle(.bordered)
                .font(.title2)

                Button("+") {
                    withAnimation { cuenta += 1 }
                }
                .buttonStyle(.borderedProminent)
                .font(.title2)
            }

            if cuenta != 0 {
                Button("Resetear") {
                    withAnimation { cuenta = 0 }
                }
                .foregroundStyle(.secondary)
            }
        }
        .padding()
    }
}

// Lista con datos
struct ListaContactos: View {
    let contactos = ["Ana García", "Bob Martínez", "Clara López"]
    @State private var busqueda = ""

    var filtrados: [String] {
        busqueda.isEmpty ? contactos : contactos.filter {
            $0.localizedCaseInsensitiveContains(busqueda)
        }
    }

    var body: some View {
        NavigationStack {
            List(filtrados, id: \\.self) { nombre in
                NavigationLink(nombre) {
                    DetalleContactoView(nombre: nombre)
                }
            }
            .searchable(text: $busqueda, prompt: "Buscar contacto")
            .navigationTitle("Contactos")
            .navigationBarTitleDisplayMode(.large)
        }
    }
}`}</code></pre>

            {/* ── Paywall ── */}
            <div className="not-prose my-12">
                <div className="relative rounded-2xl border border-amber-500/30 bg-amber-500/5 overflow-hidden">
                    <div className="px-8 py-6 blur-sm pointer-events-none select-none opacity-50">
                        <h3 className="text-xl font-bold mb-3">MVVM con @Observable (iOS 17+)</h3>
                        <pre className="bg-gray-900 rounded-xl p-4 text-sm text-gray-300">
{`@Observable
class UsuariosViewModel {
    var usuarios: [Usuario] = []
    var cargando = false
    var error: String?

    func cargar() async {
        cargando = true
        do {
            usuarios = try await api.obtenerUsuarios()
        } catch {
            self.error = error.localizedDescription
        }
        cargando = false
    }
}`}
                        </pre>
                    </div>
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-b from-white/80 to-white/95 dark:from-gray-950/80 dark:to-gray-950/95 p-8 text-center">
                        <Lock className="h-10 w-10 text-amber-500 mb-4" />
                        <h3 className="text-2xl font-extrabold mb-2">Contenido Premium</h3>
                        <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-sm">
                            6 módulos más — MVVM, networking, SwiftData, Navigation y publicación — disponibles con el acceso Beta.
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
