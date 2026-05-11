import { useForm, Link } from '@inertiajs/react';
import { BookOpen, Eye, EyeOff, KeyRound } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

type Props = {
    token: string;
    email: string;
};

export default function ResetPassword({ token, email }: Props) {
    const [showPassword, setShowPassword] = useState(false);

    const { data, setData, post, processing, errors } = useForm({
        token,
        email,
        password: '',
        password_confirmation: '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/reset-password');
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
                    <div className="flex justify-center mb-6">
                        <div className="h-12 w-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
                            <KeyRound className="h-6 w-6 text-indigo-400" />
                        </div>
                    </div>

                    <h1 className="text-2xl font-bold text-white mb-1 text-center">
                        Nueva contraseña
                    </h1>
                    <p className="text-gray-400 text-sm mb-8 text-center">
                        Crea una contraseña segura para tu cuenta.
                    </p>

                    {/* Show email-level errors (token invalid / expired) */}
                    {errors.email && (
                        <div className="mb-5 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/30 text-sm text-red-400">
                            {errors.email}
                        </div>
                    )}

                    <form onSubmit={submit} className="space-y-5">
                        {/* Hidden fields */}
                        <input type="hidden" value={data.token} readOnly />
                        <input type="hidden" value={data.email} readOnly />

                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1.5">
                                Nueva contraseña
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={data.password}
                                    onChange={e => setData('password', e.target.value)}
                                    placeholder="Mínimo 8 caracteres"
                                    autoComplete="new-password"
                                    autoFocus
                                    className={`w-full px-4 py-2.5 pr-10 rounded-xl bg-gray-800 border text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 transition-colors ${
                                        errors.password ? 'border-red-500' : 'border-gray-700'
                                    }`}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300"
                                    aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                                >
                                    {showPassword ? (
                                        <EyeOff className="h-4 w-4" />
                                    ) : (
                                        <Eye className="h-4 w-4" />
                                    )}
                                </button>
                            </div>
                            {errors.password && (
                                <p className="mt-1.5 text-sm text-red-400">{errors.password}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1.5">
                                Confirmar contraseña
                            </label>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                value={data.password_confirmation}
                                onChange={e => setData('password_confirmation', e.target.value)}
                                placeholder="Repite la contraseña"
                                autoComplete="new-password"
                                className={`w-full px-4 py-2.5 rounded-xl bg-gray-800 border text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 transition-colors ${
                                    errors.password_confirmation ? 'border-red-500' : 'border-gray-700'
                                }`}
                            />
                            {errors.password_confirmation && (
                                <p className="mt-1.5 text-sm text-red-400">
                                    {errors.password_confirmation}
                                </p>
                            )}
                        </div>

                        <Button
                            type="submit"
                            disabled={processing}
                            className="w-full h-11 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold"
                        >
                            {processing ? 'Guardando...' : 'Restablecer contraseña'}
                        </Button>
                    </form>

                    <p className="mt-6 text-center text-sm text-gray-400">
                        ¿Recuerdas tu contraseña?{' '}
                        <Link href="/login" className="text-indigo-400 hover:text-indigo-300 font-medium">
                            Inicia sesión
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
