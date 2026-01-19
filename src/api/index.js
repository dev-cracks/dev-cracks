import { Router } from 'express';
import { db } from '../lib/firebase.js';
import { Template } from '@walletpass/pass-js';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { existsSync } from 'fs';

const router = Router();
const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = resolve(__dirname, '../..');

// POST /api/projects - Crear o actualizar un proyecto
router.post('/projects', async (req, res) => {
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

        const projectData = {
            id: projectId,
            files: files,
            updatedAt: now
        };

        // Si es nuevo, agregar createdAt
        const projectRef = db.collection('projects').doc(projectId);
        const doc = await projectRef.get();

        if (!doc.exists) {
            projectData.createdAt = now;
        }

        await projectRef.set(projectData, { merge: true });

        res.json(projectData);
    } catch (error) {
        console.error('Error saving project:', error);
        res.status(500).json({
            error: 'Error saving project',
            message: error.message
        });
    }
});

// GET /api/projects/:id - Obtener un proyecto por ID
router.get('/projects/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const projectRef = db.collection('projects').doc(id);
        const doc = await projectRef.get();

        if (!doc.exists) {
            return res.status(404).json({
                error: 'Project not found',
                message: `Proyecto con ID ${id} no encontrado`
            });
        }

        res.json(doc.data());
    } catch (error) {
        console.error('Error getting project:', error);
        res.status(500).json({
            error: 'Error getting project',
            message: error.message
        });
    }
});

// Endpoint para generar Apple Wallet Pass
router.post('/wallet-pass', async (req, res) => {
    try {
        // Verificar si existen los certificados
        // En Cloud Run, idealmente estos se montan como secretos o se incluyen en el build si no son críticos (esto último no es recomendado para keys reales)
        // Para simplificar, asumiremos que están en la misma ruta relativa o configuraremos una ruta por variable de entorno
        const certPath = process.env.WALLET_CERT_PATH || resolve(rootDir, 'wallet-keys', 'pass.pem');

        if (!existsSync(certPath)) {
            console.warn(`Certificate not found at ${certPath}`);
            return res.status(503).json({
                error: 'Wallet certificates not configured',
                message: 'Los certificados de Apple Wallet no están configurados.'
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

export default router;
