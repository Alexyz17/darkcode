import LessonLayout from '@/layouts/LessonLayout';
import { Head } from '@inertiajs/react';

const modules = [
    { id: '/lecciones/linux-esencial', title: '¿Qué es Linux?', free: true },
    { id: '/lecciones/linux-esencial#terminal', title: 'El terminal', free: true },
    { id: '/lecciones/linux-esencial#archivos', title: 'Gestión de archivos', free: true },
    { id: '/lecciones/linux-esencial#permisos', title: 'Permisos', free: true },
    { id: '/lecciones/linux-esencial#procesos', title: 'Procesos y servicios', free: true },
    { id: '/lecciones/linux-esencial#redes', title: 'Redes y SSH', free: true },
];

export default function LinuxEsencial() {
    return (
        <LessonLayout
            title="Introducción a Linux"
            description="Aprende a moverte por la terminal, gestionar archivos y entender el sistema operativo más usado en servidores."
            duration="2h 30min"
            lessons={12}
            level="Básico"
            premium={false}
            modules={modules}
            activeModule="/lecciones/linux-esencial"
            nextHref="/lecciones/comandos-linux"
            category="Linux"
        >
            <Head>
                <title>Introducción a Linux — DarkCode</title>
                <meta name="description" content="Aprende Linux desde cero: terminal, archivos, permisos, procesos y redes. Lección gratuita y actualizada 2026." />
            </Head>

            <h1>Introducción a Linux</h1>

            <blockquote>
                Linux ejecuta el <strong>96.4% de los servidores web del mundo</strong>, el 100% de los superordenadores del Top500 y es la base de Android, Docker y la nube. Aprenderlo no es opcional si quieres trabajar en tecnología.
            </blockquote>

            {/* ── 1. Qué es Linux ── */}
            <h2 id="que-es">¿Qué es Linux?</h2>
            <p>
                Linux es un <strong>kernel de sistema operativo</strong> de código abierto creado por Linus Torvalds en 1991. El kernel es la capa de software que comunica los programas con el hardware. Cuando decimos "sistema Linux" nos referimos en realidad a <strong>GNU/Linux</strong>: el kernel Linux más las herramientas GNU (ls, grep, bash, etc.).
            </p>

            <h3>¿Por qué tantos servidores usan Linux?</h3>
            <ul>
                <li><strong>Gratuito</strong> — sin licencias de miles de euros por servidor</li>
                <li><strong>Estable</strong> — servidores con años de uptime sin reinicios</li>
                <li><strong>Seguro</strong> — modelo de permisos granular, ampliamente auditado</li>
                <li><strong>Eficiente</strong> — consume muchos menos recursos que Windows Server</li>
                <li><strong>Automatizable</strong> — todo se puede scripted desde la terminal</li>
            </ul>

            <h3>Distribuciones populares en 2026</h3>
            <p>Una <strong>distribución (distro)</strong> es Linux + herramientas preinstaladas + gestor de paquetes. Las más relevantes:</p>
            <ul>
                <li><strong>Ubuntu 24.04 LTS</strong> — la más usada para desarrollo y servidores (soporte hasta 2029)</li>
                <li><strong>Debian 12 "Bookworm"</strong> — la base estable que usa Ubuntu</li>
                <li><strong>Alpine Linux</strong> — ultra ligera, la reina de los contenedores Docker (solo 5MB)</li>
                <li><strong>CentOS Stream 10</strong> — para entornos enterprise RHEL-compatibles</li>
                <li><strong>Arch Linux</strong> — para usuarios avanzados que quieren control total</li>
            </ul>

            {/* ── 2. El terminal ── */}
            <h2 id="terminal">El terminal</h2>
            <p>
                El terminal (o shell) es la interfaz de texto para interactuar con Linux. Es mucho más potente que cualquier interfaz gráfica porque permite automatizar, encadenar comandos y gestionar servidores remotos.
            </p>
            <p>El shell más común es <strong>Bash</strong> (Bourne Again SHell). En macOS y muchas distros modernas también verás <strong>Zsh</strong>.</p>

            <h3>Anatomía de un comando</h3>
            <pre><code>{`comando [opciones] [argumentos]

ls -la /var/log
│   │    └── argumento: directorio a listar
│   └──────── opciones: -l (formato largo) -a (incluir ocultos)
└──────────── comando: listar archivos`}</code></pre>

            <h3>Orientarte en el sistema</h3>
            <pre><code>{`pwd                  # Print Working Directory — dónde estás
ls                   # Listar archivos del directorio actual
ls -la               # Con detalles + archivos ocultos
ls -lh               # Tamaño en formato legible (K, M, G)
ls -lt               # Ordenado por fecha de modificación
cd /var/www          # Cambiar a ruta absoluta
cd carpeta           # Entrar a subcarpeta
cd ..                # Subir un nivel
cd ~                 # Ir al home del usuario
cd -                 # Volver al directorio anterior
which bash           # Ver ruta de un comando`}</code></pre>

            <h3>Ayuda integrada</h3>
            <pre><code>{`man ls               # Manual completo del comando
ls --help            # Ayuda resumida
tldr ls              # Ejemplos prácticos (instalar: npm i -g tldr)`}</code></pre>

            {/* ── 3. Gestión de archivos ── */}
            <h2 id="archivos">Gestión de archivos</h2>

            <h3>Crear y ver</h3>
            <pre><code>{`mkdir proyecto          # Crear directorio
mkdir -p a/b/c          # Crear estructura anidada de una vez
touch index.php         # Crear archivo vacío
echo "Hola" > f.txt     # Crear archivo con contenido (sobreescribe)
echo "Más" >> f.txt     # Añadir al final (append)
cat f.txt               # Ver contenido completo
less f.txt              # Ver paginado (q para salir, / para buscar)
head -n 20 f.txt        # Primeras 20 líneas
tail -n 20 f.txt        # Últimas 20 líneas
tail -f /var/log/syslog # Seguir log en tiempo real`}</code></pre>

            <h3>Copiar, mover y eliminar</h3>
            <pre><code>{`cp origen.txt destino.txt      # Copiar archivo
cp -r dir_origen dir_destino   # Copiar directorio completo
mv origen destino              # Mover o renombrar
rm archivo.txt                 # Eliminar archivo
rm -rf carpeta/                # ⚠️ Eliminar directorio y todo su contenido
                               # (sin confirmación, irreversible)`}</code></pre>

            <h3>Buscar</h3>
            <pre><code>{`find / -name "*.log"             # Buscar archivos por nombre
find /var -type f -size +100M   # Archivos mayores de 100MB
find . -name "*.php" -mtime -7  # PHP modificados en últimos 7 días
grep -r "error" /var/log/       # Buscar texto en archivos
grep -rn "función" src/         # Con número de línea`}</code></pre>

            {/* ── 4. Permisos ── */}
            <h2 id="permisos">Permisos en Linux</h2>
            <p>
                Linux usa un sistema de permisos basado en tres tipos de acceso (<strong>r</strong>ead, <strong>w</strong>rite, e<strong>x</strong>ecute) para tres categorías de usuarios (propietario, grupo, otros).
            </p>

            <h3>Leer los permisos</h3>
            <pre><code>{`ls -la
# -rwxr-xr-- 1 alex devs archivo.txt
# │└──┘└──┘└──┘
# │  │   │   └── Otros:       r-- = solo lectura (4)
# │  │   └────── Grupo:       r-x = lectura + ejecución (5)
# │  └────────── Propietario: rwx = todo (7)
# └──────────── Tipo: - archivo, d directorio, l symlink`}</code></pre>

            <h3>Cambiar permisos con chmod</h3>
            <pre><code>{`# Notación numérica: r=4, w=2, x=1
chmod 755 script.sh    # rwxr-xr-x → propietario todo, grupo y otros leer+ejecutar
chmod 644 config.php   # rw-r--r-- → propietario leer+escribir, resto solo leer
chmod 600 .env         # rw------- → solo el propietario puede leer/escribir
chmod +x deploy.sh     # Añadir permiso de ejecución
chmod -w readonly.txt  # Quitar permiso de escritura
chmod -R 755 public/   # Aplicar recursivamente`}</code></pre>

            <h3>Cambiar propietario con chown</h3>
            <pre><code>{`chown alex archivo.txt          # Cambiar propietario
chown alex:developers f.txt    # Cambiar propietario y grupo
chown -R www-data /var/www/    # Recursivo (típico en servidores web)
sudo chown root:root /etc/hosts`}</code></pre>

            {/* ── 5. Procesos ── */}
            <h2 id="procesos">Procesos y servicios</h2>

            <h3>Ver procesos</h3>
            <pre><code>{`ps aux                  # Listar todos los procesos
ps aux | grep nginx     # Filtrar por nombre
top                     # Monitor dinámico (q para salir)
htop                    # Monitor mejorado y visual (apt install htop)`}</code></pre>

            <h3>Gestionar procesos</h3>
            <pre><code>{`kill 1234               # Enviar SIGTERM al proceso con PID 1234
kill -9 1234            # SIGKILL: forzar terminación inmediata
pkill nginx             # Terminar todos los procesos por nombre
killall php-fpm         # Similar a pkill`}</code></pre>

            <h3>Servicios con systemd (Ubuntu/Debian 2024+)</h3>
            <pre><code>{`systemctl start nginx       # Iniciar servicio
systemctl stop nginx        # Parar servicio
systemctl restart nginx     # Reiniciar
systemctl reload nginx      # Recargar config sin cortar conexiones
systemctl status nginx      # Ver estado y logs recientes
systemctl enable nginx      # Arrancar automáticamente al iniciar el sistema
systemctl disable nginx     # Deshabilitar arranque automático
journalctl -u nginx -f      # Ver logs del servicio en tiempo real`}</code></pre>

            {/* ── 6. Redes ── */}
            <h2 id="redes">Redes y SSH</h2>

            <h3>Información de red</h3>
            <pre><code>{`ip addr                    # Ver interfaces y direcciones IP
ip route                   # Ver tabla de rutas
ss -tlnp                   # Ver puertos en escucha (reemplaza netstat)
ping google.com            # Test conectividad
curl ifconfig.me           # Ver tu IP pública`}</code></pre>

            <h3>Descargar y consumir APIs</h3>
            <pre><code>{`curl https://api.example.com              # Petición GET
curl -X POST -d '{"key":"val"}' url       # POST con JSON
curl -H "Authorization: Bearer TOKEN" url # Con cabecera
wget https://example.com/archivo.zip      # Descargar archivo
wget -O nombre.zip https://url/f.zip      # Descargar con nombre`}</code></pre>

            <h3>SSH — Acceso remoto seguro</h3>
            <pre><code>{`ssh usuario@192.168.1.10            # Conectar por IP
ssh usuario@miservidor.com          # Conectar por dominio
ssh -p 2222 usuario@host            # Puerto personalizado
ssh -i ~/.ssh/mi_clave usuario@host # Con clave privada específica

# Copiar archivos entre local y remoto
scp archivo.txt usuario@host:/ruta/remota/
scp -r carpeta/ usuario@host:/ruta/
scp usuario@host:/ruta/archivo.txt ./local/

# Generar par de claves SSH (recomendado Ed25519 en 2026)
ssh-keygen -t ed25519 -C "tu@email.com"
ssh-copy-id usuario@host            # Copiar clave pública al servidor`}</code></pre>

            <blockquote>
                <strong>Buena práctica:</strong> Desactiva el login por contraseña en SSH (<code>PasswordAuthentication no</code> en <code>/etc/ssh/sshd_config</code>) y usa siempre claves. Los ataques de fuerza bruta son constantes en cualquier servidor con el puerto 22 abierto.
            </blockquote>

            <h2>Próximos pasos</h2>
            <p>
                Ahora que conoces los comandos esenciales, el siguiente curso te enseña los <strong>50 comandos que usarás cada día</strong>: grep, awk, sed, pipes y redirecciones. Todo lo que necesitas para ser productivo en cualquier servidor Linux.
            </p>
        </LessonLayout>
    );
}
