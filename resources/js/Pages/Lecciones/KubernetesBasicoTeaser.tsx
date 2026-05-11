import LessonLayout from '@/layouts/LessonLayout';
import { Head, Link } from '@inertiajs/react';
import { Lock, CheckCircle2 } from 'lucide-react';

const modules = [
    { id: '/lecciones/kubernetes-basico', title: 'Kubernetes — arquitectura y conceptos', free: true },
    { id: '/lecciones/kubernetes-basico#pods', title: 'Pods y Deployments', free: true },
    { id: '#', title: 'Services e Ingress', free: false },
    { id: '#', title: 'ConfigMaps y Secrets', free: false },
    { id: '#', title: 'Volumes y persistencia', free: false },
    { id: '#', title: 'Autoscaling y recursos', free: false },
    { id: '#', title: 'Helm — gestión de paquetes', free: false },
    { id: '#', title: 'kubectl y debugging', free: false },
];

const betaFeatures = [
    'Services: ClusterIP, NodePort y LoadBalancer',
    'Ingress con nginx-ingress-controller y TLS',
    'ConfigMaps para configuración y Secrets para credenciales',
    'PersistentVolumes y PersistentVolumeClaims',
    'HorizontalPodAutoscaler y resource limits/requests',
    'Helm charts: instalar, crear y mantener',
    'kubectl avanzado: exec, logs, port-forward y debug',
    'Namespace y RBAC para separar entornos',
];

export default function KubernetesBasicoTeaser() {
    return (
        <LessonLayout
            title="Kubernetes desde cero"
            description="Pods, Deployments, Services, Ingress, ConfigMaps y Helm para orquestar contenedores en producción."
            duration="5h 00min"
            lessons={24}
            level="Avanzado"
            premium={true}
            modules={modules}
            activeModule="/lecciones/kubernetes-basico"
            category="DevOps"
        >
            <Head>
                <title>Kubernetes desde cero — DarkCode Premium</title>
                <meta name="description" content="Kubernetes: Pods, Deployments, Services, Ingress, Helm y kubectl. Acceso Premium DarkCode." />
            </Head>

            <h1>Kubernetes desde cero</h1>

            <blockquote>
                Kubernetes es el estándar de facto para orquestar contenedores en producción. El 96% de las empresas que usan contenedores lo hacen con Kubernetes. Es complejo — pero cuando lo entiendes, te da superpoderes: auto-healing, escalado automático, zero-downtime deploys y gestión declarativa de toda tu infraestructura.
            </blockquote>

            <h2 id="arquitectura">Arquitectura de Kubernetes</h2>
            <p>Un cluster de Kubernetes tiene dos tipos de nodos:</p>
            <ul>
                <li><strong>Control Plane</strong> — el "cerebro": API Server, Scheduler, Controller Manager, etcd</li>
                <li><strong>Worker Nodes</strong> — donde corren tus aplicaciones: kubelet, kube-proxy, container runtime</li>
            </ul>

            <pre><code>{`# Instalar kubectl (cliente de línea de comandos)
# macOS
brew install kubectl

# Linux
curl -LO "https://dl.k8s.io/release/$(curl -sL https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl"
sudo install kubectl /usr/local/bin/

# Verificar conexión al cluster
kubectl cluster-info
kubectl get nodes
kubectl get nodes -o wide  # más detalles (IPs, versiones)

# Contextos — gestionar múltiples clusters
kubectl config get-contexts      # listar contextos
kubectl config use-context prod  # cambiar a producción
kubectl config current-context   # ver contexto actual`}</code></pre>

            <h2 id="pods">Pods y Deployments</h2>
            <pre><code>{`# Pod — la unidad mínima: uno o más contenedores
# deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: mi-app
  labels:
    app: mi-app
spec:
  replicas: 3                  # mantener 3 pods siempre
  selector:
    matchLabels:
      app: mi-app
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxUnavailable: 1        # máximo 1 pod no disponible durante deploy
      maxSurge: 1              # máximo 1 pod extra durante deploy
  template:
    metadata:
      labels:
        app: mi-app
    spec:
      containers:
        - name: app
          image: ghcr.io/miusuario/mi-app:v1.2.3
          ports:
            - containerPort: 3000
          env:
            - name: NODE_ENV
              value: production
            - name: DATABASE_URL
              valueFrom:
                secretKeyRef:
                  name: app-secrets
                  key: database-url
          resources:
            requests:           # mínimo garantizado
              memory: "128Mi"
              cpu: "100m"       # 100 millicores = 0.1 CPU
            limits:             # máximo permitido
              memory: "256Mi"
              cpu: "500m"
          livenessProbe:        # reiniciar si falla
            httpGet:
              path: /health
              port: 3000
            initialDelaySeconds: 30
            periodSeconds: 10
          readinessProbe:       # no enviar tráfico hasta estar listo
            httpGet:
              path: /ready
              port: 3000
            initialDelaySeconds: 5

# Aplicar la configuración
kubectl apply -f deployment.yaml

# Ver estado
kubectl get deployments
kubectl get pods
kubectl describe pod mi-app-abc123-xyz

# Rollback si algo sale mal
kubectl rollout undo deployment/mi-app
kubectl rollout history deployment/mi-app`}</code></pre>

            {/* ── Paywall ── */}
            <div className="not-prose my-12">
                <div className="relative rounded-2xl border border-amber-500/30 bg-amber-500/5 overflow-hidden">
                    <div className="px-8 py-6 blur-sm pointer-events-none select-none opacity-50">
                        <h3 className="text-xl font-bold mb-3">Services — exponer tu aplicación</h3>
                        <pre className="bg-gray-900 rounded-xl p-4 text-sm text-gray-300">
{`apiVersion: v1
kind: Service
metadata:
  name: mi-app-svc
spec:
  selector:
    app: mi-app     # selecciona los pods con esta etiqueta
  ports:
    - port: 80
      targetPort: 3000
  type: ClusterIP   # solo accesible dentro del cluster`}
                        </pre>
                    </div>
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-b from-white/80 to-white/95 dark:from-gray-950/80 dark:to-gray-950/95 p-8 text-center">
                        <Lock className="h-10 w-10 text-amber-500 mb-4" />
                        <h3 className="text-2xl font-extrabold mb-2">Contenido Premium</h3>
                        <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-sm">
                            6 módulos más — Services, Ingress, Secrets, Volumes, Helm y debugging — disponibles con el acceso Beta.
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
                        <p className="text-xs text-gray-400 mt-3">Pago único · Acceso a todos los cursos · Sin renovaciones</p>
                    </div>
                </div>
            </div>
        </LessonLayout>
    );
}
