import express from 'express';
import { createServer as createViteServer } from 'vite';
import { createServer as createHttpServer } from 'http';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import { readFileSync, existsSync } from 'fs';
import { Template } from '@walletpass/pass-js';

const __dirname = dirname(fileURLToPath(import.meta.url));

async function createServer() {
  const app = express();
  const httpServer = createHttpServer(app);

  // Middleware para parsear JSON
  app.use(express.json());

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
      configFile: resolve(__dirname, 'backoffice/vite.config.ts'),
      server: { 
        middlewareMode: true,
        hmr: {
          server: httpServer,
          protocol: 'ws',
          host: 'localhost',
          port: 5173, // Usar el mismo puerto que el servidor unificado
          clientPort: 5173, // El cliente debe conectarse al puerto 5173
        },
      },
      appType: 'spa',
    });

    // Crear servidor Vite para el portal con base path y HMR habilitado
    const portalVite = await createViteServer({
      configFile: resolve(__dirname, 'portal/vite.config.ts'),
      server: { 
        middlewareMode: true,
        hmr: {
          server: httpServer,
          protocol: 'ws',
          host: 'localhost',
          port: 5173,
          clientPort: 5173,
        },
      },
      appType: 'spa',
    });

    // Crear servidor Vite para la landing con base path y HMR habilitado
    const landingVite = await createViteServer({
      configFile: resolve(__dirname, 'landing/vite.config.ts'),
      server: { 
        middlewareMode: true,
        hmr: {
          server: httpServer,
          protocol: 'ws',
          host: 'localhost',
          port: 5173,
          clientPort: 5173,
        },
      },
      appType: 'spa',
    });

    // Crear servidor Vite para route-on con base path y HMR habilitado
    const routeOnVite = await createViteServer({
      configFile: resolve(__dirname, 'route-on/vite.config.ts'),
      server: { 
        middlewareMode: true,
        hmr: {
          server: httpServer,
          protocol: 'ws',
          host: 'localhost',
          port: 5173,
          clientPort: 5173,
        },
      },
      appType: 'spa',
    });

    // Crear servidor Vite para dev-coach con base path y HMR habilitado
    const devCoachVite = await createViteServer({
      configFile: resolve(__dirname, 'dev-coach/vite.config.ts'),
      server: { 
        middlewareMode: true,
        hmr: {
          server: httpServer,
          protocol: 'ws',
          host: 'localhost',
          port: 5173,
          clientPort: 5173,
        },
      },
      appType: 'spa',
    });

    // Crear servidor Vite para dev-pool con base path y HMR habilitado
    const devPoolVite = await createViteServer({
      configFile: resolve(__dirname, 'dev-pool/vite.config.ts'),
      server: { 
        middlewareMode: true,
        hmr: {
          server: httpServer,
          protocol: 'ws',
          host: 'localhost',
          port: 5173,
          clientPort: 5173,
        },
      },
      appType: 'spa',
    });

    // Crear servidor Vite para fractalize con base path y HMR habilitado
    const fractalizeVite = await createViteServer({
      configFile: resolve(__dirname, 'fractalize/vite.config.ts'),
      server: { 
        middlewareMode: true,
        hmr: {
          server: httpServer,
          protocol: 'ws',
          host: 'localhost',
          port: 5173,
          clientPort: 5173,
        },
      },
      appType: 'spa',
    });

    // Crear servidor Vite para signatures con base path y HMR habilitado
    const signaturesVite = await createViteServer({
      configFile: resolve(__dirname, 'signatures/vite.config.ts'),
      root: resolve(__dirname, 'signatures'),
      server: { 
        middlewareMode: true,
        hmr: {
          server: httpServer,
          protocol: 'ws',
          host: 'localhost',
          port: 5173,
          clientPort: 5173,
        },
      },
      appType: 'spa',
    });

    // Middleware para route-on - debe ir ANTES de landing para evitar conflictos
    app.use('/route-on', async (req, res, next) => {
      if (req.originalUrl.match(/\.(tsx?|jsx?|css|json|svg|png|jpg|jpeg|gif|ico|woff|woff2|ttf|eot|map)$/) ||
          req.originalUrl.match(/^\/(route-on\/)?(src|node_modules|@vite|@id|@fs|@react-refresh|assets)/)) {
        return routeOnVite.middlewares(req, res, (err) => {
          if (err) {
            next(err);
          }
        });
      }
      
      try {
        const template = readFileSync(resolve(__dirname, 'route-on/index.html'), 'utf-8');
        const html = await routeOnVite.transformIndexHtml(req.originalUrl, template);
        res.setHeader('Content-Type', 'text/html');
        return res.send(html);
      } catch (e) {
        routeOnVite.ssrFixStacktrace(e);
        return next(e);
      }
    });

    // Middleware para dev-coach - debe ir ANTES de landing para evitar conflictos
    app.use('/dev-coach', async (req, res, next) => {
      if (req.originalUrl.match(/\.(tsx?|jsx?|css|json|svg|png|jpg|jpeg|gif|ico|woff|woff2|ttf|eot|map)$/) ||
          req.originalUrl.match(/^\/(dev-coach\/)?(src|node_modules|@vite|@id|@fs|@react-refresh|assets)/)) {
        return devCoachVite.middlewares(req, res, (err) => {
          if (err) {
            next(err);
          }
        });
      }
      
      try {
        const template = readFileSync(resolve(__dirname, 'dev-coach/index.html'), 'utf-8');
        const html = await devCoachVite.transformIndexHtml(req.originalUrl, template);
        res.setHeader('Content-Type', 'text/html');
        return res.send(html);
      } catch (e) {
        devCoachVite.ssrFixStacktrace(e);
        return next(e);
      }
    });

    // Middleware para dev-pool - debe ir ANTES de landing para evitar conflictos
    app.use('/dev-pool', async (req, res, next) => {
      if (req.originalUrl.match(/\.(tsx?|jsx?|css|json|svg|png|jpg|jpeg|gif|ico|woff|woff2|ttf|eot|map)$/) ||
          req.originalUrl.match(/^\/(dev-pool\/)?(src|node_modules|@vite|@id|@fs|@react-refresh|assets)/)) {
        return devPoolVite.middlewares(req, res, (err) => {
          if (err) {
            next(err);
          }
        });
      }
      
      try {
        const template = readFileSync(resolve(__dirname, 'dev-pool/index.html'), 'utf-8');
        const html = await devPoolVite.transformIndexHtml(req.originalUrl, template);
        res.setHeader('Content-Type', 'text/html');
        return res.send(html);
      } catch (e) {
        devPoolVite.ssrFixStacktrace(e);
        return next(e);
      }
    });

    // Middleware para fractalize - debe ir ANTES de landing para evitar conflictos
    app.use('/fractalize', async (req, res, next) => {
      if (req.originalUrl.match(/\.(tsx?|jsx?|css|json|svg|png|jpg|jpeg|gif|ico|woff|woff2|ttf|eot|map)$/) ||
          req.originalUrl.match(/^\/(fractalize\/)?(src|node_modules|@vite|@id|@fs|@react-refresh|assets)/)) {
        return fractalizeVite.middlewares(req, res, (err) => {
          if (err) {
            next(err);
          }
        });
      }
      
      try {
        const template = readFileSync(resolve(__dirname, 'fractalize/index.html'), 'utf-8');
        const html = await fractalizeVite.transformIndexHtml(req.originalUrl, template);
        res.setHeader('Content-Type', 'text/html');
        return res.send(html);
      } catch (e) {
        fractalizeVite.ssrFixStacktrace(e);
        return next(e);
      }
    });

    // Middleware para signatures - debe ir ANTES de landing para evitar conflictos
    app.use('/signatures', async (req, res, next) => {
      // Para archivos estáticos y módulos, usar el middleware de Vite directamente
      const isStaticFile = req.originalUrl.match(/\.(tsx?|jsx?|css|json|svg|png|jpg|jpeg|gif|ico|woff|woff2|ttf|eot|map)$/);
      const isModulePath = req.originalUrl.match(/^\/(signatures\/)?(src|node_modules|@vite|@id|@fs|@react-refresh|assets)/);
      
      if (isStaticFile || isModulePath) {
        // Cuando Vite tiene base path configurado, ajustar la URL para que Vite la resuelva correctamente
        const originalUrl = req.url;
        const originalOriginalUrl = req.originalUrl;
        const adjustedUrl = req.originalUrl.replace(/^\/signatures/, '') || '/';
        
        // Temporalmente ajustar las propiedades del request
        req.url = adjustedUrl;
        req.originalUrl = adjustedUrl;
        
        return signaturesVite.middlewares(req, res, (err) => {
          // Restaurar las propiedades originales
          req.url = originalUrl;
          req.originalUrl = originalOriginalUrl;
          
          // Si hay un error (como 404), continuar al siguiente handler
          if (err) {
            next(err);
          }
        });
      }
      
      // Para todas las demás rutas (HTML/SPA), servir el index.html transformado
      try {
        const template = readFileSync(resolve(__dirname, 'signatures/index.html'), 'utf-8');
        const html = await signaturesVite.transformIndexHtml(req.originalUrl, template);
        res.setHeader('Content-Type', 'text/html');
        return res.send(html);
      } catch (e) {
        signaturesVite.ssrFixStacktrace(e);
        return next(e);
      }
    });

    // Middleware para la landing - debe ir antes del portal, backoffice y la web
    app.use('/landing', async (req, res, next) => {
      // Para archivos estáticos y módulos, usar el middleware de Vite directamente
      if (req.originalUrl.match(/\.(tsx?|jsx?|css|json|svg|png|jpg|jpeg|gif|ico|woff|woff2|ttf|eot|map)$/) ||
          req.originalUrl.match(/^\/(landing\/)?(src|node_modules|@vite|@id|@fs|@react-refresh|assets)/)) {
        return landingVite.middlewares(req, res, (err) => {
          // Si hay un error (como 404), continuar al siguiente handler
          if (err) {
            next(err);
          }
        });
      }
      
      // Para todas las demás rutas (HTML/SPA), servir el index.html transformado
      try {
        const template = readFileSync(resolve(__dirname, 'landing/index.html'), 'utf-8');
        const html = await landingVite.transformIndexHtml(req.originalUrl, template);
        res.setHeader('Content-Type', 'text/html');
        return res.send(html);
      } catch (e) {
        landingVite.ssrFixStacktrace(e);
        return next(e);
      }
    });

    // Middleware para el portal - debe ir antes del backoffice y la web
    app.use('/portal', async (req, res, next) => {
      // Para archivos estáticos y módulos, usar el middleware de Vite directamente
      if (req.originalUrl.match(/\.(tsx?|jsx?|css|json|svg|png|jpg|jpeg|gif|ico|woff|woff2|ttf|eot|map)$/) ||
          req.originalUrl.match(/^\/(portal\/)?(src|node_modules|@vite|@id|@fs|@react-refresh|assets)/)) {
        return portalVite.middlewares(req, res, (err) => {
          // Si hay un error (como 404), continuar al siguiente handler
          if (err) {
            next(err);
          }
        });
      }
      
      // Para todas las demás rutas (HTML/SPA), servir el index.html transformado
      try {
        const template = readFileSync(resolve(__dirname, 'portal/index.html'), 'utf-8');
        const html = await portalVite.transformIndexHtml(req.originalUrl, template);
        res.setHeader('Content-Type', 'text/html');
        return res.send(html);
      } catch (e) {
        portalVite.ssrFixStacktrace(e);
        return next(e);
      }
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


    // Almacenamiento en memoria para proyectos (en producción usar base de datos)
    const projectsStore = new Map();

    // API REST para proyectos de dev-coach
    // POST /api/projects - Crear o actualizar un proyecto
    app.post('/api/projects', async (req, res) => {
      try {
        const { id, files } = req.body;

        if (!files || !Array.isArray(files)) {
          return res.status(400).json({
            error: 'Invalid request',
            message: 'El campo files es requerido y debe ser un array'
          });
        }

        // Validar que los archivos tengan la estructura correcta
        for (const file of files) {
          if (!file.filename || typeof file.content !== 'string') {
            return res.status(400).json({
              error: 'Invalid file structure',
              message: 'Cada archivo debe tener filename y content'
            });
          }
        }

        const projectId = id || `project-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
        const now = new Date().toISOString();

        const project = {
          id: projectId,
          files: files,
          createdAt: projectsStore.has(projectId) 
            ? projectsStore.get(projectId).createdAt 
            : now,
          updatedAt: now
        };

        projectsStore.set(projectId, project);

        res.json(project);
      } catch (error) {
        console.error('Error saving project:', error);
        res.status(500).json({
          error: 'Error saving project',
          message: error.message
        });
      }
    });

    // GET /api/projects/:id - Obtener un proyecto por ID
    app.get('/api/projects/:id', async (req, res) => {
      try {
        const { id } = req.params;
        const project = projectsStore.get(id);

        if (!project) {
          return res.status(404).json({
            error: 'Project not found',
            message: `Proyecto con ID ${id} no encontrado`
          });
        }

        res.json(project);
      } catch (error) {
        console.error('Error getting project:', error);
        res.status(500).json({
          error: 'Error getting project',
          message: error.message
        });
      }
    });

    // Endpoint para generar Apple Wallet Pass
    app.post('/api/wallet-pass', async (req, res) => {
      try {
        // Verificar si existen los certificados
        const certPath = resolve(__dirname, 'wallet-keys', 'pass.pem');
        if (!existsSync(certPath)) {
          return res.status(503).json({
            error: 'Wallet certificates not configured',
            message: 'Los certificados de Apple Wallet no están configurados. Por favor, configura los certificados según las instrucciones en el README.'
          });
        }

        const { name, email, phone, website, description } = req.body;

        // Crear template
        const template = new Template('storeCard', {
          passTypeIdentifier: process.env.APPLE_PASS_TYPE_ID || 'pass.com.devcracks.contact',
          teamIdentifier: process.env.APPLE_TEAM_ID || 'DEVCracks',
          organizationName: 'Dev Cracks',
          description: description || 'Tarjeta de presentación Dev Cracks',
          logoText: 'Dev Cracks',
          foregroundColor: 'rgb(88, 166, 255)',
          backgroundColor: 'rgb(13, 17, 23)',
          labelColor: 'rgb(200, 209, 217)'
        });

        // Cargar certificado
        const certPassword = process.env.APPLE_CERT_PASSWORD || '';
        await template.loadCertificate(certPath, certPassword);

        // Crear pass desde template
        const pass = template.createPass({
          serialNumber: `dev-cracks-${Date.now()}`,
          description: description || 'Tarjeta de presentación Dev Cracks'
        });

        // Agregar campos
        pass.primaryFields.add({
          key: 'name',
          label: 'Nombre',
          value: name || 'Dev Cracks'
        });

        pass.secondaryFields.add({
          key: 'phone',
          label: 'Teléfono',
          value: phone || '+34 647 007 280'
        });

        pass.secondaryFields.add({
          key: 'email',
          label: 'Email',
          value: email || 'connect@devcracks.com'
        });

        pass.auxiliaryFields.add({
          key: 'website',
          label: 'Web',
          value: website || 'www.dev-cracks.com'
        });

        pass.backFields.add({
          key: 'description',
          label: 'Descripción',
          value: description || 'Desarrollo de software y soluciones tecnológicas'
        });

        pass.backFields.add({
          key: 'contact',
          label: 'Contacto',
          value: `${email || 'connect@devcracks.com'}\n${phone || '+34 647 007 280'}`
        });

        // Agregar código QR
        pass.barcodes = [{
          message: website || 'https://www.dev-cracks.com',
          format: 'PKBarcodeFormatQR',
          messageEncoding: 'iso-8859-1'
        }];

        // Generar el buffer del pass
        const passBuffer = await pass.asBuffer();

        // Enviar como respuesta
        res.setHeader('Content-Type', 'application/vnd.apple.pkpass');
        res.setHeader('Content-Disposition', 'attachment; filename="dev-cracks-wallet.pkpass"');
        res.send(passBuffer);
      } catch (error) {
        console.error('Error generating wallet pass:', error);
        res.status(500).json({
          error: 'Error generating wallet pass',
          message: error.message
        });
      }
    });

    // Middleware para la web principal - solo para rutas que NO sean de aplicaciones específicas
    app.use((req, res, next) => {
      // Si la ruta es de una aplicación específica, saltar este middleware
      if (req.originalUrl.startsWith('/landing') || 
          req.originalUrl.startsWith('/portal') || 
          req.originalUrl.startsWith('/backoffice') ||
          req.originalUrl.startsWith('/route-on') ||
          req.originalUrl.startsWith('/dev-coach') ||
          req.originalUrl.startsWith('/dev-pool') ||
          req.originalUrl.startsWith('/fractalize') ||
          req.originalUrl.startsWith('/signatures') ||
          req.originalUrl.startsWith('/api/')) {
        return next();
      }
      // Aplicar webVite.middlewares solo para rutas de la web principal
      webVite.middlewares(req, res, next);
    });

    // Fallback para la web principal - servir index.html para rutas SPA
    app.use('*', async (req, res, next) => {
      // Si la ruta es de landing, portal, backoffice, route-on, dev-coach, dev-pool o fractalize, ya fue manejada arriba
      if (req.originalUrl.startsWith('/landing') || 
          req.originalUrl.startsWith('/portal') || 
          req.originalUrl.startsWith('/backoffice') ||
          req.originalUrl.startsWith('/route-on') ||
          req.originalUrl.startsWith('/dev-coach') ||
          req.originalUrl.startsWith('/dev-pool') ||
          req.originalUrl.startsWith('/fractalize') ||
          req.originalUrl.startsWith('/signatures') ||
          req.originalUrl.startsWith('/api/')) {
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
      console.log(`✨ Landing: http://localhost:${port}/landing`);
      console.log(`🎨 Portal: http://localhost:${port}/portal`);
      console.log(`🔧 Backoffice: http://localhost:${port}/backoffice`);
      console.log(`📦 Route On: http://localhost:${port}/route-on`);
      console.log(`👨‍🏫 Dev Coach: http://localhost:${port}/dev-coach`);
      console.log(`👥 Dev Pool: http://localhost:${port}/dev-pool`);
      console.log(`🔷 Fractalize: http://localhost:${port}/fractalize`);
      console.log(`✍️ Signatures: http://localhost:${port}/signatures\n`);
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
