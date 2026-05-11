import LessonLayout from '@/layouts/LessonLayout';
import { Head, Link } from '@inertiajs/react';
import { Lock, CheckCircle2 } from 'lucide-react';

const modules = [
    { id: '/lecciones/machine-learning', title: 'ML Pipeline — datos a predicciones', free: true },
    { id: '/lecciones/machine-learning#pandas', title: 'Pandas y exploración de datos', free: true },
    { id: '#', title: 'Regresión lineal y logística', free: false },
    { id: '#', title: 'Árboles de decisión y Random Forest', free: false },
    { id: '#', title: 'Preprocesamiento y feature engineering', free: false },
    { id: '#', title: 'Evaluación y validación cruzada', free: false },
    { id: '#', title: 'XGBoost y modelos de gradiente', free: false },
    { id: '#', title: 'MLflow y despliegue de modelos', free: false },
];

const betaFeatures = [
    'Regresión lineal y logística con scikit-learn',
    'Árboles de decisión, Random Forest y feature importance',
    'Pipelines de preprocesamiento con ColumnTransformer',
    'Cross-validation, GridSearchCV y optimización de hiperparámetros',
    'XGBoost y LightGBM — los mejores modelos tabulares',
    'Evaluación: confusion matrix, ROC-AUC, RMSE y más',
    'MLflow para tracking de experimentos y registro de modelos',
    'Servir predicciones con FastAPI y Docker',
];

export default function MachineLearningTeaser() {
    return (
        <LessonLayout
            title="Machine Learning con Python"
            description="scikit-learn, pandas, numpy y visualización para construir y evaluar modelos supervisados."
            duration="5h 30min"
            lessons={27}
            level="Avanzado"
            premium={true}
            modules={modules}
            activeModule="/lecciones/machine-learning"
            category="Python / IA"
        >
            <Head>
                <title>Machine Learning con Python — DarkCode Premium</title>
                <meta name="description" content="ML con scikit-learn, pandas, XGBoost y MLflow. Acceso Premium DarkCode." />
            </Head>

            <h1>Machine Learning con Python</h1>

            <blockquote>
                El 80% del trabajo de Machine Learning no es construir modelos — es limpiar datos, explorar patrones y evaluar correctamente los resultados. Este curso te enseña el proceso completo: desde el CSV en bruto hasta un modelo desplegado en producción.
            </blockquote>

            <h2 id="pipeline">El pipeline de ML — de datos a predicciones</h2>
            <p>Todo proyecto de ML sigue el mismo proceso:</p>
            <ol>
                <li><strong>Recopilar y explorar los datos</strong> — entender qué tienes antes de modelar</li>
                <li><strong>Limpiar y preprocesar</strong> — manejar valores nulos, outliers, tipos incorrectos</li>
                <li><strong>Feature engineering</strong> — crear variables más informativas</li>
                <li><strong>Entrenar el modelo</strong> — ajustar parámetros con los datos de entrenamiento</li>
                <li><strong>Evaluar correctamente</strong> — medir el rendimiento en datos no vistos</li>
                <li><strong>Mejorar e iterar</strong> — optimizar hiperparámetros, añadir features</li>
                <li><strong>Desplegar</strong> — servir predicciones en producción</li>
            </ol>

            <pre><code>{`# El stack de ML en Python
import numpy as np          # arrays y operaciones matemáticas
import pandas as pd         # DataFrames — la columna vertebral
import matplotlib.pyplot as plt  # visualización básica
import seaborn as sns       # visualización estadística
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import classification_report, confusion_matrix
import warnings
warnings.filterwarnings('ignore')

# Configuración de pandas
pd.set_option('display.max_columns', 50)
pd.set_option('display.float_format', '{:.2f}'.format)

# Cargar datos
df = pd.read_csv('clientes.csv')
print(f"Filas: {len(df):,} | Columnas: {df.shape[1]}")
print(df.dtypes)
print(df.isnull().sum())`}</code></pre>

            <h2 id="pandas">Pandas — exploración y limpieza</h2>
            <pre><code>{`import pandas as pd
import numpy as np

# Crear DataFrame de ejemplo (datos de churn de clientes)
df = pd.DataFrame({
    'edad': [25, 32, None, 45, 28, 67, 35, 19],
    'contrato': ['mensual', 'anual', 'mensual', 'bienal', 'mensual', 'anual', None, 'mensual'],
    'factura_mensual': [29.5, 56.0, 89.0, 120.0, 45.0, 78.5, 34.0, 25.0],
    'meses_cliente': [3, 24, 12, 48, 6, 36, 18, 2],
    'churn': [1, 0, 1, 0, 1, 0, 0, 1],  # 1 = se fue, 0 = se quedó
})

# ── Exploración ──
print(df.describe())                    # estadísticas básicas
print(df.value_counts('contrato'))      # frecuencias
print(df.corr(numeric_only=True))      # correlaciones entre numéricas

# ── Limpieza ──
# Valores nulos
print(df.isnull().sum())               # contar nulos por columna
df['edad'].fillna(df['edad'].median(), inplace=True)  # rellenar con mediana
df.dropna(subset=['contrato'], inplace=True)  # eliminar filas si 'contrato' es nulo

# Outliers con IQR
Q1 = df['factura_mensual'].quantile(0.25)
Q3 = df['factura_mensual'].quantile(0.75)
IQR = Q3 - Q1
df = df[~((df['factura_mensual'] < Q1 - 1.5*IQR) | (df['factura_mensual'] > Q3 + 1.5*IQR))]

# ── Feature engineering ──
# Codificar variables categóricas
df = pd.get_dummies(df, columns=['contrato'], drop_first=True)

# Crear nuevas features
df['factura_por_mes'] = df['factura_mensual'] / df['meses_cliente'].clip(lower=1)
df['es_cliente_nuevo'] = (df['meses_cliente'] < 6).astype(int)

# ── Preparar para ML ──
X = df.drop('churn', axis=1)
y = df['churn']

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42, stratify=y
)

scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)  # fit + transform en train
X_test_scaled = scaler.transform(X_test)         # solo transform en test (evitar data leakage)

# ── Modelo ──
model = LogisticRegression(C=1.0, random_state=42)
model.fit(X_train_scaled, y_train)

y_pred = model.predict(X_test_scaled)
print(classification_report(y_test, y_pred, target_names=['Se quedó', 'Churn']))`}</code></pre>

            {/* ── Paywall ── */}
            <div className="not-prose my-12">
                <div className="relative rounded-2xl border border-amber-500/30 bg-amber-500/5 overflow-hidden">
                    <div className="px-8 py-6 blur-sm pointer-events-none select-none opacity-50">
                        <h3 className="text-xl font-bold mb-3">Random Forest y feature importance</h3>
                        <pre className="bg-gray-900 rounded-xl p-4 text-sm text-gray-300">
{`from sklearn.ensemble import RandomForestClassifier

rf = RandomForestClassifier(n_estimators=100, max_depth=5, random_state=42)
rf.fit(X_train, y_train)

# ¿Qué variables importan más?
importances = pd.Series(rf.feature_importances_, index=X_train.columns)
importances.sort_values(ascending=False).plot(kind='bar')`}
                        </pre>
                    </div>
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-b from-white/80 to-white/95 dark:from-gray-950/80 dark:to-gray-950/95 p-8 text-center">
                        <Lock className="h-10 w-10 text-amber-500 mb-4" />
                        <h3 className="text-2xl font-extrabold mb-2">Contenido Premium</h3>
                        <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-sm">
                            6 módulos más — Random Forest, XGBoost, evaluación avanzada y despliegue — con el acceso Beta.
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
