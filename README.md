# Fractalize Services

Servicios y funciones.

## Ejecutar con Docker

1. Define las variables de entorno necesarias (al menos `BREVO_API_KEY`):
   ```powershell
   $Env:BREVO_API_KEY="tu-api-key"
   $Env:BREVO_SENDER_EMAIL="no-reply@example.com" # Opcional
   $Env:BREVO_SENDER_NAME="Fractalize"            # Opcional
   ```
2. Construye y levanta el contenedor:
   ```powershell
   docker compose up --build
   ```
3. La API quedará disponible en `http://localhost:8080`.

## Variables de entorno relevantes

| Variable             | Descripción                                            | Obligatoria | Valor por defecto      |
| -------------------- | ------------------------------------------------------ | ----------- | ---------------------- |
| `BREVO_API_KEY`      | API key de Brevo para el envío de correos.             | Sí          | _N/A_                  |
| `BREVO_SENDER_EMAIL` | Correo del remitente que usará Brevo.                  | No          | `no-reply@example.com` |
| `BREVO_SENDER_NAME`  | Nombre del remitente que usará Brevo.                  | No          | `Fractalize`           |

> La configuración interna del servicio utiliza las variables anteriores mediante `Brevo__*`, siguiendo la convención de ASP.NET Core para enlazar secciones de configuración.
# dev-cracks
dev-cracks website
