// Clean Architecture: Application Layer - Use Case
// CU-03: Acceder a Datos mediante Servicio

/**
 * Caso de Uso: Obtener Datos Ambientales
 * 
 * Trazabilidad:
 * - CU-03: Acceder a Datos mediante Servicio
 * - SwR-F05: Endpoint REST de Datos
 * - SyR-F05: Acceso a Información
 * - Clean Architecture: Application Layer (Use Cases)
 * 
 * Cumplimiento:
 * - ISO/IEC 12207:2017: Implementation Process
 * - Clean Architecture: Dependency Rule
 * - SOLID: Single Responsibility Principle
 */
class GetDatosUseCase {
  /**
   * Constructor con inyección de dependencias
   * @param {IDataRepository} dataRepository - Repositorio de datos
   */
  constructor(dataRepository) {
    this.dataRepository = dataRepository;
  }

  /**
   * Ejecuta el caso de uso
   * SwR-F06: Retorna datos en formato GeoJSON
   * @returns {Promise<Object>} GeoJSON con datos ambientales
   * @throws {Error} Si ocurre un error
   */
  async execute() {
    try {
      // SwR-F08: Obtener datos de demostración
      const datos = await this.dataRepository.getAllData();
      
      // ISO 5055:2021 - Reliability: Validación de datos
      if (!datos || !datos.features || datos.features.length === 0) {
        throw new Error('No hay datos disponibles');
      }

      return datos;
    } catch (error) {
      console.error('Error en GetDatosUseCase:', error.message);
      throw error;
    }
  }

  /**
   * Obtiene datos de una estación específica
   * @param {string} id - ID de la estación
   * @returns {Promise<Object>} Feature de GeoJSON
   */
  async executeById(id) {
    try {
      const dato = await this.dataRepository.getDataById(id);
      return dato;
    } catch (error) {
      console.error(`Error obteniendo estación ${id}:`, error.message);
      throw error;
    }
  }
}

module.exports = GetDatosUseCase;