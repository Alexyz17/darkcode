import { useForm, Link, usePage } from '@inertiajs/react';
import { BookOpen, Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

type PageProps = {
    flash: { status?: string };
};

export default function Login() {
    const { flash } = usePage<PageProps>().props;
    const [showPassword, setShowPassword] = useState(false);

    const { data, setData, post, processing, errors } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/login');
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
                    <h1 className="text-2xl font-bold text-white mb-1">Bienvenido de nuevo</h1>
                    <p className="text-gray-400 text-sm mb-8">Inicia sesión en tu cuenta</p>

                    {/* Flash status (e.g. password reset success) */}
                    {flash.status && (
                        <div className="mb-6 px-4 py-3 rounded-xl bg-indigo-500/10 border border-indigo-500/30 text-sm text-indigo-300">
                            {flash.status}
                        </div>
                    )}

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
                                className={`w-full px-4 py-2.5 rounded-xl bg-gray-800 border text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 transition-colors ${errors.email ? 'border-red-500' : 'border-gray-700'}`}
                            />
                            {errors.email && (
                                <p className="mt-1.5 text-sm text-red-400">{errors.email}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1.5">
                                Contraseña
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={data.password}
                                    onChange={e => setData('password', e.target.value)}
                                    placeholder="••••••••"
                                    className={`w-full px-4 py-2.5 pr-10 rounded-xl bg-gray-800 border text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 transition-colors ${errors.password ? 'border-red-500' : 'border-gray-700'}`}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300"
                                >
                                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                </button>
                            </div>
                            {errors.password && (
                                <p className="mt-1.5 text-sm text-red-400">{errors.password}</p>
                            )}
                        </div>

                        <div className="flex items-center justify-between">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={data.remember}
                                    onChange={e => setData('remember', e.target.checked)}
                                    className="rounded border-gray-600 bg-gray-800 text-indigo-600"
                                />
                                <span className="text-sm text-gray-400">Recordarme</span>
                            </label>
                            <Link
                                href="/forgot-password"
                                className="text-sm text-indigo-400 hover:text-indigo-300 transition-colors"
                            >
                                ¿Olvidaste tu contraseña?
                            </Link>
                        </div>

                        <Button
                            type="submit"
                            disabled={processing}
                            className="w-full h-11 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold"
                        >
                            {processing ? 'Iniciando sesión...' : 'Iniciar sesión'}
                        </Button>
                    </form>

                    {/* Social login separator */}
                    <div className="relative my-6">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-800" />
                        </div>
                        <div className="relative flex justify-center">
                            <span className="bg-gray-900 px-3 text-xs text-gray-500 uppercase tracking-wider">
                                o continúa con
                            </span>
                        </div>
                    </div>

                    {/* Google button */}
                    <a
                        href="/auth/google"
                        className="flex items-center justify-center gap-3 w-full px-4 py-2.5 rounded-xl bg-white hover:bg-gray-50 border border-gray-200 text-gray-700 font-medium text-sm shadow-sm transition-colors"
                    >
                        <svg width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                            <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4"/>
                            <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z" fill="#34A853"/>
                            <path d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05"/>
                            <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z" fill="#EA4335"/>
                        </svg>
                        Continuar con Google
                    </a>

                    <p className="mt-6 text-center text-sm text-gray-400">
                        ¿No tienes cuenta?{' '}
                        <Link href="/register" className="text-indigo-400 hover:text-indigo-300 font-medium">
                            Regístrate gratis
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
