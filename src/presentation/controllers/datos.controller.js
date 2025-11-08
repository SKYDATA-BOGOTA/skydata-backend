// SwR-F05: Endpoint REST de Datos - Controller
// Clean Architecture: Presentation Layer - Controllers
// ISO/IEC 12207:2017: Sec 6.4.6.4 - Implementation

const GetDatosUseCase = require('../../application/use-cases/get-datos.use-case');

const GeoJSONRepository = require('../../infrastructure/data/geojson-repository');

/**
 * Controlador de Datos Ambientales
 * 
 * Trazabilidad:
 * - SwR-F05: Endpoint REST de Datos
 * - CU-03: Acceder a Datos mediante Servicio
 * - SwR-ST03: REST API
 * - Clean Architecture: Presentation Layer
 * 
 * Responsabilidades:
 * - Manejar requests HTTP
 * - Invocar use cases
 * - Formatear responses HTTP
 * - Manejo de errores HTTP
 */
class DatosController {
  constructor() {
    // Clean Architecture: Dependency Injection
    const repository = new GeoJSONRepository();
    this.getDatosUseCase = new GetDatosUseCase(repository);
  }

  /**
   * SwR-F05: GET /api/datos - Retorna todos los datos
   * SwR-F06: Formato GeoJSON RFC 7946
   * @param {Request} req - Express request
   * @param {Response} res - Express response
   * @param {NextFunction} next - Express next
   */
  async getAllDatos(req, res, next) {
    try {
      // CU-03: Acceder a Datos mediante Servicio
      const datos = await this.getDatosUseCase.execute();

      // SwR-F06: Retornar GeoJSON
      // SwR-ST03: REST API - HTTP 200 OK
      res.status(200).json(datos);
    } catch (error) {
      // SwR-R01: Manejo de Errores
      console.error('Error en getAllDatos:', error.message);
      next(error);
    }
  }

  /**
   * GET /api/datos/:id - Retorna datos de una estación
   * @param {Request} req - Express request
   * @param {Response} res - Express response
   * @param {NextFunction} next - Express next
   */
  async getDatoById(req, res, next) {
    try {
      const { id } = req.params;
      const dato = await this.getDatosUseCase.executeById(id);

      res.status(200).json(dato);
    } catch (error) {
      console.error(`Error obteniendo dato ${req.params.id}:`, error.message);
      
      // Si no se encuentra, retornar 404
      if (error.message.includes('no encontrada')) {
        res.status(404).json({
          error: 'Not Found',
          message: error.message
        });
      } else {
        next(error);
      }
    }
  }
}

module.exports = DatosController;