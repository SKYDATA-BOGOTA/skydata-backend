// Clean Architecture: Domain Layer - Repository Interface
// Dependency Inversion Principle (SOLID)

/**
 * Interfaz de Repositorio de Datos
 * 
 * Trazabilidad:
 * - SwR-DC02: Arquitectura de Componentes (Clean Architecture)
 * - Clean Architecture: Domain Layer define interfaces
 * - SOLID: Dependency Inversion Principle
 * 
 * Esta interfaz define el contrato que debe cumplir cualquier
 * implementación de repositorio de datos ambientales.
 */
class IDataRepository {
  /**
   * Obtiene todos los datos ambientales
   * @returns {Promise<Object>} GeoJSON con datos ambientales
   * @throws {Error} Si ocurre un error al obtener los datos
   */
  async getAllData() {
    throw new Error('Método getAllData() debe ser implementado');
  }

  /**
   * Obtiene datos por ID de estación
   * @param {string} id - ID de la estación
   * @returns {Promise<Object>} Feature de GeoJSON
   * @throws {Error} Si ocurre un error
   */
  async getDataById(id) {
    throw new Error('Método getDataById() debe ser implementado');
  }
}

module.exports = IDataRepository;