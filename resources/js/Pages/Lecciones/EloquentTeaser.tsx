import LessonLayout from '@/layouts/LessonLayout';
import { Head, Link } from '@inertiajs/react';
import { Lock, CheckCircle2 } from 'lucide-react';

const modules = [
    { id: '/lecciones/eloquent', title: 'Relaciones básicas', free: true },
    { id: '#', title: 'HasMany y BelongsTo en profundidad', free: false },
    { id: '#', title: 'Relaciones polimórficas', free: false },
    { id: '#', title: 'Scopes locales y globales', free: false },
    { id: '#', title: 'Mutators y Casts', free: false },
    { id: '#', title: 'Observers y Events', free: false },
    { id: '#', title: 'Query optimización (N+1)', free: false },
    { id: '#', title: 'Factories y Seeders avanzados', free: false },
];

const betaFeatures = [
    'Relaciones: HasMany, BelongsTo, ManyToMany, HasOneThrough',
    'Relaciones polimórficas con MorphTo',
    'Scopes locales, globales y query macros',
    'Mutators, Accessors y Casts personalizados',
    'Observers, Events y Listeners en Eloquent',
    'Eager loading y prevención de N+1',
    'Factories avanzadas con estados y secuencias',
    'Soft deletes, timestamps y UUID como clave primaria',
];

export default function EloquentTeaser() {
    return (
        <LessonLayout
            title="Eloquent ORM avanzado"
            description="Relaciones, scopes, observers y todo lo que necesitas para dominar la capa de datos en Laravel."
            duration="4h 30min"
            lessons={22}
            level="Avanzado"
            premium={true}
            modules={modules}
            activeModule="/lecciones/eloquent"
            category="PHP / Laravel"
        >
            <Head>
                <title>Eloquent ORM avanzado — DarkCode Premium</title>
                <meta name="description" content="Curso avanzado de Eloquent ORM: relaciones complejas, scopes, observers, N+1 y factories. Premium DarkCode." />
            </Head>

            <h1>Eloquent ORM avanzado</h1>

            <blockquote>
                Eloquent es uno de los ORMs más elegantes del ecosistema PHP. Pero la mayoría de devs solo roza la superficie — relaciones básicas y algún <code>where</code>. Este curso te lleva al siguiente nivel: código limpio, consultas eficientes y una capa de datos que escala.
            </blockquote>

            <h2>Relaciones Eloquent — fundamentos</h2>
            <p>Eloquent soporta todos los tipos de relación que necesitarás en producción:</p>

            <pre><code>{`// HasOne — un usuario tiene un perfil
class User extends Model {
    public function profile(): HasOne {
        return $this->hasOne(Profile::class);
    }
}

// HasMany — un curso tiene muchas lecciones
class Course extends Model {
    public function lessons(): HasMany {
        return $this->hasMany(Lesson::class)->orderBy('order');
    }
}

// BelongsTo — cada lección pertenece a un curso
class Lesson extends Model {
    public function course(): BelongsTo {
        return $this->belongsTo(Course::class);
    }
}

// BelongsToMany — usuarios y cursos (tabla pivot)
class User extends Model {
    public function courses(): BelongsToMany {
        return $this->belongsToMany(Course::class)
                    ->withPivot('progress', 'completed_at')
                    ->withTimestamps();
    }
}`}</code></pre>

            <h3>Eager loading — el antídoto contra N+1</h3>
            <pre><code>{`// ❌ Problema N+1: 1 query por curso + 1 por cada lesson
$courses = Course::all();
foreach ($courses as $course) {
    echo $course->lessons->count(); // query extra por cada iteración
}

// ✅ Eager loading: solo 2 queries totales
$courses = Course::with('lessons')->get();
foreach ($courses as $course) {
    echo $course->lessons->count(); // ya está en memoria
}

// ✅ Lazy eager loading (cuando ya tienes la colección)
$courses->load('lessons', 'instructor');

// ✅ Contar sin cargar (1 query con COUNT)
$courses = Course::withCount('lessons')->get();
echo $course->lessons_count;`}</code></pre>

            {/* ── Paywall ── */}
            <div className="not-prose my-12">
                <div className="relative rounded-2xl border border-amber-500/30 bg-amber-500/5 overflow-hidden">
                    <div className="px-8 py-6 blur-sm pointer-events-none select-none opacity-50">
                        <h3 className="text-xl font-bold mb-3">Scopes — reutilizar lógica de consultas</h3>
                        <pre className="bg-gray-900 rounded-xl p-4 text-sm text-gray-300">
{`// Scope local
class Course extends Model {
    public function scopePublished(Builder $query): Builder {
        return $query->where('status', 'published');
    }
    public function scopeForLevel(Builder $query, string $level): Builder {
        return $query->where('level', $level);
    }
}

// Uso encadenado
Course::published()->forLevel('Básico')->get();`}
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
