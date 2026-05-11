import { Link, usePage, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Code2, Menu, X, ChevronDown, LogOut, User, Sun, Moon, Languages, Gamepad2, Trophy } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import type { SharedProps } from '@/types';

const LANGS = [
    { code: 'es', label: 'Español' },
    { code: 'ca', label: 'Català' },
    { code: 'en', label: 'English' },
];

function useTheme() {
    const [dark, setDark] = useState(() => document.documentElement.classList.contains('dark'));
    const toggle = () => {
        const next = !dark;
        document.documentElement.classList.toggle('dark', next);
        localStorage.setItem('theme', next ? 'dark' : 'light');
        setDark(next);
    };
    return { dark, toggle };
}

export default function AppLayout({ children }: { children: React.ReactNode }) {
    const { auth } = usePage<SharedProps>().props;
    const user = auth.user;
    const { t, i18n } = useTranslation();
    const { dark, toggle: toggleTheme } = useTheme();

    const [menuOpen, setMenuOpen] = useState(false);
    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const [langMenuOpen, setLangMenuOpen] = useState(false);
    const userMenuRef = useRef<HTMLDivElement>(null);
    const langMenuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) setUserMenuOpen(false);
            if (langMenuRef.current && !langMenuRef.current.contains(e.target as Node)) setLangMenuOpen(false);
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, []);

    const changeLang = (code: string) => {
        i18n.changeLanguage(code);
        localStorage.setItem('lang', code);
        setLangMenuOpen(false);
    };

    const logout = () => router.post('/logout');

    return (
        <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-white transition-colors">
            <nav className="border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-950/80 backdrop-blur-md sticky top-0 z-50 transition-colors">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        {/* Logo */}
                        <Link href="/" className="flex items-center gap-2 font-bold text-xl">
                            <Code2 className="h-6 w-6 text-indigo-500" />
                            <span>DarkCode</span>
                        </Link>

                        {/* Nav links */}
                        <div className="hidden md:flex items-center gap-6">
                            <Link href="/contenido" className="text-gray-500 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors text-sm">
                                {t('nav.content')}
                            </Link>
                            <Link href="/beta" className="text-amber-500 hover:text-amber-400 transition-colors text-sm font-medium">
                                Beta
                            </Link>
                            <Link href="/productos" className="text-gray-500 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors text-sm">
                                {t('nav.products')}
                            </Link>
                            <Link href="/apoya" className="text-gray-500 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors text-sm">
                                {t('nav.support')}
                            </Link>
                            <Link href="/contacto" className="text-gray-500 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors text-sm">
                                {i18n.language === 'en' ? 'Contact' : i18n.language === 'ca' ? 'Contacte' : 'Contacto'}
                            </Link>
                        </div>

                        {/* Right controls */}
                        <div className="hidden md:flex items-center gap-2">
                            {/* Games & Ranking — visible but compact */}
                            <div className="flex items-center gap-1 mr-1 border-r border-gray-200 dark:border-gray-700 pr-3">
                                <Link href="/juegos"
                                    className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium text-indigo-500 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 transition-colors">
                                    <Gamepad2 className="h-3.5 w-3.5" />
                                    {t('nav.games')}
                                </Link>
                                <Link href="/ranking"
                                    className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium text-amber-500 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-900/30 transition-colors">
                                    <Trophy className="h-3.5 w-3.5" />
                                    {t('nav.ranking')}
                                </Link>
                            </div>

                            {/* Theme toggle */}
                            <button onClick={toggleTheme} className="p-2 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                                {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                            </button>

                            {/* Language picker */}
                            <div className="relative" ref={langMenuRef}>
                                <button onClick={() => setLangMenuOpen(!langMenuOpen)} className="p-2 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors flex items-center gap-1">
                                    <Languages className="h-4 w-4" />
                                    <span className="text-xs uppercase font-medium">{i18n.language}</span>
                                </button>
                                {langMenuOpen && (
                                    <div className="absolute right-0 mt-2 w-36 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-xl py-1 z-50">
                                        {LANGS.map(l => (
                                            <button key={l.code} onClick={() => changeLang(l.code)}
                                                className={`w-full text-left px-3 py-2 text-sm transition-colors ${i18n.language === l.code ? 'text-indigo-500 font-medium' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'}`}>
                                                {l.label}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* User */}
                            {user ? (
                                <div className="relative" ref={userMenuRef}>
                                    <button onClick={() => setUserMenuOpen(!userMenuOpen)}
                                        className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                                        <div className="h-7 w-7 rounded-full bg-indigo-600 flex items-center justify-center text-xs font-bold text-white">
                                            {user.name.charAt(0).toUpperCase()}
                                        </div>
                                        <span className="text-sm">{user.name}</span>
                                        <ChevronDown className="h-3.5 w-3.5 text-gray-400" />
                                    </button>
                                    {userMenuOpen && (
                                        <div className="absolute right-0 mt-2 w-52 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-xl py-1 z-50">
                                            <div className="px-3 py-2 border-b border-gray-200 dark:border-gray-800">
                                                <p className="text-xs text-gray-400">{t('nav.connectedAs')}</p>
                                                <p className="text-sm font-medium truncate">{user.email}</p>
                                            </div>
                                            <Link href="/dashboard" onClick={() => setUserMenuOpen(false)}
                                                className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                                                <User className="h-4 w-4" /> {t('nav.dashboard')}
                                            </Link>
                                            <button onClick={logout}
                                                className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-500 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                                                <LogOut className="h-4 w-4" /> {t('nav.logout')}
                                            </button>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <>
                                    <Button variant="ghost" size="sm" asChild>
                                        <Link href="/login">{t('nav.login')}</Link>
                                    </Button>
                                    <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700 text-white" asChild>
                                        <Link href="/register">{t('nav.register')}</Link>
                                    </Button>
                                </>
                            )}
                        </div>

                        {/* Mobile burger */}
                        <button className="md:hidden text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white" onClick={() => setMenuOpen(!menuOpen)}>
                            {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>

                {/* Mobile menu */}
                {menuOpen && (
                    <div className="md:hidden border-t border-gray-200 dark:border-gray-800 py-4 px-4 space-y-3 bg-white dark:bg-gray-950">
                        <Link href="/contenido" className="block text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white py-2" onClick={() => setMenuOpen(false)}>{t('nav.content')}</Link>
                        <Link href="/beta" className="block text-amber-500 py-2 font-medium" onClick={() => setMenuOpen(false)}>Beta</Link>
                        <Link href="/productos" className="block text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white py-2" onClick={() => setMenuOpen(false)}>{t('nav.products')}</Link>
                        <Link href="/apoya" className="block text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white py-2" onClick={() => setMenuOpen(false)}>{t('nav.support')}</Link>
                        <Link href="/contacto" className="block text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white py-2" onClick={() => setMenuOpen(false)}>{t('nav.contact')}</Link>
                        <div className="flex items-center gap-2 py-1">
                            <Link href="/juegos" onClick={() => setMenuOpen(false)}
                                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-indigo-500 bg-indigo-50 dark:bg-indigo-900/30 transition-colors">
                                <Gamepad2 className="h-3.5 w-3.5" /> {t('nav.games')}
                            </Link>
                            <Link href="/ranking" onClick={() => setMenuOpen(false)}
                                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-amber-500 bg-amber-50 dark:bg-amber-900/30 transition-colors">
                                <Trophy className="h-3.5 w-3.5" /> {t('nav.ranking')}
                            </Link>
                        </div>
                        <div className="flex items-center gap-3 pt-1 pb-2">
                            <button onClick={toggleTheme} className="p-2 rounded-lg text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                                {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                            </button>
                            {LANGS.map(l => (
                                <button key={l.code} onClick={() => changeLang(l.code)}
                                    className={`text-xs px-2 py-1 rounded font-medium transition-colors ${i18n.language === l.code ? 'text-indigo-500 bg-indigo-50 dark:bg-indigo-900/30' : 'text-gray-500 dark:text-gray-400'}`}>
                                    {l.code.toUpperCase()}
                                </button>
                            ))}
                        </div>
                        {user ? (
                            <>
                                <p className="text-sm text-gray-500 dark:text-gray-400">{user.name} · {user.email}</p>
                                <Link href="/dashboard" className="block text-sm py-2 text-gray-700 dark:text-gray-300" onClick={() => setMenuOpen(false)}>{t('nav.dashboard')}</Link>
                                <button onClick={logout} className="block w-full text-left text-sm py-2 text-red-500">{t('nav.logout')}</button>
                            </>
                        ) : (
                            <div className="flex gap-3">
                                <Button variant="outline" size="sm" className="flex-1" asChild><Link href="/login">{t('nav.login')}</Link></Button>
                                <Button size="sm" className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white" asChild><Link href="/register">{t('nav.register')}</Link></Button>
                            </div>
                        )}
                    </div>
                )}
            </nav>

            <main>{children}</main>

            <footer className="border-t border-gray-200 dark:border-gray-800 py-12 mt-20 transition-colors">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-10">
                        {/* Brand */}
                        <div>
                            <div className="flex items-center gap-2 font-bold text-lg mb-3">
                                <Code2 className="h-5 w-5 text-indigo-500" />
                                <span className="text-gray-900 dark:text-white">DarkCode</span>
                            </div>
                            <p className="text-sm text-gray-400 leading-relaxed max-w-xs">
                                {i18n.language === 'en'
                                    ? 'Practical AI, coding and automation. Real projects for your portfolio.'
                                    : i18n.language === 'ca'
                                    ? 'IA pràctica, programació i automatització. Projectes reals per al teu portfolio.'
                                    : 'IA práctica, programación y automatización. Proyectos reales para tu portfolio.'}
                            </p>
                        </div>

                        {/* Nav */}
                        <div>
                            <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3">
                                {i18n.language === 'en' ? 'Content' : 'Contenido'}
                            </p>
                            <ul className="space-y-2">
                                <li><Link href="/contenido" className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">{t('nav.content')}</Link></li>
                                <li><Link href="/beta" className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">Beta — 19€</Link></li>
                                <li><Link href="/productos" className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">{t('nav.products')}</Link></li>
                                <li><Link href="/apoya" className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">{t('nav.support')}</Link></li>
                                <li><Link href="/contacto" className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">{i18n.language === 'en' ? 'Contact' : i18n.language === 'ca' ? 'Contacte' : 'Contacto'}</Link></li>
                            </ul>
                        </div>

                        {/* Legal */}
                        <div>
                            <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3">Legal</p>
                            <ul className="space-y-2">
                                <li><Link href="/privacidad" className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">{i18n.language === 'en' ? 'Privacy Policy' : i18n.language === 'ca' ? 'Política de Privacitat' : 'Política de Privacidad'}</Link></li>
                                <li><Link href="/terminos" className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">{i18n.language === 'en' ? 'Terms of Use' : i18n.language === 'ca' ? 'Termes d\'Ús' : 'Términos de Uso'}</Link></li>
                                <li><Link href="/cookies" className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">{i18n.language === 'en' ? 'Cookie Policy' : i18n.language === 'ca' ? 'Política de Cookies' : 'Política de Cookies'}</Link></li>
                            </ul>
                        </div>
                    </div>

                    <div className="border-t border-gray-100 dark:border-gray-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2">
                        <p className="text-xs text-gray-400">
                            © {new Date().getFullYear()} DarkCode · Alex Villar Gracia · {i18n.language === 'en' ? 'All rights reserved.' : i18n.language === 'ca' ? 'Tots els drets reservats.' : 'Todos los derechos reservados.'}
                        </p>
                        <p className="text-xs text-gray-400">alexvillar10@gmail.com</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
