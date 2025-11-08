/**
 * SwR-I04: CORS Habilitado
 * 
 * Configuración de Cross-Origin Resource Sharing (CORS) para la API.
 * Define qué orígenes externos pueden acceder a los recursos del servidor.
 */

const cors = require('cors');

/**
 * Opciones de configuración para CORS
 * @type {Object}
 */
const corsOptions = {
  /**
   * Función de validación de origen
   * Determina si una petición desde un origen específico debe ser permitida
   * 
   * @param {string} origin - El origen de la petición HTTP
   * @param {Function} callback - Callback para indicar si se permite (null, true) o rechaza (error)
   */
  origin: function (origin, callback) {
    // Lista de orígenes permitidos para hacer peticiones a la API
    const allowedOrigins = [
      process.env.CORS_ORIGIN || 'http://localhost:8080', // Origen desde variable de entorno
      'http://localhost:8080',                             // Frontend en desarrollo (localhost)
      'http://127.0.0.1:8080'                             // Frontend en desarrollo (127.0.0.1)
    ];
    
    /**
     * Permite la petición si:
     * - No hay origen (peticiones desde mismo servidor o herramientas como Postman)
     * - El origen está en la lista de orígenes permitidos
     */
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      // Rechaza la petición con error de CORS
      callback(new Error('Not allowed by CORS'));
    }
  },
  
  /**
   * Métodos HTTP permitidos
   * Define qué verbos HTTP pueden ser utilizados en las peticiones cross-origin
   */
  methods: ['GET', 'POST', 'OPTIONS'],
  
  /**
   * Headers permitidos en las peticiones
   * Define qué cabeceras HTTP pueden ser enviadas por el cliente
   */
  allowedHeaders: ['Content-Type', 'Authorization'],
  
  /**
   * Permite el envío de credenciales (cookies, headers de autenticación)
   * en peticiones cross-origin
   */
  credentials: true,
  
  /**
   * Código de estado para peticiones OPTIONS exitosas
   * Algunos navegadores legacy requieren 200 en lugar de 204
   */
  optionsSuccessStatus: 200
};

/**
 * Mensaje de advertencia en modo desarrollo
 * Alerta que CORS está configurado en modo desarrollo
 */
if (process.env.NODE_ENV === 'development') {
  console.warn('⚠ CORS en modo desarrollo');
}

// Exporta el middleware de CORS configurado
module.exports = cors(corsOptions);