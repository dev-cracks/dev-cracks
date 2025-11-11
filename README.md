# Dev Cracks

Sitio oficial de Dev Cracks. La página está construida con React (Vite + TypeScript) y gestiona el formulario de contacto a través del servicio `Fractalize.EmailService`.

## Frontend (React + Vite)

1. Instala dependencias:

   ```powershell
   cd web
   npm install
   ```

2. Crea un archivo `.env` en `web/` con la URL base del servicio de correos y los datos del destinatario:

   ```env
   VITE_EMAIL_API_BASE_URL=http://localhost:5020
   VITE_CONTACT_RECIPIENT=contacto@devcracks.com
   VITE_CONTACT_RECIPIENT_NAME=Equipo Dev Cracks
   ```

   > Ajusta los valores según el entorno. El proyecto recorta las barras finales automáticamente.

3. Ejecuta en modo desarrollo:

   ```powershell
   npm run dev
   ```

4. Genera la versión de producción:

   ```powershell
   npm run build
   ```

   El resultado queda en `dist/`.

## Backend (Fractalize.EmailService)

El repositorio mantiene el servicio minimal API para el envío de correos (ASP.NET Core 9).

### Ejecutar con Docker

1. Define las variables mínimas (al menos `BREVO_API_KEY`):

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

### Variables de entorno relevantes

| Variable             | Descripción                                            | Obligatoria | Valor por defecto      |
| -------------------- | ------------------------------------------------------ | ----------- | ---------------------- |
| `BREVO_API_KEY`      | API key de Brevo para el envío de correos.             | Sí          | _N/A_                  |
| `BREVO_SENDER_EMAIL` | Correo del remitente que usará Brevo.                  | No          | `no-reply@example.com` |
| `BREVO_SENDER_NAME`  | Nombre del remitente que usará Brevo.                  | No          | `Fractalize`           |

> La configuración interna del servicio utiliza las variables anteriores mediante `Brevo__*`, siguiendo la convención de ASP.NET Core para enlazar secciones de configuración.
