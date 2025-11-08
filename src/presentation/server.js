// SwR-I03: Servidor HTTP en Backend
require('dotenv').config();
const express = require('express');
const corsMiddleware = require('../infrastructure/config/cors.config');
const errorMiddleware = require('./middlewares/error.middleware');
const datosRoutes = require('./routes/datos.routes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(corsMiddleware);
app.use(express.json());

app.use((req, res, next) => {
  console.info(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Routes
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    version: '1.0.0',
    service: 'SKYDATA Backend API'
  });
});

app.use('/api', datosRoutes);
app.use(errorMiddleware);

// Start server
app.listen(PORT, () => {
  console.info('═══════════════════════════════════════════════════════');
  console.info('  SKYDATA Backend API');
  console.info('═══════════════════════════════════════════════════════');
  console.info(`✓ Servidor en puerto ${PORT}`);
  console.info(`✓ Health: http://localhost:${PORT}/health`);
  console.info(`✓ API: http://localhost:${PORT}/api/datos`);
  console.info('═══════════════════════════════════════════════════════');
});

module.exports = app;