// SwR-I03: Servidor HTTP en Backend
// ISO/IEC 12207:2017 Sec 6.4.6.4.3 - Implementation Process
// Clean Architecture: Presentation Layer (Entry Point)

require('dotenv').config();
const express = require('express');
const corsMiddleware = require('../infrastructure/config/cors.config');
const errorMiddleware = require('./middlewares/error.middleware');
const datosRoutes = require('./routes/datos.routes');

const app = express();
const PORT = process.env.PORT || 3000;

// ═══════════════════════════════════════════════════════════════
// MIDDLEWARES
// ═══════════════════════════════════════════════════════════════

// SwR-I04: CORS Configuration
// ADR-01: Permite comunicación entre Frontend y Backend
app.use(corsMiddleware);

// Parse JSON bodies
app.use(express.json());

// Logging middleware (ISO 5055: Maintainability)
app.use((req, res, next) => {
  console.info(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// ═══════════════════════════════════════════════════════════════
// ROUTES
// ═══════════════════════════════════════════════════════════════

// Health check endpoint
// CU-03: Verificación de disponibilidad del servicio
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    version: '1.0.0',
    service: 'SKYDATA Backend API'
  });
});

// SwR-F05: Endpoint REST de Datos
app.use('/api', datosRoutes);

// ═══════════════════════════════════════════════════════════════
// ERROR HANDLING
// ═══════════════════════════════════════════════════════════════

// SwR-R01: Manejo de Errores
// ISO/IEC 5055:2021: Reliability
app.use(errorMiddleware);

// ═══════════════════════════════════════════════════════════════
// SERVER START
// ═══════════════════════════════════════════════════════════════

app.listen(PORT, () => {
  console.info('═══════════════════════════════════════════════════════');
  console.info('  SKYDATA Backend API - Sistema de Monitoreo Ambiental');
  console.info('═══════════════════════════════════════════════════════');
  console.info(`✓ Servidor iniciado en puerto ${PORT}`);
  console.info(`✓ Entorno: ${process.env.NODE_ENV || 'development'}`);
  console.info(`✓ Health check: http://localhost:${PORT}/health`);
  console.info(`✓ API datos: http://localhost:${PORT}/api/datos`);
  console.info('═══════════════════════════════════════════════════════');
  console.info('Cumplimiento normativo:');
  console.info('  • ISO/IEC 12207:2017 - Implementation Process');
  console.info('  • ISO/IEC/IEEE 29148:2018 - Requirements Engineering');
  console.info('  • Clean Architecture Principles');
  console.info('═══════════════════════════════════════════════════════');
});

module.exports = app;