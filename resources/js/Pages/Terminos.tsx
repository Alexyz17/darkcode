import AppLayout from '@/layouts/AppLayout';
import { useTranslation } from 'react-i18next';
import { FileText } from 'lucide-react';

export default function Terminos() {
    const { i18n } = useTranslation();
    const lang = i18n.language;

    const copy = {
        es: {
            badge: 'Legal',
            title: 'Términos y Condiciones',
            updated: 'Última actualización: mayo 2026',
            sections: [
                { title: '1. Objeto', body: 'Estos términos regulan el acceso y uso del sitio web DarkCode (darkcode.es), gestionado por Alex Villar Gracia. El acceso implica la aceptación de los presentes términos.' },
                { title: '2. Descripción del servicio', body: 'DarkCode ofrece contenido educativo sobre programación, inteligencia artificial y automatización, en formato gratuito (YouTube) y de pago (acceso Beta, productos digitales). Los productos de pago se adquieren a través de Gumroad.' },
                { title: '3. Registro y cuenta', body: 'Para acceder a determinadas funcionalidades es necesario crear una cuenta. El usuario es responsable de mantener la confidencialidad de sus credenciales y de toda la actividad realizada con su cuenta.' },
                { title: '4. Contenido digital y acceso inmediato', body: 'Los productos digitales (acceso Beta, guías, roadmaps) se entregan de forma inmediata tras el pago. Conforme al art. 103.a) del RDL 1/2007 (LGDCU), el derecho de desistimiento no aplica una vez iniciada la descarga o el acceso al contenido.' },
                { title: '5. Uso permitido', body: 'El contenido adquirido es para uso personal y no comercial. Queda prohibida la redistribución, reventa, compartición de credenciales o cualquier uso que perjudique los derechos del autor.' },
                { title: '6. Propiedad intelectual', body: 'Todo el contenido de DarkCode (textos, vídeos, guías, código) es propiedad de Alex Villar Gracia y está protegido por la legislación española e internacional de propiedad intelectual.' },
                { title: '7. Limitación de responsabilidad', body: 'DarkCode no garantiza resultados específicos derivados del uso del contenido. La información se ofrece con fines educativos. El usuario asume la responsabilidad de aplicar los conocimientos adquiridos.' },
                { title: '8. Modificaciones', body: 'Nos reservamos el derecho de modificar estos términos en cualquier momento. Los cambios se comunicarán mediante aviso en el sitio web. El uso continuado implica la aceptación de los nuevos términos.' },
                { title: '9. Legislación aplicable', body: 'Estos términos se rigen por la legislación española. Para cualquier controversia, las partes se someten a los juzgados y tribunales del domicilio del consumidor.' },
                { title: '10. Contacto', body: 'Para cualquier consulta legal: alexvillar10@gmail.com' },
            ],
        },
        en: {
            badge: 'Legal',
            title: 'Terms and Conditions',
            updated: 'Last updated: May 2026',
            sections: [
                { title: '1. Subject', body: 'These terms govern access to and use of the DarkCode website (darkcode.es), managed by Alex Villar Gracia. Access implies acceptance of these terms.' },
                { title: '2. Service description', body: 'DarkCode offers educational content on programming, artificial intelligence and automation, in free (YouTube) and paid (Beta access, digital products) formats. Paid products are purchased through Gumroad.' },
                { title: '3. Account', body: 'Some features require creating an account. The user is responsible for keeping credentials confidential and for all activity carried out with their account.' },
                { title: '4. Digital content and immediate access', body: 'Digital products (Beta access, guides, roadmaps) are delivered immediately after payment. Under EU Directive 2011/83/EU, the right of withdrawal does not apply once download or access to the content has begun.' },
                { title: '5. Permitted use', body: 'Purchased content is for personal, non-commercial use. Redistribution, resale, credential sharing or any use that infringes the author\'s rights is prohibited.' },
                { title: '6. Intellectual property', body: 'All DarkCode content (texts, videos, guides, code) is the property of Alex Villar Gracia and is protected by Spanish and international intellectual property law.' },
                { title: '7. Limitation of liability', body: 'DarkCode does not guarantee specific results from using the content. Information is provided for educational purposes. The user assumes responsibility for applying acquired knowledge.' },
                { title: '8. Modifications', body: 'We reserve the right to modify these terms at any time. Changes will be communicated via notice on the website. Continued use implies acceptance of the new terms.' },
                { title: '9. Applicable law', body: 'These terms are governed by Spanish law. For any dispute, the parties submit to the courts of the consumer\'s domicile.' },
                { title: '10. Contact', body: 'For any legal enquiry: alexvillar10@gmail.com' },
            ],
        },
        ca: {
            badge: 'Legal',
            title: 'Termes i Condicions',
            updated: 'Darrera actualització: maig 2026',
            sections: [
                { title: '1. Objecte', body: 'Aquests termes regulen l\'accés i ús del lloc web DarkCode (darkcode.es), gestionat per Alex Villar Gracia. L\'accés implica l\'acceptació dels presents termes.' },
                { title: '2. Descripció del servei', body: 'DarkCode ofereix contingut educatiu sobre programació, intel·ligència artificial i automatització, en format gratuït (YouTube) i de pagament (accés Beta, productes digitals). Els productes de pagament s\'adquireixen a través de Gumroad.' },
                { title: '3. Compte', body: 'Per accedir a determinades funcionalitats cal crear un compte. L\'usuari és responsable de mantenir la confidencialitat de les seves credencials i de tota l\'activitat realitzada amb el seu compte.' },
                { title: '4. Contingut digital i accés immediat', body: 'Els productes digitals es lliuren de forma immediata després del pagament. Conforme a l\'art. 103.a) del RDL 1/2007 (LGDCU), el dret de desistiment no aplica un cop iniciada la descàrrega o l\'accés al contingut.' },
                { title: '5. Ús permès', body: 'El contingut adquirit és per a ús personal i no comercial. Queda prohibida la redistribució, revenda, compartició de credencials o qualsevol ús que perjudiqui els drets de l\'autor.' },
                { title: '6. Propietat intel·lectual', body: 'Tot el contingut de DarkCode és propietat d\'Alex Villar Gracia i està protegit per la legislació espanyola i internacional de propietat intel·lectual.' },
                { title: '7. Limitació de responsabilitat', body: 'DarkCode no garanteix resultats específics derivats de l\'ús del contingut. La informació s\'ofereix amb fins educatius.' },
                { title: '8. Modificacions', body: 'Ens reservem el dret de modificar aquests termes en qualsevol moment. Els canvis es comunicaran mitjançant avís al lloc web.' },
                { title: '9. Legislació aplicable', body: 'Aquests termes es regeixen per la legislació espanyola. Per a qualsevol controvèrsia, les parts se sotmeten als jutjats del domicili del consumidor.' },
                { title: '10. Contacte', body: 'Per a qualsevol consulta legal: alexvillar10@gmail.com' },
            ],
        },
    };

    const c = copy[lang as keyof typeof copy] ?? copy.es;

    return (
        <AppLayout>
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
                <div className="mb-10">
                    <div className="flex items-center gap-2 text-indigo-500 text-sm font-medium mb-3">
                        <FileText className="h-4 w-4" /> {c.badge}
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
