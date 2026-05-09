import LessonLayout from '@/layouts/LessonLayout';
import { Head, Link } from '@inertiajs/react';
import { Lock, CheckCircle2 } from 'lucide-react';

const modules = [
    { id: '/lecciones/maquinas-virtuales', title: '¿Qué es una VM?', free: true },
    { id: '#', title: 'VirtualBox — instalación y setup', free: false },
    { id: '#', title: 'Networking en VMs', free: false },
    { id: '#', title: 'Snapshots y clonación', free: false },
    { id: '#', title: 'Vagrant — VMs como código', free: false },
    { id: '#', title: 'Servidor LAMP en VM', free: false },
    { id: '#', title: 'VM vs Docker — cuándo usar cada uno', free: false },
];

const betaFeatures = [
    'VirtualBox 7 — instalación en Windows/Mac/Linux',
    'Redes: NAT, bridge, host-only explicadas',
    'Snapshots para rollback instantáneo',
    'Vagrant — definir VMs con Vagrantfile',
    'Provisioning con shell scripts',
    'Stack LAMP completo en VM Ubuntu 24.04',
    'Optimización de rendimiento (RAM, CPU, disco)',
    'Comparativa práctica VM vs Docker por caso de uso',
];

export default function MaquinasVirtualesTeaser() {
    return (
        <LessonLayout
            title="Máquinas Virtuales con Linux"
            description="Configura y gestiona VMs con VirtualBox y Vagrant. Networking, snapshots y entornos reproducibles."
            duration="4h 20min"
            lessons={22}
            level="Intermedio"
            premium={true}
            modules={modules}
            activeModule="/lecciones/maquinas-virtuales"
            category="Servidores"
        >
            <Head>
                <title>Máquinas Virtuales con Linux — DarkCode Premium</title>
                <meta name="description" content="Aprende a crear y gestionar VMs con VirtualBox y Vagrant: networking, snapshots y entornos de desarrollo reproducibles." />
            </Head>

            <h1>Máquinas Virtuales con Linux</h1>

            <blockquote>
                Las máquinas virtuales siguen siendo imprescindibles en 2026 — para aislar entornos de desarrollo, testear configuraciones de servidor sin riesgo, y aprender Linux sin miedo a romper tu máquina principal. VirtualBox es gratuito, potente y corre en Windows, Mac y Linux.
            </blockquote>

            <h2>¿Qué es una máquina virtual?</h2>
            <p>
                Una VM (Virtual Machine) es un ordenador completo simulado por software dentro de tu ordenador real. El software que la gestiona se llama <strong>hipervisor</strong>. VirtualBox es el hipervisor tipo 2 más popular (corre sobre tu OS), mientras que VMware ESXi o KVM son tipo 1 (corren directamente sobre el hardware, para servidores).
            </p>

            <pre><code>{`Arquitectura:
┌─────────────────────────────────┐
│  VM Ubuntu 24.04 (guest)        │
│  ├── Nginx, PHP, MySQL          │
│  └── Tu app Laravel             │
├─────────────────────────────────┤
│  VirtualBox (hipervisor)        │
├─────────────────────────────────┤
│  Windows 11 / macOS (host)      │
└─────────────────────────────────┘

VM vs Docker:
- VM: SO completo, mayor aislamiento, más pesada (~1-2 GB RAM mínimo)
- Docker: comparte el kernel del host, más ligero, más rápido de arrancar
- Cuándo usar VM: testear configuraciones de OS, entornos legacy, seguridad máxima
- Cuándo usar Docker: microservicios, CI/CD, desarrollo del día a día`}</code></pre>

            <h3>Instalación rápida de VirtualBox</h3>
            <pre><code>{`# Ubuntu/Debian
sudo apt install virtualbox virtualbox-ext-pack

# macOS (con Homebrew)
brew install --cask virtualbox virtualbox-extension-pack

# Windows
# Descargar desde virtualbox.org → instalador .exe

# Verificar
VBoxManage --version   # 7.x.x`}</code></pre>

            <h3>Crear tu primera VM desde CLI</h3>
            <pre><code>{`# Crear VM Ubuntu 24.04 Server
VBoxManage createvm --name "ubuntu-dev" --ostype Ubuntu_64 --register

# Configurar recursos
VBoxManage modifyvm "ubuntu-dev" --memory 2048 --cpus 2

# Crear disco duro virtual (20 GB)
VBoxManage createhd --filename ~/VMs/ubuntu-dev.vdi --size 20480

# Adjuntar controlador y disco
VBoxManage storagectl "ubuntu-dev" --name "SATA" --add sata
VBoxManage storageattach "ubuntu-dev" --storagectl "SATA" \
    --port 0 --device 0 --type hdd --medium ~/VMs/ubuntu-dev.vdi

# Adjuntar ISO de instalación
VBoxManage storageattach "ubuntu-dev" --storagectl "SATA" \
    --port 1 --device 0 --type dvddrive \
    --medium ubuntu-24.04-server.iso

# Arrancar
VBoxManage startvm "ubuntu-dev"`}</code></pre>

            {/* ── Paywall ── */}
            <div className="not-prose my-12">
                <div className="relative rounded-2xl border border-amber-500/30 bg-amber-500/5 overflow-hidden">
                    <div className="px-8 py-6 blur-sm pointer-events-none select-none opacity-50">
                        <h3 className="text-xl font-bold mb-3">Vagrant — VMs como código</h3>
                        <pre className="bg-gray-900 rounded-xl p-4 text-sm text-gray-300">
{`# Vagrantfile
Vagrant.configure("2") do |config|
  config.vm.box = "ubuntu/jammy64"
  config.vm.network "private_network", ip: "192.168.56.10"
  config.vm.provider "virtualbox" do |vb|
    vb.memory = "2048"
    vb.cpus = 2
  end
  config.vm.provision "shell", path: "provision.sh"
end

# vagrant up      → crear y provisionar
# vagrant ssh     → entrar
# vagrant destroy → eliminar`}
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
