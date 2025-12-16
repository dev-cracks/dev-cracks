# Etapa de construcción
FROM node:20-alpine AS build

WORKDIR /app

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

# Etapa de producción con nginx
FROM nginx:alpine

# Copiar los archivos construidos
COPY --from=build /app/dist /usr/share/nginx/html

# Copiar configuración de nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

