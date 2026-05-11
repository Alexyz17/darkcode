import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/AppLayout';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef } from 'react';
import { Mail, MessageSquare, X as XIcon, ChevronDown, Send, CheckCircle2, Loader2 } from 'lucide-react';
import { FadeInUp } from '@/components/animations/FadeInUp';
import { StaggerChildren, StaggerItem } from '@/components/animations/StaggerChildren';
import { ScaleIn } from '@/components/animations/ScaleIn';
import { SlideIn } from '@/components/animations/SlideIn';

// ── Animated letter-by-letter title ─────────────────────────────────────────

const titleText = 'Hablemos';

function AnimatedTitle() {
    return (
        <motion.h1
            className="text-5xl sm:text-7xl font-extrabold tracking-tight mb-4 leading-tight"
            aria-label={titleText}
        >
            {titleText.split('').map((char, i) => (
                <motion.span
                    key={i}
                    className="inline-block"
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: i * 0.06, ease: 'easeOut' }}
                >
                    {char === ' ' ? ' ' : char}
                </motion.span>
            ))}
        </motion.h1>
    );
}

// ── Geometric background shapes ──────────────────────────────────────────────

function GeometricShapes() {
    return (
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
            {/* Big gradient orb */}
            <div className="absolute -top-40 left-1/2 -translate-x-1/2 h-[500px] w-[500px] rounded-full bg-indigo-600/10 blur-3xl animate-[pulse_6s_ease-in-out_infinite]" />
            {/* Floating squares */}
            <div className="absolute top-24 left-12 h-16 w-16 rounded-xl border border-indigo-500/20 rotate-12 animate-[spin_20s_linear_infinite]" />
            <div className="absolute top-48 right-16 h-10 w-10 rounded-lg border border-purple-500/20 -rotate-6 animate-[spin_15s_linear_infinite_reverse]" />
            <div className="absolute bottom-24 left-1/4 h-8 w-8 rounded-md border border-pink-500/20 rotate-45 animate-[spin_12s_linear_infinite]" />
            <div className="absolute top-1/3 right-1/4 h-24 w-24 rounded-2xl border border-indigo-400/10 rotate-12 animate-[pulse_8s_ease-in-out_infinite]" />
            {/* Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(99,102,241,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.03)_1px,transparent_1px)] bg-[size:48px_48px]" />
        </div>
    );
}

// ── Contact cards ────────────────────────────────────────────────────────────

const contacts = [
    {
        icon: Mail,
        label: 'Email',
        value: 'alexvillar10@gmail.com',
        href: 'mailto:alexvillar10@gmail.com',
        color: 'from-indigo-500 to-purple-600',
        glow: 'group-hover:shadow-indigo-500/30',
        border: 'group-hover:border-indigo-500/50',
    },
    {
        icon: MessageSquare,
        label: 'Discord',
        value: 'Próximamente',
        href: '#',
        color: 'from-indigo-400 to-blue-500',
        glow: 'group-hover:shadow-blue-500/30',
        border: 'group-hover:border-blue-500/50',
    },
    {
        icon: XIcon,
        label: 'Twitter / X',
        value: '@darkcode_dev',
        href: 'https://x.com',
        color: 'from-gray-600 to-gray-800',
        glow: 'group-hover:shadow-gray-400/20',
        border: 'group-hover:border-gray-400/40',
    },
];

function ContactCard({
    icon: Icon,
    label,
    value,
    href,
    color,
    glow,
    border,
}: (typeof contacts)[number]) {
    return (
        <a
            href={href}
            target={href.startsWith('http') ? '_blank' : undefined}
            rel="noopener noreferrer"
            className={`group relative flex flex-col items-center text-center gap-4 p-8 rounded-2xl border border-gray-800 bg-gray-900/60 backdrop-blur-sm
                        transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl ${glow} ${border}`}
            style={{ perspective: 800 }}
        >
            {/* Glowing border top bar */}
            <div className={`absolute top-0 inset-x-0 h-0.5 rounded-t-2xl bg-gradient-to-r ${color} scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left`} />

            <div className={`p-4 rounded-2xl bg-gradient-to-br ${color} shadow-lg`}>
                <Icon className="h-7 w-7 text-white" />
            </div>
            <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-1">{label}</p>
                <p className="text-white font-medium">{value}</p>
            </div>
        </a>
    );
}

// ── Floating label input ─────────────────────────────────────────────────────

function FloatingInput({
    id,
    label,
    type = 'text',
    value,
    onChange,
    required,
}: {
    id: string;
    label: string;
    type?: string;
    value: string;
    onChange: (v: string) => void;
    required?: boolean;
}) {
    const [focused, setFocused] = useState(false);
    const isActive = focused || value.length > 0;

    return (
        <div className="relative">
            <input
                id={id}
                type={type}
                value={value}
                onChange={e => onChange(e.target.value)}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                required={required}
                className={`peer w-full px-4 pt-6 pb-2 rounded-xl bg-gray-900 border transition-colors duration-200 text-white text-sm outline-none
                    ${focused ? 'border-indigo-500 shadow-[0_0_0_3px_rgba(99,102,241,0.12)]' : 'border-gray-700 hover:border-gray-600'}`}
            />
            <label
                htmlFor={id}
                className={`absolute left-4 font-medium pointer-events-none transition-all duration-200
                    ${isActive ? 'top-2 text-[10px] text-indigo-400 uppercase tracking-wide' : 'top-1/2 -translate-y-1/2 text-sm text-gray-500'}`}
            >
                {label}
            </label>
        </div>
    );
}

function FloatingTextarea({
    id,
    label,
    value,
    onChange,
    required,
}: {
    id: string;
    label: string;
    value: string;
    onChange: (v: string) => void;
    required?: boolean;
}) {
    const [focused, setFocused] = useState(false);
    const isActive = focused || value.length > 0;

    return (
        <div className="relative">
            <textarea
                id={id}
                value={value}
                onChange={e => onChange(e.target.value)}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                required={required}
                rows={5}
                className={`peer w-full px-4 pt-7 pb-2 rounded-xl bg-gray-900 border transition-colors duration-200 text-white text-sm outline-none resize-none
                    ${focused ? 'border-indigo-500 shadow-[0_0_0_3px_rgba(99,102,241,0.12)]' : 'border-gray-700 hover:border-gray-600'}`}
            />
            <label
                htmlFor={id}
                className={`absolute left-4 font-medium pointer-events-none transition-all duration-200
                    ${isActive ? 'top-2 text-[10px] text-indigo-400 uppercase tracking-wide' : 'top-4 text-sm text-gray-500'}`}
            >
                {label}
            </label>
        </div>
    );
}

// ── Ripple button ────────────────────────────────────────────────────────────

function RippleButton({
    children,
    loading,
    disabled,
    onClick,
}: {
    children: React.ReactNode;
    loading?: boolean;
    disabled?: boolean;
    onClick?: () => void;
}) {
    const btnRef = useRef<HTMLButtonElement>(null);

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        const btn = btnRef.current;
        if (!btn) return;
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const ripple = document.createElement('span');
        ripple.style.cssText = `position:absolute;border-radius:50%;transform:scale(0);animation:ripple 600ms linear;background:rgba(255,255,255,0.25);
            left:${x - 50}px;top:${y - 50}px;width:100px;height:100px;pointer-events:none`;
        btn.appendChild(ripple);
        setTimeout(() => ripple.remove(), 700);
        onClick?.();
    };

    return (
        <>
            <style>{`@keyframes ripple{to{transform:scale(4);opacity:0}}`}</style>
            <button
                ref={btnRef}
                type="submit"
                disabled={disabled || loading}
                onClick={handleClick}
                className="relative overflow-hidden w-full flex items-center justify-center gap-2 h-12 px-8 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
            >
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                {children}
            </button>
        </>
    );
}

// ── FAQ Accordion ────────────────────────────────────────────────────────────

const faqs = [
    {
        q: '¿Cuánto cuesta el acceso premium?',
        a: 'Durante la Beta, el acceso de por vida cuesta 19€ — un pago único, sin suscripciones ni renovaciones. El precio subirá a 49€ con la versión definitiva.',
    },
    {
        q: '¿Puedo ver el contenido sin registrarme?',
        a: 'Sí. Tienes acceso gratuito a 5 cursos completos sin necesidad de crear una cuenta. Simplemente entra a la sección de cursos y empieza a aprender.',
    },
    {
        q: '¿Qué diferencia hay entre el contenido gratuito y premium?',
        a: 'Los cursos gratuitos cubren fundamentos (Linux, Laravel intro, seguridad básica). El premium desbloquea los cursos avanzados: Docker, n8n, IA, Eloquent avanzado, APIs REST y más.',
    },
    {
        q: '¿Se añadirá más contenido en el futuro?',
        a: 'Sí. La plataforma está en constante crecimiento. El acceso Beta incluye todo el contenido futuro sin coste adicional.',
    },
];

function FAQItem({ q, a, index }: { q: string; a: string; index: number }) {
    const [open, setOpen] = useState(false);

    return (
        <motion.div
            className="border border-gray-800 rounded-xl overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.1 }}
            transition={{ duration: 0.4, delay: index * 0.08 }}
        >
            <button
                onClick={() => setOpen(!open)}
                className="w-full flex items-center justify-between px-6 py-4 text-left text-white font-medium text-sm hover:bg-gray-800/50 transition-colors"
            >
                <span>{q}</span>
                <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.25 }}>
                    <ChevronDown className="h-4 w-4 text-gray-400 shrink-0" />
                </motion.span>
            </button>
            <AnimatePresence initial={false}>
                {open && (
                    <motion.div
                        key="content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="overflow-hidden"
                    >
                        <p className="px-6 pb-5 text-sm text-gray-400 leading-relaxed border-t border-gray-800 pt-3">
                            {a}
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

// ── Main page ────────────────────────────────────────────────────────────────

const subjectOptions = [
    { value: 'general', label: 'Consulta general' },
    { value: 'premium', label: 'Pregunta sobre el acceso Beta' },
    { value: 'bug', label: 'Reportar un problema' },
    { value: 'content', label: 'Sugerencia de contenido' },
    { value: 'other', label: 'Otro' },
];

export default function Contact() {
    const [form, setForm] = useState({ name: '', email: '', subject: 'general', message: '' });
    const [errors, setErrors] = useState<Partial<typeof form>>({});
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const validate = () => {
        const e: Partial<typeof form> = {};
        if (!form.name.trim()) e.name = 'El nombre es obligatorio';
        if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Email no válido';
        if (!form.message.trim() || form.message.length < 10) e.message = 'El mensaje debe tener al menos 10 caracteres';
        setErrors(e);
        return Object.keys(e).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;
        setLoading(true);
        // POST to /contacto route — graceful fallback to mailto
        try {
            const res = await fetch('/contacto', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'X-Requested-With': 'XMLHttpRequest' },
                body: JSON.stringify(form),
            });
            if (res.ok || res.status === 200) {
                setSuccess(true);
            } else {
                // Fallback: open mailto
                window.location.href = `mailto:alexvillar10@gmail.com?subject=${encodeURIComponent(form.subject)}&body=${encodeURIComponent(`De: ${form.name} (${form.email})\n\n${form.message}`)}`;
            }
        } catch {
            window.location.href = `mailto:alexvillar10@gmail.com?subject=${encodeURIComponent(form.subject)}&body=${encodeURIComponent(`De: ${form.name} (${form.email})\n\n${form.message}`)}`;
        } finally {
            setLoading(false);
        }
    };

    return (
        <AppLayout>
            <Head>
                <title>Contacto — DarkCode</title>
                <meta name="description" content="¿Tienes alguna pregunta? Contacta con el equipo de DarkCode por email, Discord o Twitter." />
            </Head>

            {/* ── HERO ────────────────────────────────────────────────────── */}
            <section className="relative overflow-hidden px-4 pt-24 pb-20 sm:px-6 lg:px-8 bg-gray-950">
                <GeometricShapes />
                <div className="relative max-w-3xl mx-auto text-center">
                    <motion.div
                        className="inline-flex items-center gap-2 mb-6 text-xs font-semibold uppercase tracking-widest text-indigo-400 border border-indigo-500/30 bg-indigo-500/10 px-4 py-1.5 rounded-full"
                        initial={{ opacity: 0, scale: 0.85 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <Mail className="h-3.5 w-3.5" /> Contacto
                    </motion.div>

                    <AnimatedTitle />

                    <motion.p
                        className="text-gray-400 text-lg max-w-lg mx-auto leading-relaxed"
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.55 }}
                    >
                        Preguntas, sugerencias, reportes de bugs o simplemente quieres saludar. Estoy disponible por cualquiera de estos canales.
                    </motion.p>
                </div>
            </section>

            {/* ── CONTACT CARDS ───────────────────────────────────────────── */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-950">
                <div className="max-w-4xl mx-auto">
                    <StaggerChildren className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                        {contacts.map((c) => (
                            <StaggerItem key={c.label}>
                                <ContactCard {...c} />
                            </StaggerItem>
                        ))}
                    </StaggerChildren>
                </div>
            </section>

            {/* ── FORM + FAQ ───────────────────────────────────────────────── */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-950 border-t border-gray-800">
                <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">

                    {/* Form */}
                    <SlideIn from="left">
                        <div className="rounded-2xl border border-gray-800 bg-gray-900/60 backdrop-blur-sm p-8">
                            <h2 className="text-2xl font-bold text-white mb-2">Envíame un mensaje</h2>
                            <p className="text-gray-400 text-sm mb-8">Te respondo en menos de 24 horas.</p>

                            <AnimatePresence mode="wait">
                                {success ? (
                                    <motion.div
                                        key="success"
                                        initial={{ opacity: 0, scale: 0.85 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="flex flex-col items-center text-center py-12 gap-4"
                                    >
                                        <div className="p-4 rounded-full bg-emerald-500/20">
                                            <CheckCircle2 className="h-10 w-10 text-emerald-400" />
                                        </div>
                                        <h3 className="text-xl font-bold text-white">¡Mensaje enviado!</h3>
                                        <p className="text-gray-400 text-sm max-w-xs">Gracias por escribirme. Te responderé lo antes posible.</p>
                                        <button
                                            onClick={() => { setSuccess(false); setForm({ name: '', email: '', subject: 'general', message: '' }); }}
                                            className="mt-2 text-sm text-indigo-400 hover:text-indigo-300 underline transition-colors"
                                        >
                                            Enviar otro mensaje
                                        </button>
                                    </motion.div>
                                ) : (
                                    <motion.form
                                        key="form"
                                        onSubmit={handleSubmit}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="space-y-5"
                                        noValidate
                                    >
                                        <StaggerChildren stagger={0.07}>
                                            <StaggerItem>
                                                <FloatingInput
                                                    id="name"
                                                    label="Nombre"
                                                    value={form.name}
                                                    onChange={v => setForm(f => ({ ...f, name: v }))}
                                                    required
                                                />
                                                {errors.name && <p className="text-xs text-red-400 mt-1 ml-1">{errors.name}</p>}
                                            </StaggerItem>

                                            <StaggerItem>
                                                <FloatingInput
                                                    id="email"
                                                    label="Email"
                                                    type="email"
                                                    value={form.email}
                                                    onChange={v => setForm(f => ({ ...f, email: v }))}
                                                    required
                                                />
                                                {errors.email && <p className="text-xs text-red-400 mt-1 ml-1">{errors.email}</p>}
                                            </StaggerItem>

                                            <StaggerItem>
                                                <div className="relative">
                                                    <label htmlFor="subject" className="block text-[10px] font-semibold uppercase tracking-wide text-indigo-400 mb-1.5 ml-1">
                                                        Asunto
                                                    </label>
                                                    <select
                                                        id="subject"
                                                        value={form.subject}
                                                        onChange={e => setForm(f => ({ ...f, subject: e.target.value }))}
                                                        className="w-full px-4 py-3 rounded-xl bg-gray-900 border border-gray-700 text-white text-sm outline-none hover:border-gray-600 focus:border-indigo-500 focus:shadow-[0_0_0_3px_rgba(99,102,241,0.12)] transition-colors appearance-none"
                                                    >
                                                        {subjectOptions.map(o => (
                                                            <option key={o.value} value={o.value}>{o.label}</option>
                                                        ))}
                                                    </select>
                                                    <ChevronDown className="absolute right-4 top-9 h-4 w-4 text-gray-400 pointer-events-none" />
                                                </div>
                                            </StaggerItem>

                                            <StaggerItem>
                                                <FloatingTextarea
                                                    id="message"
                                                    label="Mensaje"
                                                    value={form.message}
                                                    onChange={v => setForm(f => ({ ...f, message: v }))}
                                                    required
                                                />
                                                {errors.message && <p className="text-xs text-red-400 mt-1 ml-1">{errors.message}</p>}
                                            </StaggerItem>

                                            <StaggerItem>
                                                <RippleButton loading={loading} disabled={loading}>
                                                    {loading ? 'Enviando...' : 'Enviar mensaje'}
                                                </RippleButton>
                                            </StaggerItem>
                                        </StaggerChildren>
                                    </motion.form>
                                )}
                            </AnimatePresence>
                        </div>
                    </SlideIn>

                    {/* FAQ */}
                    <SlideIn from="right">
                        <div>
                            <FadeInUp>
                                <h2 className="text-2xl font-bold text-white mb-2">Preguntas frecuentes</h2>
                                <p className="text-gray-400 text-sm mb-8">Respuestas rápidas a las dudas más comunes.</p>
                            </FadeInUp>
                            <div className="space-y-3">
                                {faqs.map((faq, i) => (
                                    <FAQItem key={i} index={i} {...faq} />
                                ))}
                            </div>
                        </div>
                    </SlideIn>
                </div>
            </section>

            {/* ── FINAL CTA ────────────────────────────────────────────────── */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-950 border-t border-gray-800">
                <ScaleIn className="max-w-xl mx-auto text-center">
                    <div className="p-10 rounded-2xl border border-gray-800 bg-gradient-to-br from-gray-900 to-gray-950">
                        <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-indigo-400 border border-indigo-500/30 bg-indigo-500/10 px-4 py-1.5 rounded-full mb-6">
                            <Mail className="h-3.5 w-3.5" /> Contacto directo
                        </div>
                        <h2 className="text-2xl font-bold text-white mb-3">¿Prefieres el email?</h2>
                        <p className="text-gray-400 text-sm mb-6">Escríbeme directamente y te respondo en 24 h.</p>
                        <a
                            href="mailto:alexvillar10@gmail.com"
                            className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-6 py-3 rounded-xl transition-colors text-sm"
                        >
                            <Mail className="h-4 w-4" /> alexvillar10@gmail.com
                        </a>
                    </div>
                </ScaleIn>
            </section>
        </AppLayout>
    );
}
