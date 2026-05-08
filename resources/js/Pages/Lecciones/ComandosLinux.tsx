import LessonLayout from '@/layouts/LessonLayout';
import { Head } from '@inertiajs/react';

const modules = [
    { id: '/lecciones/comandos-linux', title: 'Navegación y exploración', free: true },
    { id: '/lecciones/comandos-linux#archivos', title: 'Manipulación de archivos', free: true },
    { id: '/lecciones/comandos-linux#busqueda', title: 'Búsqueda avanzada', free: true },
    { id: '/lecciones/comandos-linux#texto', title: 'Procesamiento de texto', free: true },
    { id: '/lecciones/comandos-linux#red', title: 'Diagnóstico de red', free: true },
    { id: '/lecciones/comandos-linux#sistema', title: 'Monitorización del sistema', free: true },
];

export default function ComandosLinux() {
    return (
        <LessonLayout
            title="Comandos Linux esenciales"
            description="Domina los comandos de terminal que todo desarrollador y sysadmin necesita conocer."
            duration="2h 45min"
            lessons={14}
            level="Básico"
            premium={false}
            modules={modules}
            activeModule="/lecciones/comandos-linux"
            prevHref="/lecciones/linux-esencial"
            nextHref="/lecciones/shell-scripting"
            category="Linux"
        >
            <Head>
                <title>Comandos Linux esenciales — DarkCode</title>
                <meta name="description" content="Guía completa de comandos Linux: navegación, archivos, búsqueda, texto, red y sistema. Gratis y actualizado 2026." />
            </Head>

            <h1>Comandos Linux esenciales</h1>

            <blockquote>
                El terminal de Linux parece intimidante al principio, pero con unos 30-40 comandos dominados puedes gestionar servidores completos, automatizar tareas y moverte más rápido que con cualquier interfaz gráfica. Esta guía te lleva de cero a productivo.
            </blockquote>

            <h2>Navegación y exploración del sistema</h2>

            <h3>Orientación básica</h3>
            <pre><code>{`pwd                   # Print Working Directory — dónde estás ahora
ls                    # Listar archivos del directorio actual
ls -la                # Listar con detalles y archivos ocultos
ls -lh                # Tamaños en formato legible (K, M, G)
ls -lt                # Ordenar por fecha de modificación
ls -R                 # Listar recursivamente

cd /ruta/absoluta     # Ir a ruta absoluta
cd ruta/relativa      # Ir a ruta relativa
cd ~                  # Ir al directorio home
cd -                  # Volver al directorio anterior
cd ..                 # Subir un nivel
cd ../..              # Subir dos niveles`}</code></pre>

            <h3>Explorar contenido</h3>
            <pre><code>{`cat archivo.txt           # Mostrar contenido completo
less archivo.txt          # Paginador interactivo (q para salir)
head -n 20 archivo.txt    # Primeras 20 líneas (defecto: 10)
tail -n 20 archivo.txt    # Últimas 20 líneas
tail -f app.log           # Seguir archivo en tiempo real (logs)
file imagen.png           # Detectar tipo de archivo
stat archivo.txt          # Metadatos: tamaño, permisos, fechas`}</code></pre>

            <h3>Rutas del sistema importantes</h3>
            <pre><code>{`/                     # Raíz del sistema
/home/usuario/        # Directorio personal del usuario
/etc/                 # Archivos de configuración del sistema
/var/log/             # Logs del sistema y servicios
/var/www/             # Web servers (nginx/apache)
/tmp/                 # Temporales (se borran en reinicio)
/usr/bin/             # Ejecutables del sistema
/usr/local/bin/       # Ejecutables instalados manualmente
/proc/                # Información del kernel (virtual)`}</code></pre>

            <h2 id="archivos">Manipulación de archivos y directorios</h2>

            <h3>Crear, copiar, mover, borrar</h3>
            <pre><code>{`# Crear
touch archivo.txt           # Crear archivo vacío (o actualizar fecha)
mkdir mi-directorio         # Crear directorio
mkdir -p padre/hijo/nieto   # Crear árbol de directorios

# Copiar
cp origen.txt destino.txt             # Copiar archivo
cp -r directorio/ copia/             # Copiar directorio recursivamente
cp -p archivo.txt copia.txt          # Preservar permisos y fechas
cp -u *.log /backups/                # Copiar solo si es más nuevo

# Mover / renombrar
mv viejo.txt nuevo.txt               # Renombrar
mv archivo.txt /otra/ruta/           # Mover
mv *.log /var/log/app/               # Mover múltiples archivos

# Borrar
rm archivo.txt                       # Borrar archivo
rm -r directorio/                    # Borrar directorio recursivo
rm -rf directorio/                   # Forzar sin confirmación (¡cuidado!)
rmdir directorio/                    # Borrar directorio vacío`}</code></pre>

            <h3>Ver y seguir logs en tiempo real</h3>
            <pre><code>{`# Logs del sistema con journalctl (systemd)
journalctl -f                         # Todos los logs en tiempo real
journalctl -u nginx -f                # Logs de un servicio específico
journalctl --since "1 hour ago"       # Logs recientes
journalctl -p err                     # Solo errores
journalctl --disk-usage               # Espacio que ocupan los logs

# Logs clásicos con tail
tail -f /var/log/nginx/access.log
tail -f /var/log/nginx/error.log
tail -f /var/log/mysql/error.log

# Combinar con grep para filtrar
tail -f app.log | grep "ERROR"
tail -f app.log | grep -v "DEBUG"     # Excluir líneas`}</code></pre>

            <h3>Permisos y propietario</h3>
            <pre><code>{`# Cambiar permisos
chmod 755 script.sh          # rwxr-xr-x
chmod 644 archivo.txt        # rw-r--r--
chmod +x script.sh           # Añadir ejecución
chmod -w archivo.txt         # Quitar escritura
chmod -R 755 directorio/     # Recursivo

# Cambiar propietario
chown alex archivo.txt       # Cambiar usuario
chown alex:www-data          # Cambiar usuario:grupo
chown -R www-data:www-data /var/www/mi-app

# Ver permisos
ls -l archivo.txt            # -rw-r--r-- 1 alex alex 1234 ...
stat archivo.txt             # Información completa`}</code></pre>

            <h2 id="busqueda">Búsqueda avanzada</h2>

            <h3>find — buscar archivos</h3>
            <pre><code>{`# Buscar por nombre
find /var/www -name "*.php"              # Por extensión
find . -name "config.*"                 # Cualquier extensión
find / -name "nginx.conf" 2>/dev/null   # Silenciar errores de acceso

# Buscar por tipo
find . -type f          # Solo archivos
find . -type d          # Solo directorios
find . -type l          # Solo enlaces simbólicos

# Buscar por tamaño
find /var -size +100M   # Archivos mayores de 100MB
find . -size -1k        # Archivos menores de 1KB

# Buscar por fecha
find /tmp -mtime +7     # Modificados hace más de 7 días
find . -newer referencia.txt  # Más nuevos que otro archivo

# Ejecutar acción sobre resultados
find . -name "*.log" -delete                    # Borrar
find . -name "*.tmp" -exec rm {} \;            # Ejecutar comando
find . -name "*.php" | xargs grep "password"   # Buscar dentro`}</code></pre>

            <h3>grep — buscar dentro de archivos</h3>
            <pre><code>{`grep "patron" archivo.txt          # Buscar patrón
grep -i "error" app.log            # Case insensitive
grep -r "TODO" ./src/              # Buscar recursivamente
grep -n "function" index.php       # Mostrar números de línea
grep -c "404" access.log           # Contar coincidencias
grep -v "DEBUG" app.log            # Excluir líneas que coinciden
grep -l "error" *.log              # Solo nombres de archivos
grep -A 3 "ERROR" app.log          # 3 líneas DESPUÉS del match
grep -B 3 "ERROR" app.log          # 3 líneas ANTES del match
grep -C 3 "ERROR" app.log          # 3 líneas contexto (antes y después)

# Expresiones regulares
grep "^ERROR" app.log              # Líneas que empiezan por ERROR
grep "\.php$" archivo.txt          # Líneas que terminan en .php
grep "[0-9]{3}" archivo.txt        # 3 dígitos seguidos
grep -E "error|warning" app.log    # OR con expresiones extendidas`}</code></pre>

            <h2 id="texto">Procesamiento de texto</h2>

            <h3>awk — procesar columnas</h3>
            <pre><code>{`# Imprimir columnas específicas
ps aux | awk '{print $1, $11}'            # Usuario y comando
awk '{print $1}' access.log              # Primera columna
awk -F: '{print $1, $3}' /etc/passwd     # Separador personalizado

# Filtrar y calcular
awk '$3 > 50 {print}' datos.txt          # Mostrar si columna 3 > 50
awk '{sum += $2} END {print sum}' n.txt  # Sumar columna 2
awk 'NR==5,NR==10 {print}' archivo.txt  # Líneas 5 a 10

# Formato de salida
awk '{printf "%-20s %s\n", $1, $2}' archivo.txt  # Alineado`}</code></pre>

            <h3>sed — editar flujos de texto</h3>
            <pre><code>{`sed 's/viejo/nuevo/g' archivo.txt         # Sustituir todas las ocurrencias
sed -i 's/debug/info/g' config.conf       # Editar archivo en sitio
sed -n '10,20p' archivo.txt               # Mostrar líneas 10-20
sed '/patron/d' archivo.txt               # Borrar líneas con patrón
sed 's/  */ /g' archivo.txt              # Eliminar espacios múltiples
sed 's/^/    /' archivo.txt              # Añadir 4 espacios al inicio
sed '1d' archivo.txt                      # Borrar primera línea
sed '$d' archivo.txt                      # Borrar última línea`}</code></pre>

            <h3>sort, uniq, cut, tr</h3>
            <pre><code>{`# sort — ordenar
sort archivo.txt              # Orden alfabético
sort -n numeros.txt           # Orden numérico
sort -rn numeros.txt          # Inverso numérico
sort -k2 tabla.txt            # Ordenar por columna 2
sort -u archivo.txt           # Ordenar y eliminar duplicados

# uniq — eliminar duplicados (requiere entrada ordenada)
sort archivo.txt | uniq        # Eliminar duplicados
sort archivo.txt | uniq -c    # Contar repeticiones
sort archivo.txt | uniq -d    # Solo las líneas duplicadas

# cut — extraer columnas
cut -d: -f1 /etc/passwd       # Primera columna (sep=:)
cut -d, -f1,3 datos.csv       # Columnas 1 y 3 de CSV
cut -c1-10 archivo.txt        # Caracteres 1 al 10

# tr — transformar caracteres
echo "hola" | tr 'a-z' 'A-Z'  # Mayúsculas
echo "a,b,c" | tr ',' '\n'    # Coma a salto de línea
cat archivo.txt | tr -d '\r'  # Eliminar retornos de carro (Windows)`}</code></pre>

            <h2 id="red">Diagnóstico de red</h2>

            <h3>Conectividad y puertos</h3>
            <pre><code>{`# Conectividad
ping google.com                    # Test ICMP básico
ping -c 4 8.8.8.8                 # Solo 4 paquetes
traceroute google.com              # Ruta de paquetes
mtr google.com                     # traceroute interactivo

# DNS
nslookup dominio.com               # Resolución DNS básica
dig dominio.com                    # Resolución DNS detallada
dig dominio.com MX                 # Registros de correo
dig +short dominio.com             # Solo la IP
host dominio.com                   # Resolución rápida

# Puertos y conexiones
ss -tlnp                           # Puertos TCP en escucha
ss -ulnp                           # Puertos UDP en escucha
ss -tlnp | grep :80                # Ver si el puerto 80 está abierto
netstat -tlnp                      # Alternativa a ss (más antiguo)
lsof -i :80                        # Qué proceso usa el puerto 80
lsof -i :3306                      # MySQL

# Probar conectividad a puerto
nc -zv servidor.com 22             # Test TCP al puerto 22
nc -zv servidor.com 443            # Test HTTPS`}</code></pre>

            <h3>Transferencia y descarga</h3>
            <pre><code>{`# curl — peticiones HTTP
curl https://api.ejemplo.com/datos           # GET básico
curl -I https://ejemplo.com                  # Solo headers (HEAD)
curl -o archivo.zip https://url.com/f.zip   # Descargar a archivo
curl -L https://url.com                      # Seguir redirecciones
curl -X POST -H "Content-Type: application/json" \
     -d '{"key":"value"}' https://api.com/endpoint

# wget — descarga de archivos
wget https://url.com/archivo.tar.gz          # Descargar
wget -c https://url.com/grande.zip           # Continuar descarga interrumpida
wget -P /destino/ https://url.com/arch.deb  # Guardar en directorio

# scp — copiar via SSH
scp archivo.txt usuario@servidor:/ruta/      # Local → remoto
scp usuario@servidor:/ruta/archivo.txt .     # Remoto → local
scp -r directorio/ usuario@servidor:/ruta/   # Directorio completo`}</code></pre>

            <h2 id="sistema">Monitorización del sistema</h2>

            <h3>Recursos y procesos</h3>
            <pre><code>{`# Información en tiempo real
top                           # Monitor de procesos (clásico)
htop                          # Monitor interactivo mejorado
btop                          # Monitor moderno con gráficas (2026)
glances                       # Vista completa del sistema

# Procesos
ps aux                        # Todos los procesos
ps aux | grep nginx           # Buscar proceso
pgrep nginx                   # PID de proceso por nombre
pkill nginx                   # Matar proceso por nombre
kill 1234                     # Matar PID específico
kill -9 1234                  # Forzar kill (SIGKILL)
killall php-fpm               # Matar todos los procesos por nombre

# Memoria
free -h                       # Memoria RAM y swap
cat /proc/meminfo             # Información detallada

# CPU
lscpu                         # Información de la CPU
cat /proc/cpuinfo             # Detalles de cada núcleo
nproc                         # Número de núcleos disponibles`}</code></pre>

            <h3>Disco y espacio</h3>
            <pre><code>{`# Espacio en disco
df -h                         # Espacio en todas las particiones
df -h /                       # Solo partición raíz
df -h /var/www                # Partición de un directorio

# Tamaño de directorios
du -sh /var/www/              # Tamaño total del directorio
du -sh *                      # Tamaño de cada elemento actual
du -sh /* 2>/dev/null         # Tamaño de carpetas raíz

# Encontrar archivos grandes
du -ah /var | sort -rh | head -20   # Top 20 archivos/dirs más grandes
find / -size +500M 2>/dev/null       # Archivos mayores de 500MB

# I/O en tiempo real
iotop                         # E/S de disco por proceso
iostat -x 1                   # Estadísticas de I/O cada 1 segundo`}</code></pre>

            <h3>Servicios y arranque (systemd)</h3>
            <pre><code>{`# Gestión de servicios
systemctl start nginx          # Iniciar servicio
systemctl stop nginx           # Parar servicio
systemctl restart nginx        # Reiniciar
systemctl reload nginx         # Recargar config sin parar
systemctl status nginx         # Estado detallado

# Arranque automático
systemctl enable nginx         # Habilitar en arranque
systemctl disable nginx        # Deshabilitar en arranque
systemctl is-enabled nginx     # ¿Habilitado?
systemctl is-active nginx      # ¿Activo ahora?

# Ver todos los servicios
systemctl list-units --type=service          # Activos
systemctl list-units --type=service --all   # Todos

# Logs de servicio
journalctl -u nginx            # Todos los logs de nginx
journalctl -u nginx -f         # Seguir en tiempo real
journalctl -u nginx --since today   # Solo hoy`}</code></pre>

            <h2>Atajos imprescindibles de terminal</h2>
            <pre><code>{`Ctrl+C          # Cancelar proceso en ejecución
Ctrl+Z          # Suspender proceso (volver con fg o bg)
Ctrl+D          # Cerrar sesión / EOF
Ctrl+L          # Limpiar pantalla (igual que clear)
Ctrl+A          # Ir al inicio de la línea
Ctrl+E          # Ir al final de la línea
Ctrl+U          # Borrar desde cursor al inicio
Ctrl+K          # Borrar desde cursor al final
Ctrl+R          # Búsqueda en historial (escribe y navega)
Ctrl+W          # Borrar palabra anterior

!!              # Repetir último comando
!nginx          # Repetir último comando que empieza por nginx
sudo !!         # Repetir último comando con sudo
history         # Ver historial de comandos
history | grep git    # Buscar en historial`}</code></pre>

            <h2>Alias útiles para tu .bashrc</h2>
            <pre><code>{`# Añade esto a ~/.bashrc o ~/.zshrc
alias ll='ls -lah'
alias la='ls -A'
alias ..='cd ..'
alias ...='cd ../..'

alias gs='git status'
alias gl='git log --oneline --graph'

alias df='df -h'
alias du='du -h'
alias free='free -h'

alias grep='grep --color=auto'
alias fgrep='fgrep --color=auto'
alias egrep='egrep --color=auto'

# Cargar cambios sin reiniciar terminal
source ~/.bashrc`}</code></pre>

            <h2>Próximos pasos</h2>
            <p>
                Con estos comandos dominados, el siguiente nivel es <strong>Shell Scripting</strong> — combinar estos comandos en scripts que se ejecutan automáticamente. Después, <strong>Docker</strong> (premium) donde aplicarás todo esto para gestionar contenedores.
            </p>
        </LessonLayout>
    );
}
