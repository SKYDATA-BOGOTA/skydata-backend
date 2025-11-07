// SwR-F08: Datos de Demostración
// Clean Architecture: Infrastructure Layer - Repository Implementation
// ISO/IEC 12207:2017: Sec 6.4.6.4 - Implementation

const fs = require('fs').promises;
const path = require('path');
const IDataRepository = require('../../domain/interfaces/data-repository.interface');
const GeoJSONValidator = require('../validators/geojson.validator');

/**
 * Implementación de Repositorio de Datos GeoJSON
 * 
 * Trazabilidad:
 * - SwR-F08: Datos de Demostración
 * - SwR-F06: Formato GeoJSON
 * - SyR-F04: Provisión de Datos Estructurados
 * - ADR-02: Uso de GeoJSON
 * - Clean Architecture: Infrastructure Layer
 * 
 * Cumplimiento:
 * - Lee datos desde archivo JSON
 * - Valida formato GeoJSON
 * - Implementa interface IDataRepository
 */
class GeoJSONRepository extends IDataRepository {
  constructor(dataFilePath) {
    super();
    this.dataFilePath = dataFilePath || path.join(__dirname, '../../../data/mock-data.json');
  }

  /**
   * SwR-F05: Obtiene todos los datos ambientales
   * @returns {Promise<Object>} GeoJSON FeatureCollection
   * @throws {Error} Si hay error al leer o validar datos
   */
  async getAllData() {
    try {
      // ISO 5055:2021 - Reliability: Manejo de errores
      const fileContent = await fs.readFile(this.dataFilePath, 'utf-8');
      const data = JSON.parse(fileContent);

      // SwR-ST01: Validar formato GeoJSON
      const validation = GeoJSONValidator.validate(data);
      
      if (!validation.valid) {
        throw new Error(`GeoJSON inválido: ${validation.errors.join(', ')}`);
      }

      return data;
    } catch (error) {
      console.error('Error al leer datos mock:', error.message);
      throw new Error(`Error al obtener datos: ${error.message}`);
    }
  }

  /**
   * Obtiene datos de una estación específica
   * @param {string} id - ID de la estación
   * @returns {Promise<Object>} Feature de GeoJSON
   * @throws {Error} Si no se encuentra la estación
   */
  async getDataById(id) {
    const allData = await this.getAllData();
    const feature = allData.features.find(f => f.properties.id === id);

    if (!feature) {
      throw new Error(`Estación con ID ${id} no encontrada`);
    }

    return feature;
  }
}

module.exports = GeoJSONRepository;