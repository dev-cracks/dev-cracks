# Dockerfile for GCP Cloud Run (API only)
FROM --platform=linux/amd64 node:20-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install ONLY production dependencies
# This connects to the same package.json but we only need dependencies, not devDependencies
RUN npm install --omit=dev

# Copy source code
COPY . .

# Environment variables (can be overridden at runtime)
ENV PORT=8080
ENV NODE_ENV=production

# Start the API server
CMD ["node", "api-server.js"]
