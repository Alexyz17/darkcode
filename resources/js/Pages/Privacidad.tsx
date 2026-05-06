import AppLayout from '@/layouts/AppLayout';
import { useTranslation } from 'react-i18next';
import { Shield } from 'lucide-react';

export default function Privacidad() {
    const { i18n } = useTranslation();
    const lang = i18n.language;

    const copy = {
        es: {
            badge: 'Legal',
            title: 'Política de Privacidad',
            updated: 'Última actualización: mayo 2026',
            sections: [
                {
                    title: '1. Responsable del tratamiento',
                    body: 'Alex Villar Gracia, con domicilio en España, es el responsable del tratamiento de los datos personales recogidos a través de este sitio web (darkcode.es). Contacto: alexvillar10@gmail.com'
                },
                {
                    title: '2. Datos que recogemos',
                    body: 'Recogemos únicamente los datos necesarios para el funcionamiento del servicio: nombre completo y dirección de correo electrónico al crear una cuenta. No recogemos datos bancarios ni de pago (estos son gestionados íntegramente por Gumroad).'
                },
                {
                    title: '3. Finalidad del tratamiento',
                    body: 'Los datos se usan exclusivamente para: gestionar tu cuenta de usuario, enviarte comunicaciones relacionadas con el servicio al que te hayas suscrito, y cumplir con obligaciones legales.'
                },
                {
                    title: '4. Base legal',
                    body: 'El tratamiento se basa en la ejecución del contrato de servicio (art. 6.1.b RGPD) y, cuando sea necesario, en tu consentimiento expreso (art. 6.1.a RGPD).'
                },
                {
                    title: '5. Conservación de datos',
                    body: 'Los datos se conservan mientras mantengas tu cuenta activa. Puedes solicitar la eliminación en cualquier momento enviando un email a alexvillar10@gmail.com.'
                },
                {
                    title: '6. Tus derechos',
                    body: 'Conforme al RGPD tienes derecho a acceder, rectificar, suprimir, oponerte y portar tus datos. Para ejercerlos escríbenos a alexvillar10@gmail.com. También puedes reclamar ante la Agencia Española de Protección de Datos (aepd.es).'
                },
                {
                    title: '7. Transferencias internacionales',
                    body: 'Los pagos se procesan a través de Gumroad Inc. (EE.UU.), que cumple con las garantías adecuadas del RGPD. No cedemos tus datos a terceros para fines comerciales.'
                },
                {
                    title: '8. Seguridad',
                    body: 'Aplicamos medidas técnicas y organizativas para proteger tus datos: conexión cifrada HTTPS, contraseñas almacenadas con hash bcrypt, y acceso restringido a la base de datos.'
                },
            ],
        },
        en: {
            badge: 'Legal',
            title: 'Privacy Policy',
            updated: 'Last updated: May 2026',
            sections: [
                { title: '1. Data controller', body: 'Alex Villar Gracia, based in Spain, is the data controller for personal data collected through this website (darkcode.es). Contact: alexvillar10@gmail.com' },
                { title: '2. Data we collect', body: 'We only collect data necessary for the service: full name and email address when creating an account. We do not collect banking or payment data (these are handled entirely by Gumroad).' },
                { title: '3. Purpose', body: 'Data is used exclusively to: manage your user account, send communications related to the service you have subscribed to, and comply with legal obligations.' },
                { title: '4. Legal basis', body: 'Processing is based on the performance of the service contract (Art. 6.1.b GDPR) and, where necessary, your explicit consent (Art. 6.1.a GDPR).' },
                { title: '5. Data retention', body: 'Data is retained while your account is active. You can request deletion at any time by emailing alexvillar10@gmail.com.' },
                { title: '6. Your rights', body: 'Under GDPR you have the right to access, rectify, erase, object and port your data. To exercise them write to alexvillar10@gmail.com. You can also complain to your national data protection authority.' },
                { title: '7. International transfers', body: 'Payments are processed through Gumroad Inc. (USA), which complies with GDPR adequate safeguards. We do not share your data with third parties for commercial purposes.' },
                { title: '8. Security', body: 'We apply technical and organisational measures to protect your data: HTTPS encrypted connection, bcrypt-hashed passwords, and restricted database access.' },
            ],
        },
        ca: {
            badge: 'Legal',
            title: 'Política de Privacitat',
            updated: 'Darrera actualització: maig 2026',
            sections: [
                { title: '1. Responsable del tractament', body: 'Alex Villar Gracia, amb domicili a Espanya, és el responsable del tractament de les dades personals recollides a través d\'aquest lloc web (darkcode.es). Contacte: alexvillar10@gmail.com' },
                { title: '2. Dades que recollim', body: 'Recollim únicament les dades necessàries per al funcionament del servei: nom complet i adreça de correu electrònic en crear un compte. No recollim dades bancàries ni de pagament (aquests els gestiona íntegrament Gumroad).' },
                { title: '3. Finalitat del tractament', body: 'Les dades s\'utilitzen exclusivament per: gestionar el teu compte d\'usuari, enviar-te comunicacions relacionades amb el servei al qual t\'hagis subscrit, i complir amb obligacions legals.' },
                { title: '4. Base legal', body: 'El tractament es basa en l\'execució del contracte de servei (art. 6.1.b RGPD) i, quan sigui necessari, en el teu consentiment exprés (art. 6.1.a RGPD).' },
                { title: '5. Conservació de dades', body: 'Les dades es conserven mentre mantinguis el teu compte actiu. Pots sol·licitar l\'eliminació en qualsevol moment enviant un email a alexvillar10@gmail.com.' },
                { title: '6. Els teus drets', body: 'Conforme al RGPD tens dret a accedir, rectificar, suprimir, oposar-te i portar les teves dades. Per exercir-los escriu-nos a alexvillar10@gmail.com. També pots reclamar davant l\'Agència Espanyola de Protecció de Dades (aepd.es).' },
                { title: '7. Transferències internacionals', body: 'Els pagaments es processen a través de Gumroad Inc. (EUA), que compleix amb les garanties adequades del RGPD. No cedim les teves dades a tercers per a fins comercials.' },
                { title: '8. Seguretat', body: 'Apliquem mesures tècniques i organitzatives per protegir les teves dades: connexió xifrada HTTPS, contrasenyes emmagatzemades amb hash bcrypt, i accés restringit a la base de dades.' },
            ],
        },
    };

    const c = copy[lang as keyof typeof copy] ?? copy.es;

    return (
        <AppLayout>
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
                <div className="mb-10">
                    <div className="flex items-center gap-2 text-indigo-500 text-sm font-medium mb-3">
                        <Shield className="h-4 w-4" /> {c.badge}
                    </div>
                    <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">{c.title}</h1>
                    <p className="text-sm text-gray-400">{c.updated}</p>
                </div>
                <div className="space-y-8">
                    {c.sections.map((s, i) => (
                        <div key={i}>
                            <h2 className="text-base font-bold text-gray-900 dark:text-white mb-2">{s.title}</h2>
                            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{s.body}</p>
                        </div>
                    ))}
                </div>
            </div>
        </AppLayout>
    );
}
