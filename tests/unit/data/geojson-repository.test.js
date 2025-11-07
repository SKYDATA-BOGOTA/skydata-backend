// Tests: GeoJSON Repository
// ISO/IEC 12207:2017: Sec 6.4.6.4.3 - Unit Testing

const GeoJSONRepository = require('../../../src/infrastructure/data/geojson-repository');
const path = require('path');

/**
 * Test Suite: GeoJSON Repository
 * 
 * Trazabilidad:
 * - SwR-F08: Datos de Demostración
 * - SwR-V01: Pruebas Unitarias
 */
describe('GeoJSONRepository', () => {
  let repository;

  beforeEach(() => {
    const testDataPath = path.join(__dirname, '../../../data/mock-data.json');
    repository = new GeoJSONRepository(testDataPath);
  });

  describe('getAllData()', () => {
    test('retorna GeoJSON válido', async () => {
      const data = await repository.getAllData();
      
      expect(data).toBeDefined();
      expect(data.type).toBe('FeatureCollection');
      expect(Array.isArray(data.features)).toBe(true);
      expect(data.features.length).toBeGreaterThan(0);
    });

    test('cada feature tiene estructura correcta', async () => {
      const data = await repository.getAllData();
      
      data.features.forEach(feature => {
        expect(feature.type).toBe('Feature');
        expect(feature.geometry).toBeDefined();
        expect(feature.geometry.type).toBe('Point');
        expect(Array.isArray(feature.geometry.coordinates)).toBe(true);
        expect(feature.geometry.coordinates).toHaveLength(2);
        expect(feature.properties).toBeDefined();
      });
    });

    test('lanza error si archivo no existe', async () => {
      const invalidRepo = new GeoJSONRepository('/ruta/inexistente.json');
      
      await expect(invalidRepo.getAllData()).rejects.toThrow();
    });
  });

  describe('getDataById()', () => {
    test('retorna feature cuando existe el ID', async () => {
      const feature = await repository.getDataById('EST-001');
      
      expect(feature).toBeDefined();
      expect(feature.properties.id).toBe('EST-001');
    });

    test('lanza error cuando no existe el ID', async () => {
      await expect(repository.getDataById('EST-999')).rejects.toThrow('no encontrada');
    });
  });
});