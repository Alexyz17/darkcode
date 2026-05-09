import LessonLayout from '@/layouts/LessonLayout';
import { Head, Link } from '@inertiajs/react';
import { Lock, CheckCircle2 } from 'lucide-react';

const modules = [
    { id: '/lecciones/apis-rest', title: '¿Qué es una API REST?', free: true },
    { id: '#', title: 'Recursos y rutas en Laravel', free: false },
    { id: '#', title: 'Autenticación con Sanctum', free: false },
    { id: '#', title: 'Serialización con Resources', free: false },
    { id: '#', title: 'Versionado de la API', free: false },
    { id: '#', title: 'Rate limiting y throttling', free: false },
    { id: '#', title: 'Documentación con Scribe', free: false },
    { id: '#', title: 'Testing de endpoints', free: false },
];

const betaFeatures = [
    'Diseño RESTful: recursos, verbos y status codes',
    'Autenticación con Laravel Sanctum (tokens + SPA)',
    'API Resources y Collections para serializar JSON',
    'Versionado: /v1/ y /v2/ sin romper clientes',
    'Rate limiting por usuario, IP y endpoint',
    'Documentación automática con Scribe',
    'JSON:API spec — format estándar para clientes',
    'Testing completo con Laravel HTTP tests',
];

export default function ApisRestTeaser() {
    return (
        <LessonLayout
            title="APIs REST con Laravel"
            description="Diseña, construye y documenta APIs profesionales con autenticación y versionado."
            duration="5h 00min"
            lessons={25}
            level="Avanzado"
            premium={true}
            modules={modules}
            activeModule="/lecciones/apis-rest"
            category="PHP / Laravel"
        >
            <Head>
                <title>APIs REST con Laravel — DarkCode Premium</title>
                <meta name="description" content="Construye APIs REST profesionales en Laravel 13: Sanctum, Resources, versionado, rate limiting y documentación." />
            </Head>

            <h1>APIs REST con Laravel</h1>

            <blockquote>
                Una API bien diseñada es la diferencia entre un proyecto que escala y uno que se convierte en deuda técnica. Laravel 13 incluye todo lo que necesitas: Sanctum para autenticación, Resources para serialización y JSON:API support nativo.
            </blockquote>

            <h2>¿Qué es una API REST?</h2>
            <p>REST (Representational State Transfer) es un conjunto de convenciones para diseñar APIs HTTP. Un cliente envía peticiones a URLs que representan <strong>recursos</strong>, usando verbos HTTP estándar:</p>

            <pre><code>{`GET    /api/v1/courses          → listar cursos
GET    /api/v1/courses/42       → obtener curso 42
POST   /api/v1/courses          → crear curso
PUT    /api/v1/courses/42       → reemplazar curso 42
PATCH  /api/v1/courses/42       → actualizar campos del curso 42
DELETE /api/v1/courses/42       → eliminar curso 42

# Respuestas con status codes correctos:
200 OK          → éxito con cuerpo
201 Created     → recurso creado (POST exitoso)
204 No Content  → éxito sin cuerpo (DELETE)
400 Bad Request → datos inválidos
401 Unauthorized → no autenticado
403 Forbidden   → autenticado pero sin permiso
404 Not Found   → recurso no existe
422 Unprocessable → validación fallida
429 Too Many Requests → rate limit alcanzado
500 Internal Server Error → bug en el servidor`}</code></pre>

            <h3>Estructura básica en Laravel</h3>
            <pre><code>{`// routes/api.php
Route::prefix('v1')->group(function () {
    Route::apiResource('courses', CourseController::class);
    // Genera automáticamente:
    // GET    /v1/courses
    // GET    /v1/courses/{course}
    // POST   /v1/courses
    // PUT    /v1/courses/{course}
    // PATCH  /v1/courses/{course}
    // DELETE /v1/courses/{course}
});`}</code></pre>

            <pre><code>{`// app/Http/Controllers/Api/V1/CourseController.php
class CourseController extends Controller
{
    public function index(): CourseCollection
    {
        return new CourseCollection(
            Course::published()->paginate(20)
        );
    }

    public function show(Course $course): CourseResource
    {
        return new CourseResource($course->load('lessons'));
    }

    public function store(StoreCourseRequest $request): CourseResource
    {
        $course = Course::create($request->validated());
        return new CourseResource($course);
    }
}`}</code></pre>

            {/* ── Paywall ── */}
            <div className="not-prose my-12">
                <div className="relative rounded-2xl border border-amber-500/30 bg-amber-500/5 overflow-hidden">
                    <div className="px-8 py-6 blur-sm pointer-events-none select-none opacity-50">
                        <h3 className="text-xl font-bold mb-3">Autenticación con Sanctum</h3>
                        <pre className="bg-gray-900 rounded-xl p-4 text-sm text-gray-300">
{`// Crear token para el usuario
$token = $user->createToken('mobile-app', ['courses:read'])->plainTextToken;

// Proteger rutas
Route::middleware('auth:sanctum')->group(function () {
    Route::apiResource('courses', CourseController::class);
});

// Verificar abilities
$request->user()->tokenCan('courses:read');`}
                        </pre>
                    </div>
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-b from-white/80 to-white/95 dark:from-gray-950/80 dark:to-gray-950/95 p-8 text-center">
                        <Lock className="h-10 w-10 text-amber-500 mb-4" />
                        <h3 className="text-2xl font-extrabold mb-2">Contenido Premium</h3>
                        <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-sm">
                            El resto del curso — 24 lecciones más — está disponible con el acceso Beta de DarkCode.
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
