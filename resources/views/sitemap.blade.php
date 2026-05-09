<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">

    <url>
        <loc>{{ url('/') }}</loc>
        <changefreq>weekly</changefreq>
        <priority>1.0</priority>
        <xhtml:link rel="alternate" hreflang="es" href="{{ url('/') }}"/>
    </url>

    <url>
        <loc>{{ url('/cursos') }}</loc>
        <changefreq>weekly</changefreq>
        <priority>0.9</priority>
    </url>

    <url>
        <loc>{{ url('/beta') }}</loc>
        <changefreq>monthly</changefreq>
        <priority>0.8</priority>
    </url>

    @foreach ($lecciones as $slug)
    <url>
        <loc>{{ url('/lecciones/' . $slug) }}</loc>
        <changefreq>monthly</changefreq>
        <priority>0.8</priority>
    </url>
    @endforeach

    <url>
        <loc>{{ url('/contenido') }}</loc>
        <changefreq>monthly</changefreq>
        <priority>0.6</priority>
    </url>

    <url>
        <loc>{{ url('/productos') }}</loc>
        <changefreq>monthly</changefreq>
        <priority>0.6</priority>
    </url>

    <url>
        <loc>{{ url('/apoya') }}</loc>
        <changefreq>monthly</changefreq>
        <priority>0.4</priority>
    </url>

    <url>
        <loc>{{ url('/privacidad') }}</loc>
        <changefreq>yearly</changefreq>
        <priority>0.2</priority>
    </url>

    <url>
        <loc>{{ url('/terminos') }}</loc>
        <changefreq>yearly</changefreq>
        <priority>0.2</priority>
    </url>

    <url>
        <loc>{{ url('/cookies') }}</loc>
        <changefreq>yearly</changefreq>
        <priority>0.2</priority>
    </url>

</urlset>
