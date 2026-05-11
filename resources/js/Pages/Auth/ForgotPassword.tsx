import { useForm, Link, usePage } from '@inertiajs/react';
import { BookOpen, Mail, ArrowLeft, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

type PageProps = {
    flash: { status?: string };
};

export default function ForgotPassword() {
    const { flash } = usePage<PageProps>().props;

    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/forgot-password');
    };

    return (
        <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4">
            <div className="w-full max-w-md">
                {/* Logo */}
                <Link href="/" className="flex items-center justify-center gap-2 mb-8">
                    <BookOpen className="h-7 w-7 text-indigo-400" />
                    <span className="text-2xl font-bold text-white">TechLearn</span>
                </Link>

                <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8">
                    {flash.status ? (
                        /* Success state */
                        <div className="text-center py-4">
                            <div className="flex justify-center mb-4">
                                <div className="h-14 w-14 rounded-full bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center">
                                    <CheckCircle className="h-7 w-7 text-indigo-400" />
                                </div>
                            </div>
                            <h1 className="text-xl font-bold text-white mb-2">Revisa tu correo</h1>
                            <p className="text-gray-400 text-sm leading-relaxed mb-6">
                                {flash.status}
                            </p>
                            <Link
                                href="/login"
                                className="inline-flex items-center gap-2 text-sm text-indigo-400 hover:text-indigo-300 font-medium transition-colors"
                            >
                                <ArrowLeft className="h-4 w-4" />
                                Volver a iniciar sesión
                            </Link>
                        </div>
                    ) : (
                        /* Form state */
                        <>
                            <div className="flex justify-center mb-6">
                                <div className="h-12 w-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
                                    <Mail className="h-6 w-6 text-indigo-400" />
                                </div>
                            </div>

                            <h1 className="text-2xl font-bold text-white mb-1 text-center">
                                ¿Olvidaste tu contraseña?
                            </h1>
                            <p className="text-gray-400 text-sm mb-8 text-center leading-relaxed">
                                Introduce tu correo y te enviaremos un enlace para restablecerla.
                            </p>

                            <form onSubmit={submit} className="space-y-5">
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-1.5">
                                        Correo electrónico
                                    </label>
                                    <input
                                        type="email"
                                        value={data.email}
                                        onChange={e => setData('email', e.target.value)}
                                        placeholder="tu@email.com"
                                        autoComplete="email"
                                        autoFocus
                                        className={`w-full px-4 py-2.5 rounded-xl bg-gray-800 border text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 transition-colors ${
                                            errors.email ? 'border-red-500' : 'border-gray-700'
                                        }`}
                                    />
                                    {errors.email && (
                                        <p className="mt-1.5 text-sm text-red-400">{errors.email}</p>
                                    )}
                                </div>

                                <Button
                                    type="submit"
                                    disabled={processing}
                                    className="w-full h-11 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold"
                                >
                                    {processing ? 'Enviando...' : 'Enviar enlace de recuperación'}
                                </Button>
                            </form>

                            <div className="mt-6 text-center">
                                <Link
                                    href="/login"
                                    className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-gray-300 transition-colors"
                                >
                                    <ArrowLeft className="h-4 w-4" />
                                    Volver a iniciar sesión
                                </Link>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
