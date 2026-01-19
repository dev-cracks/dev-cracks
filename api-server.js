import express from 'express';
import { createServer } from 'http';
import apiRouter from './src/api/index.js';

const app = express();
const httpServer = createServer(app);

// Middleware
app.use(express.json());

// API Routes
app.use('/api', apiRouter);

// Health check
app.get('/health', (req, res) => {
    res.status(200).send('OK');
});

const port = process.env.PORT || 8080;

httpServer.listen(port, () => {
    console.log(`🚀 API Server running on port ${port}`);
});
