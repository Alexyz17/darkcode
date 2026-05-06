import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import es from './locales/es.json';
import en from './locales/en.json';
import ca from './locales/ca.json';

const saved = typeof window !== 'undefined' ? localStorage.getItem('lang') : null;

i18n.use(initReactI18next).init({
    resources: { es: { translation: es }, en: { translation: en }, ca: { translation: ca } },
    lng: saved ?? 'es',
    fallbackLng: 'es',
    interpolation: { escapeValue: false },
});

export default i18n;
