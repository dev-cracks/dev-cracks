import express from 'express';
import { createServer as createViteServer } from 'vite';
import { createServer as createHttpServer } from 'http';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import { readFileSync } from 'fs';

const __dirname = dirname(fileURLToPath(import.meta.url));

async function createServer() {
  const app = express();
  const httpServer = createHttpServer(app);

  try {
    // Crear servidor Vite para la web principal con HMR habilitado
    const webVite = await createViteServer({
      server: { 
        middlewareMode: true,
        hmr: {
          server: httpServer,
        },
      },
      appType: 'spa',
      root: resolve(__dirname, 'web'),
      publicDir: resolve(__dirname, 'web/public'),
    });

    // Crear servidor Vite para el backoffice con base path y HMR habilitado
    const backofficeVite = await createViteServer({
      server: { 
        middlewareMode: true,
        hmr: {
          server: httpServer,
          protocol: 'ws',
          host: 'localhost',
        },
      },
      appType: 'spa',
      root: resolve(__dirname, 'backoffice'),
      publicDir: resolve(__dirname, 'backoffice/public'),
      base: '/backoffice/', // Configurar base path directamente
    });

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
    httpServer.listen(port, () => {
      console.log(`\n🚀 Unified development server running at http://localhost:${port}`);
      console.log(`📱 Main web: http://localhost:${port}`);
      console.log(`🔧 Backoffice: http://localhost:${port}/backoffice\n`);
    });

    httpServer.on('error', (err) => {
      if (err.code === 'EADDRINUSE') {
        console.error(`\n❌ Error: Port ${port} is already in use.`);
        console.error(`💡 Run: powershell -ExecutionPolicy Bypass -File kill-port-5173.ps1\n`);
        process.exit(1);
      } else {
        console.error('❌ Server error:', err);
        process.exit(1);
      }
    });
  } catch (viteError) {
    console.error('❌ Error creating Vite servers:', viteError);
    throw viteError;
  }
}

createServer().catch((err) => {
  console.error('❌ Error starting server:', err);
  process.exit(1);
});
