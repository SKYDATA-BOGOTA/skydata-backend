/**
 * SwR-I03: Servidor HTTP en Backend
 * 
 * Este archivo configura y exporta el servidor Express para la API de SKYDATA.
 * Implementa la capa de presentación del sistema siguiendo arquitectura limpia.
 */

// Carga las variables de entorno desde el archivo .env
require('dotenv').config();

// Importación de dependencias principales
const express = require('express');

// Importación de middlewares
const corsMiddleware = require('../infrastructure/config/cors.config');
const errorMiddleware = require('./middlewares/error.middleware');

// Importación de rutas
const datosRoutes = require('./routes/datos.routes');

// Inicialización de la aplicación Express
const app = express();

// Configuración del puerto desde variables de entorno o puerto por defecto
const PORT = process.env.PORT || 3000;

/**
 * Configuración de Middlewares
 * Se aplican en el orden especificado para cada petición HTTP
 */

// Middleware de CORS - permite peticiones desde orígenes permitidos
app.use(corsMiddleware);

// Middleware para parsear JSON en el body de las peticiones
app.use(express.json());

/**
 * Middleware de logging personalizado
 * Registra todas las peticiones HTTP con timestamp, método y URL
 */
app.use((req, res, next) => {
  console.info(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

/**
 * Endpoint de Health Check
 * Permite verificar que el servidor está activo y funcionando correctamente
 * 
 * @route GET /health
 * @returns {Object} Estado del servidor, timestamp, versión y nombre del servicio
 */
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    version: '1.0.0',
    service: 'SKYDATA Backend API'
  });
});

/**
 * Registro de rutas de la API
 * Todas las rutas de datos se montan bajo el prefijo /api
 */
app.use('/api', datosRoutes);

/**
 * Middleware de manejo de errores
 * Debe ser el último middleware para capturar errores de toda la aplicación
 */
app.use(errorMiddleware);

/**
 * Inicio del servidor HTTP
 * Escucha en el puerto configurado y muestra información de inicio
 */
app.listen(PORT, () => {
<<<<<<< HEAD
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
  console.info('  • Clean Architecture ');
  console.info('═══════════════════════════════════════════════════════');
=======
  console.info('═══════════════════════════════════════════════════');
  console.info('  SKYDATA Backend API');
  console.info('═══════════════════════════════════════════════════');
  console.info(`✓ Servidor en puerto ${PORT}`);
  console.info(`✓ Health: http://localhost:${PORT}/health`);
  console.info(`✓ API: http://localhost:${PORT}/api/datos`);
  console.info('═══════════════════════════════════════════════════');
>>>>>>> 30c7af37dfc9e437aa526f8378c64656d9c3b134
});

// Exporta la aplicación para testing y reutilización
module.exports = app;