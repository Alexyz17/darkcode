<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        {{-- ── Título (Inertia lo sobreescribe por página) ── --}}
        <title inertia>{{ config('app.name', 'DarkCode') }}</title>

        {{-- ── SEO básico ── --}}
        <meta name="description" content="DarkCode — Aprende IA, Linux, Laravel y DevOps con proyectos reales. Contenido gratuito y cursos premium para desarrolladores que quieren resultados.">
        <meta name="keywords" content="aprender linux, laravel tutorial, docker desde cero, programación IA, n8n automatización, bash scripting, seguridad web, fine-tuning modelos, cursos programación gratis">
        <meta name="author" content="Alex Villar Gracia">
        <meta name="robots" content="index, follow">
        <link rel="canonical" href="{{ config('app.url') }}{{ request()->getPathInfo() === '/' ? '' : request()->getPathInfo() }}">

        {{-- ── hreflang multiidioma ── --}}
        <link rel="alternate" hreflang="es" href="{{ config('app.url') }}">
        <link rel="alternate" hreflang="en" href="{{ config('app.url') }}">
        <link rel="alternate" hreflang="ca" href="{{ config('app.url') }}">
        <link rel="alternate" hreflang="x-default" href="{{ config('app.url') }}">

        {{-- ── Open Graph ── --}}
        <meta property="og:type" content="website">
        <meta property="og:site_name" content="DarkCode">
        <meta property="og:title" content="DarkCode — Aprende IA y programación con proyectos reales">
        <meta property="og:description" content="12 cursos de Linux, Laravel, Docker, IA y automatización. 5 completamente gratis. Beta de por vida por 19€.">
        <meta property="og:url" content="{{ config('app.url') }}">
        <meta property="og:image" content="{{ config('app.url') }}/og-image.png">
        <meta property="og:image:width" content="1200">
        <meta property="og:image:height" content="630">
        <meta property="og:locale" content="es_ES">
        <meta property="og:locale:alternate" content="en_US">
        <meta property="og:locale:alternate" content="ca_ES">

        {{-- ── Twitter Card ── --}}
        <meta name="twitter:card" content="summary_large_image">
        <meta name="twitter:title" content="DarkCode — Aprende IA y programación con proyectos reales">
        <meta name="twitter:description" content="12 cursos de Linux, Laravel, Docker, IA y automatización. 5 completamente gratis.">
        <meta name="twitter:image" content="{{ config('app.url') }}/og-image.png">

        {{-- ── JSON-LD: EducationalOrganization ── --}}
        <script type="application/ld+json">
        {
            "@context": "https://schema.org",
            "@type": "EducationalOrganization",
            "name": "DarkCode",
            "description": "Plataforma educativa de IA, programación, Linux y DevOps con proyectos reales",
            "url": "{{ config('app.url') }}",
            "email": "alexvillar10@gmail.com",
            "foundingDate": "2025",
            "inLanguage": ["es", "en", "ca"],
            "offers": {
                "@type": "Offer",
                "name": "Beta Access DarkCode",
                "price": "19",
                "priceCurrency": "EUR",
                "availability": "https://schema.org/InStock",
                "description": "Acceso de por vida a todo el contenido premium de DarkCode"
            },
            "hasCourse": [
                { "@type": "Course", "name": "Introducción a Linux", "courseMode": "online", "isAccessibleForFree": true },
                { "@type": "Course", "name": "Comandos Linux esenciales", "courseMode": "online", "isAccessibleForFree": true },
                { "@type": "Course", "name": "Shell scripting con Bash", "courseMode": "online", "isAccessibleForFree": true },
                { "@type": "Course", "name": "Primeros pasos con Laravel", "courseMode": "online", "isAccessibleForFree": true },
                { "@type": "Course", "name": "Seguridad básica en la web", "courseMode": "online", "isAccessibleForFree": true },
                { "@type": "Course", "name": "Eloquent ORM avanzado", "courseMode": "online", "isAccessibleForFree": false },
                { "@type": "Course", "name": "APIs REST con Laravel", "courseMode": "online", "isAccessibleForFree": false },
                { "@type": "Course", "name": "Programación con IA", "courseMode": "online", "isAccessibleForFree": false },
                { "@type": "Course", "name": "Docker desde cero", "courseMode": "online", "isAccessibleForFree": false },
                { "@type": "Course", "name": "Automatiza con n8n", "courseMode": "online", "isAccessibleForFree": false }
            ]
        }
        </script>

        {{-- ── JSON-LD: WebSite con sitelinks search ── --}}
        <script type="application/ld+json">
        {
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "DarkCode",
            "url": "{{ config('app.url') }}",
            "potentialAction": {
                "@type": "SearchAction",
                "target": {
                    "@type": "EntryPoint",
                    "urlTemplate": "{{ config('app.url') }}/cursos?q={search_term_string}"
                },
                "query-input": "required name=search_term_string"
            }
        }
        </script>

        {{-- ── Favicon placeholder (añade tu favicon real) ── --}}
        <link rel="icon" type="image/svg+xml" href="/favicon.svg">

        @viteReactRefresh
        @vite(['resources/css/app.css', 'resources/js/app.tsx'])
        @inertiaHead
    </head>
    <body class="font-sans antialiased">
        @inertia
    </body>
</html>
