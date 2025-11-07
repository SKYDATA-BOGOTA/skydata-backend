// SwR-I04: CORS Habilitado
// ADR-01: Arquitectura de Dos Capas - Comunicación Frontend-Backend
// ISO/IEC 5055:2021: Security - CORS Configuration

const cors = require('cors');

/**
 * Configuración de CORS (Cross-Origin Resource Sharing)
 * 
 * Trazabilidad:
 * - SwR-I04: CORS Habilitado
 * - SyR-I02: Interfaz entre Componentes
 * - ADR-01: Arquitectura de Dos Capas
 * 
 * Cumplimiento:
 * - Permite peticiones desde el frontend configurado
 * - Previene accesos no autorizados
 * - Configurable mediante variables de entorno
 */
const corsOptions = {
  origin: function (origin, callback) {
    // SwR-I04: Permitir origen del frontend
    const allowedOrigins = [
      process.env.CORS_ORIGIN || 'http://localhost:8080',
      'http://localhost:8080',
      'http://127.0.0.1:8080'
    ];
    
    // En desarrollo, permitir requests sin origin (ej: Postman, curl)
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  optionsSuccessStatus: 200
};

// ISO 5055:2021 - Security: No usar '*' en producción
if (process.env.NODE_ENV === 'development') {
  console.warn('⚠ CORS en modo desarrollo - permitiendo múltiples orígenes');
}

module.exports = cors(corsOptions);