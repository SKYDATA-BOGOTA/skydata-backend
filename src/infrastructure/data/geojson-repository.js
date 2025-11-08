// SwR-F08: Datos de Demostración
const fs = require('fs').promises;
const path = require('path');
const IDataRepository = require('../../domain/interfaces/data-repository.interface');
const GeoJSONValidator = require('../validators/geojson.validator');

class GeoJSONRepository extends IDataRepository {
  constructor(dataFilePath) {
    super();
    this.dataFilePath = dataFilePath || path.join(__dirname, '../../../data/mock-data.json');
  }

  async getAllData() {
    try {
      const fileContent = await fs.readFile(this.dataFilePath, 'utf-8');
      const data = JSON.parse(fileContent);
      const validation = GeoJSONValidator.validate(data);
      if (!validation.valid) {
        throw new Error(`GeoJSON inválido: ${validation.errors.join(', ')}`);
      }
      return data;
    } catch (error) {
      throw new Error(`Error al obtener datos: ${error.message}`);
    }
  }

  async getDataById(id) {
    const allData = await this.getAllData();
    const feature = allData.features.find(f => f.properties.id === id);
    if (!feature) {
      throw new Error(`Estación ${id} no encontrada`);
    }
    return feature;
  }
}
module.exports = GeoJSONRepository;