import express from 'express';
import { createServer as createViteServer } from 'vite';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import { readFileSync } from 'fs';

const __dirname = dirname(fileURLToPath(import.meta.url));

async function createServer() {
  const app = express();

  // Capturar y suprimir errores de WebSocket (no son críticos en middlewareMode)
  const originalConsoleError = console.error;
  console.error = (...args) => {
    const message = args[0];
    if (typeof message === 'string' && message.includes('WebSocket server error')) {
      // Suprimir error de WebSocket, no es crítico para el funcionamiento
      return;
    }
    originalConsoleError.apply(console, args);
  };

  try {
    // Crear servidor Vite para la web principal
    const webVite = await createViteServer({
      server: { 
        middlewareMode: true,
        hmr: false // Deshabilitar HMR para evitar problemas con WebSocket
      },
      appType: 'spa',
      root: resolve(__dirname, 'web'),
      publicDir: resolve(__dirname, 'web/public'),
    });

    // Crear servidor Vite para el backoffice con base path
    const backofficeVite = await createViteServer({
      server: { 
        middlewareMode: true,
        hmr: false // Deshabilitar HMR para evitar problemas con WebSocket
      },
      appType: 'spa',
      root: resolve(__dirname, 'backoffice'),
      publicDir: resolve(__dirname, 'backoffice/public'),
      base: '/backoffice/', // Configurar base path directamente
    });

    // Restaurar console.error después de crear los servidores Vite
    console.error = originalConsoleError;

    // Middleware para el backoffice - debe ir antes del middleware de la web
    app.use('/backoffice', async (req, res, next) => {
      // Para archivos estáticos y módulos, usar el middleware de Vite directamente
      if (req.originalUrl.match(/\.(tsx?|jsx?|css|json|svg|png|jpg|jpeg|gif|ico|woff|woff2|ttf|eot|map)$/) ||
          req.originalUrl.match(/^\/(backoffice\/)?(src|node_modules|@vite|@id|@fs|@react-refresh|assets)/)) {
        return backofficeVite.middlewares(req, res, (err) => {
          // Si hay un error (como 404), continuar al siguiente handler
          if (err) {
            next(err);
          }
        });
      }
      
      // Para todas las demás rutas (HTML/SPA), servir el index.html transformado
      try {
        const template = readFileSync(resolve(__dirname, 'backoffice/index.html'), 'utf-8');
        const html = await backofficeVite.transformIndexHtml(req.originalUrl, template);
        res.setHeader('Content-Type', 'text/html');
        return res.send(html);
      } catch (e) {
        backofficeVite.ssrFixStacktrace(e);
        return next(e);
      }
    });

    // Middleware para la web principal - todas las demás rutas
    app.use(webVite.middlewares);

    // Fallback para la web principal - servir index.html para rutas SPA
    app.use('*', async (req, res, next) => {
      // Si la ruta es del backoffice, ya fue manejada arriba
      if (req.originalUrl.startsWith('/backoffice')) {
        return next();
      }
      
      try {
        const template = readFileSync(resolve(__dirname, 'web/index.html'), 'utf-8');
        const html = await webVite.transformIndexHtml(req.originalUrl, template);
        res.setHeader('Content-Type', 'text/html');
        return res.send(html);
      } catch (e) {
        webVite.ssrFixStacktrace(e);
        return next(e);
      }
    });

    const port = 5173;
    
    // Manejar errores de puerto en uso
    const server = app.listen(port, () => {
      console.log(`\n🚀 Servidor de desarrollo unificado corriendo en http://localhost:${port}`);
      console.log(`📱 Web principal: http://localhost:${port}`);
      console.log(`🔧 Backoffice: http://localhost:${port}/backoffice\n`);
    });

    server.on('error', (err) => {
      if (err.code === 'EADDRINUSE') {
        console.error(`\n❌ Error: El puerto ${port} ya está en uso.`);
        console.error(`💡 Ejecuta: powershell -ExecutionPolicy Bypass -File kill-port-5173.ps1\n`);
        process.exit(1);
      } else {
        console.error('❌ Error en el servidor:', err);
        process.exit(1);
      }
    });
  } catch (viteError) {
    // Restaurar console.error en caso de error
    console.error = originalConsoleError;
    throw viteError;
  }
}

createServer().catch((err) => {
  console.error('❌ Error al iniciar el servidor:', err);
  process.exit(1);
});
