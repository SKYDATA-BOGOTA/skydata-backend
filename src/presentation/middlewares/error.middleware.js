// SwR-R01: Manejo de Errores
// ISO/IEC 5055:2021: Reliability - Error Handling
// Clean Architecture: Presentation Layer - Error Middleware

/**
 * Middleware centralizado de manejo de errores
 * 
 * Trazabilidad:
 * - SwR-R01: Manejo de Errores
 * - SyR-U01: Facilidad de Comprensión (mensajes claros)
 * - ISO/IEC 5055:2021: Reliability
 * - ISO/IEC 12207:2017: Implementation Process
 * 
 * Cumplimiento:
 * - Captura y procesa todos los errores de la aplicación
 * - Retorna respuestas HTTP con códigos apropiados
 * - Registra errores para debugging
 * - No expone información sensible en producción
 */
const errorHandler = (err, req, res, next) => {
  // Log del error (ISO 5055: Maintainability)
  console.error('═══════════════════════════════════════');
  console.error('ERROR CAPTURADO:');
  console.error(`Timestamp: ${new Date().toISOString()}`);
  console.error(`Path: ${req.method} ${req.url}`);
  console.error(`Message: ${err.message}`);
  console.error(`Stack: ${err.stack}`);
  console.error('═══════════════════════════════════════');

  // Determinar código de estado HTTP
  const statusCode = err.statusCode || 500;

  // Respuesta al cliente
  // SyR-U01: Mensajes claros y comprensibles
  const response = {
    error: err.name || 'Error',
    message: err.message || 'Error interno del servidor',
    timestamp: new Date().toISOString()
  };

  // ISO 5055:2021 - Security: No exponer stack trace en producción
  if (process.env.NODE_ENV !== 'production') {
    response.stack = err.stack;
    response.path = req.url;
  }

  res.status(statusCode).json(response);
};

module.exports = errorHandler;