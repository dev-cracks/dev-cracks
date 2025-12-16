# Etapa de construcción
FROM node:20-windowsservercore-ltsc2022 AS build

WORKDIR C:/app

# Argumentos de build para variables de entorno de Vite
ARG VITE_EMAIL_API_BASE_URL=http://localhost:5020
ARG VITE_CONTACT_RECIPIENT=contacto@devcracks.com
ARG VITE_CONTACT_RECIPIENT_NAME=Equipo Dev Cracks

# Establecer variables de entorno para Vite
ENV VITE_EMAIL_API_BASE_URL=$VITE_EMAIL_API_BASE_URL
ENV VITE_CONTACT_RECIPIENT=$VITE_CONTACT_RECIPIENT
ENV VITE_CONTACT_RECIPIENT_NAME=$VITE_CONTACT_RECIPIENT_NAME

# Copiar archivos de dependencias (el package.json está en la raíz)
COPY package*.json ./

# Instalar dependencias
RUN npm ci

# Copiar código fuente
COPY . .

# Construir la aplicación (el script build está en package.json de la raíz)
RUN npm run build

# Etapa de producción con Node.js para servir archivos estáticos
FROM node:20-windowsservercore-ltsc2022 AS final

WORKDIR C:/app

# Instalar serve globalmente para servir archivos estáticos
RUN npm install -g serve

# Copiar los archivos construidos
COPY --from=build C:/app/dist C:/app/dist

EXPOSE 80

# Servir los archivos estáticos en el puerto 80
CMD ["serve", "-s", "dist", "-l", "80"]

