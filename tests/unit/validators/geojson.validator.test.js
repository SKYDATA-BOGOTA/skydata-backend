// SwR-ST01: Tests de Validador GeoJSON
// ISO/IEC 29119:2013: Software Testing
// ISO/IEC 12207:2017: Sec 6.4.6.4.3 - Unit Testing

const GeoJSONValidator = require('../../../src/infrastructure/validators/geojson.validator');

/**
 * Test Suite: GeoJSON Validator
 * 
 * Trazabilidad:
 * - SwR-ST01: GeoJSON RFC 7946
 * - SwR-V01: Pruebas Unitarias
 * - RFC 7946: GeoJSON Format Specification
 */
describe('GeoJSONValidator', () => {
  // SwR-ST01: Validación de estructura FeatureCollection
  describe('validate() - Estructura FeatureCollection', () => {
    test('acepta GeoJSON válido con FeatureCollection', () => {
      const validGeoJSON = {
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            geometry: {
              type: 'Point',
              coordinates: [-74.0817, 4.6097]
            },
            properties: {
              estacion: 'Test',
              temperatura: 20
            }
          }
        ]
      };

      const result = GeoJSONValidator.validate(validGeoJSON);
      expect(result.valid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    test('rechaza GeoJSON sin type', () => {
      const invalid = {
        features: []
      };

      const result = GeoJSONValidator.validate(invalid);
      expect(result.valid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
    });

    test('rechaza GeoJSON con type incorrecto', () => {
      const invalid = {
        type: 'Feature',  // Debe ser FeatureCollection
        features: []
      };

      const result = GeoJSONValidator.validate(invalid);
      expect(result.valid).toBe(false);
    });

    test('rechaza GeoJSON sin features array', () => {
      const invalid = {
        type: 'FeatureCollection'
        // falta features
      };

      const result = GeoJSONValidator.validate(invalid);
      expect(result.valid).toBe(false);
    });
  });

  // RFC 7946: Validación de Features
  describe('validate() - Features individuales', () => {
    test('valida Feature con geometría Point válida', () => {
      const valid = {
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            geometry: {
              type: 'Point',
              coordinates: [-74.0817, 4.6097]
            },
            properties: {}
          }
        ]
      };

      const result = GeoJSONValidator.validate(valid);
      expect(result.valid).toBe(true);
    });

    test('rechaza Feature sin geometry', () => {
      const invalid = {
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            properties: {}
          }
        ]
      };

      const result = GeoJSONValidator.validate(invalid);
      expect(result.valid).toBe(false);
    });

    test('rechaza coordenadas fuera de rango', () => {
      const invalid = {
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            geometry: {
              type: 'Point',
              coordinates: [-200, 100]  // Fuera de rango válido
            },
            properties: {}
          }
        ]
      };

      const result = GeoJSONValidator.validate(invalid);
      expect(result.valid).toBe(false);
    });
  });

  // SwR-DB01: Validación de properties SKYDATA
  describe('validateSkydataProperties()', () => {
    test('acepta properties válidas con todos los campos', () => {
      const properties = {
        estacion: 'Test',
        temperatura: 20.5,
        humedad: 65,
        calidad_aire: 45,
        ruido: 70,
        timestamp: '2024-01-15T10:30:00Z'
      };

      const result = GeoJSONValidator.validateSkydataProperties(properties);
      expect(result.valid).toBe(true);
    });

    test('rechaza properties sin campo requerido', () => {
      const properties = {
        estacion: 'Test',
        temperatura: 20.5
        // faltan otros campos
      };

      const result = GeoJSONValidator.validateSkydataProperties(properties);
      expect(result.valid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
    });

    test('rechaza tipos de datos incorrectos', () => {
      const properties = {
        estacion: 'Test',
        temperatura: 'veinte',  // Debe ser número
        humedad: 65,
        calidad_aire: 45,
        ruido: 70,
        timestamp: '2024-01-15T10:30:00Z'
      };

      const result = GeoJSONValidator.validateSkydataProperties(properties);
      expect(result.valid).toBe(false);
    });
  });
});