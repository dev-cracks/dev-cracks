import express from 'express';
import { createServer as createViteServer } from 'vite';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import { readFileSync } from 'fs';

const __dirname = dirname(fileURLToPath(import.meta.url));

async function createServer() {
  const app = express();

  // Crear servidor Vite para la web principal
  const webVite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'spa',
    root: resolve(__dirname, 'web'),
    publicDir: resolve(__dirname, 'web/public'),
  });

  // Crear servidor Vite para el backoffice
  const backofficeVite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'spa',
    root: resolve(__dirname, 'backoffice'),
    publicDir: resolve(__dirname, 'backoffice/public'),
  });

  // Middleware para el backoffice - debe ir antes del middleware de la web
  app.use('/backoffice', async (req, res, next) => {
    // Si es un archivo estático o módulo (src/, node_modules/, .tsx, .ts, .jsx, .js, etc.)
    if (req.url.match(/^\/(src|node_modules|@vite|@id|@fs)/) || 
        req.url.match(/\.(tsx?|jsx?|css|json|svg|png|jpg|jpeg|gif|ico|woff|woff2|ttf|eot)$/)) {
      return backofficeVite.middlewares(req, res, next);
    }
    
    // Para todas las demás rutas del backoffice, servir el index.html transformado
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
  app.listen(port, () => {
    console.log(`\n🚀 Servidor de desarrollo unificado corriendo en http://localhost:${port}`);
    console.log(`📱 Web principal: http://localhost:${port}`);
    console.log(`🔧 Backoffice: http://localhost:${port}/backoffice\n`);
  });
}

createServer().catch((err) => {
  console.error('❌ Error al iniciar el servidor:', err);
  process.exit(1);
});

