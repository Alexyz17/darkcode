<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Restablecer contraseña</title>
    <style>
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background-color: #030712;
            color: #e5e7eb;
            padding: 40px 16px;
        }
        .wrapper {
            max-width: 540px;
            margin: 0 auto;
        }
        .logo {
            text-align: center;
            margin-bottom: 32px;
        }
        .logo a {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            text-decoration: none;
        }
        .logo-icon {
            width: 32px;
            height: 32px;
            background: #4f46e5;
            border-radius: 8px;
            display: inline-flex;
            align-items: center;
            justify-content: center;
        }
        .logo-text {
            font-size: 22px;
            font-weight: 700;
            color: #ffffff;
        }
        .card {
            background-color: #111827;
            border: 1px solid #1f2937;
            border-radius: 16px;
            padding: 40px 36px;
        }
        .greeting {
            font-size: 22px;
            font-weight: 700;
            color: #ffffff;
            margin-bottom: 8px;
        }
        .subtitle {
            font-size: 14px;
            color: #9ca3af;
            margin-bottom: 28px;
            line-height: 1.6;
        }
        .divider {
            border: none;
            border-top: 1px solid #1f2937;
            margin: 28px 0;
        }
        .body-text {
            font-size: 15px;
            color: #d1d5db;
            line-height: 1.7;
            margin-bottom: 28px;
        }
        .btn-wrapper {
            text-align: center;
            margin: 32px 0;
        }
        .btn {
            display: inline-block;
            background-color: #4f46e5;
            color: #ffffff;
            text-decoration: none;
            font-weight: 600;
            font-size: 15px;
            padding: 14px 36px;
            border-radius: 12px;
            letter-spacing: 0.01em;
        }
        .btn:hover { background-color: #4338ca; }
        .expiry-note {
            font-size: 13px;
            color: #6b7280;
            text-align: center;
            margin-bottom: 28px;
        }
        .fallback-label {
            font-size: 13px;
            color: #6b7280;
            margin-bottom: 6px;
        }
        .fallback-url {
            font-size: 12px;
            color: #6366f1;
            word-break: break-all;
            background: #1f2937;
            padding: 10px 14px;
            border-radius: 8px;
            display: block;
        }
        .footer {
            text-align: center;
            font-size: 12px;
            color: #4b5563;
            margin-top: 32px;
            line-height: 1.6;
        }
        .footer a { color: #6b7280; text-decoration: none; }
    </style>
</head>
<body>
    <div class="wrapper">
        <div class="logo">
            <a href="{{ $appUrl }}">
                <span class="logo-text">{{ $appName }}</span>
            </a>
        </div>

        <div class="card">
            <p class="greeting">Restablecer tu contraseña</p>
            <p class="subtitle">
                Hola{{ $userName ? ', ' . $userName : '' }}. Recibimos una solicitud para restablecer la contraseña de tu cuenta.
            </p>

            <hr class="divider" />

            <p class="body-text">
                Haz clic en el botón de abajo para crear una nueva contraseña. El enlace es válido durante
                <strong style="color:#e5e7eb;">60 minutos</strong>.
                Si no solicitaste este cambio, puedes ignorar este correo con total seguridad.
            </p>

            <div class="btn-wrapper">
                <a href="{{ $resetUrl }}" class="btn">Restablecer contraseña</a>
            </div>

            <p class="expiry-note">El enlace expira en 60 minutos.</p>

            <hr class="divider" />

            <p class="fallback-label">Si el botón no funciona, copia este enlace en tu navegador:</p>
            <span class="fallback-url">{{ $resetUrl }}</span>
        </div>

        <div class="footer">
            <p>Si no solicitaste restablecer tu contraseña, no es necesario hacer nada.</p>
            <p style="margin-top:8px;">
                &copy; {{ date('Y') }} {{ $appName }} &mdash;
                <a href="{{ $appUrl }}/privacidad">Privacidad</a>
            </p>
        </div>
    </div>
</body>
</html>
