import { createInertiaApp } from '@inertiajs/react';
import { createRoot } from 'react-dom/client';
import './i18n';
import '../css/app.css';

// Apply saved theme before first render to avoid flash
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') {
    document.documentElement.classList.remove('dark');
} else {
    document.documentElement.classList.add('dark');
}

createInertiaApp({
    resolve: (name) => {
        const pages = import.meta.glob('./Pages/**/*.tsx', { eager: true });
        return pages[`./Pages/${name}.tsx`] as any;
    },
    setup({ el, App, props }) {
        createRoot(el).render(<App {...props} />);
    },
});
