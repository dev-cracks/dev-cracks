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
