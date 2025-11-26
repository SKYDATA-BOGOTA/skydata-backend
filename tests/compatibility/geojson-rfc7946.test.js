/**
 * Validación GeoJSON RFC 7946 (Backend)
 * 
 * Base Normativa:
 * - RFC 7946 (GeoJSON standard)
 * - ISO/IEC 25010:2011 Sección 8.5.1 (Compatibilidad)
 * 
 * Trazabilidad:
 * - SwR-I02: Compatibilidad con estándares web (GeoJSON RFC 7946)
 * 
 * Objetivo: Validación estricta de formato GeoJSON según RFC 7946
 */

const request = require('supertest');
const app = require('../src/presentation/server'); // Ajustar ruta según estructura

/**
 * Validador estricto de GeoJSON según RFC 7946
 */
function validateGeoJSONStrict(geojson) {
  const errors = [];
  
  // Verificar que es un objeto
  if (typeof geojson !== 'object' || geojson === null || Array.isArray(geojson)) {
    errors.push('GeoJSON debe ser un objeto, no un array o null');
    return errors;
  }
  
  // Verificar tipo
  if (!geojson.type) {
    errors.push('GeoJSON debe tener propiedad "type"');
  } else {
    const validTypes = [
      'FeatureCollection',
      'Feature',
      'Point',
      'LineString',
      'Polygon',
      'MultiPoint',
      'MultiLineString',
      'MultiPolygon',
      'GeometryCollection'
    ];
    
    if (!validTypes.includes(geojson.type)) {
      errors.push(`Tipo GeoJSON inválido: ${geojson.type}. Tipos válidos: ${validTypes.join(', ')}`);
    }
  }
  
  // Validar FeatureCollection
  if (geojson.type === 'FeatureCollection') {
    if (!geojson.features) {
      errors.push('FeatureCollection debe tener propiedad "features"');
    } else if (!Array.isArray(geojson.features)) {
      errors.push('FeatureCollection.features debe ser un array');
    } else {
      geojson.features.forEach((feature, index) => {
        if (!feature.type || feature.type !== 'Feature') {
          errors.push(`Feature ${index} debe tener type="Feature"`);
        }
        if (!feature.geometry) {
          errors.push(`Feature ${index} debe tener propiedad "geometry"`);
        } else {
          const geomErrors = validateGeometry(feature.geometry, index);
          errors.push(...geomErrors);
        }
      });
    }
  }
  
  return errors;
}

/**
 * Validador de geometría según RFC 7946
 */
function validateGeometry(geometry, featureIndex = 0) {
  const errors = [];
  
  if (!geometry.type) {
    errors.push(`Geometría en feature ${featureIndex} debe tener propiedad "type"`);
    return errors;
  }
  
  const validGeometryTypes = [
    'Point',
    'LineString',
    'Polygon',
    'MultiPoint',
    'MultiLineString',
    'MultiPolygon',
    'GeometryCollection'
  ];
  
  if (!validGeometryTypes.includes(geometry.type)) {
    errors.push(`Tipo de geometría inválido en feature ${featureIndex}: ${geometry.type}`);
  }
  
  if (!geometry.coordinates && geometry.type !== 'GeometryCollection') {
    errors.push(`Geometría ${geometry.type} en feature ${featureIndex} debe tener propiedad "coordinates"`);
  }
  
  // Validar Point específicamente
  if (geometry.type === 'Point') {
    if (!Array.isArray(geometry.coordinates)) {
      errors.push(`Point en feature ${featureIndex} debe tener coordinates como array`);
    } else if (geometry.coordinates.length !== 2) {
      errors.push(`Point en feature ${featureIndex} debe tener coordinates como [longitude, latitude]`);
    } else {
      const [lon, lat] = geometry.coordinates;
      if (typeof lon !== 'number' || typeof lat !== 'number') {
        errors.push(`Point en feature ${featureIndex}: coordinates deben ser números`);
      }
      if (lon < -180 || lon > 180) {
        errors.push(`Point en feature ${featureIndex}: longitud debe estar entre -180 y 180`);
      }
      if (lat < -90 || lat > 90) {
        errors.push(`Point en feature ${featureIndex}: latitud debe estar entre -90 y 90`);
      }
    }
  }
  
  return errors;
}

describe('Validación GeoJSON RFC 7946', () => {
  /**
   * Test COMP-GEO-BE-001: Estructura FeatureCollection válida
   * RFC 7946, ISO/IEC 25010:2011 8.5.1
   */
  test('COMP-GEO-BE-001: El endpoint retorna FeatureCollection válido según RFC 7946', async () => {
    const response = await request(app)
      .get('/api/datos')
      .expect(200);
    
    const geojson = response.body;
    const errors = validateGeoJSONStrict(geojson);
    
    expect(errors).toHaveLength(0);
    expect(geojson.type).toBe('FeatureCollection');
    expect(Array.isArray(geojson.features)).toBe(true);
  });

  /**
   * Test COMP-GEO-BE-002: Coordenadas válidas según RFC 7946
   * RFC 7946, ISO/IEC 25010:2011 8.5.1
   */
  test('COMP-GEO-BE-002: Todas las coordenadas están en rango válido', async () => {
    const response = await request(app)
      .get('/api/datos')
      .expect(200);
    
    const geojson = response.body;
    
    if (geojson.type === 'FeatureCollection' && Array.isArray(geojson.features)) {
      geojson.features.forEach((feature, index) => {
        if (feature.geometry && feature.geometry.type === 'Point') {
          const [lon, lat] = feature.geometry.coordinates;
          expect(lon).toBeGreaterThanOrEqual(-180);
          expect(lon).toBeLessThanOrEqual(180);
          expect(lat).toBeGreaterThanOrEqual(-90);
          expect(lat).toBeLessThanOrEqual(90);
        }
      });
    }
  });

  /**
   * Test COMP-GEO-BE-003: Tipos de geometría válidos
   * RFC 7946, ISO/IEC 25010:2011 8.5.1
   */
  test('COMP-GEO-BE-003: Todos los tipos de geometría son válidos según RFC 7946', async () => {
    const response = await request(app)
      .get('/api/datos')
      .expect(200);
    
    const geojson = response.body;
    const validTypes = [
      'Point',
      'LineString',
      'Polygon',
      'MultiPoint',
      'MultiLineString',
      'MultiPolygon',
      'GeometryCollection'
    ];
    
    if (geojson.type === 'FeatureCollection' && Array.isArray(geojson.features)) {
      geojson.features.forEach((feature) => {
        if (feature.geometry && feature.geometry.type) {
          expect(validTypes).toContain(feature.geometry.type);
        }
      });
    }
  });

  /**
   * Test COMP-GEO-BE-004: Estructura de Feature válida
   * RFC 7946, ISO/IEC 25010:2011 8.5.1
   */
  test('COMP-GEO-BE-004: Cada Feature tiene estructura válida según RFC 7946', async () => {
    const response = await request(app)
      .get('/api/datos')
      .expect(200);
    
    const geojson = response.body;
    
    if (geojson.type === 'FeatureCollection' && Array.isArray(geojson.features)) {
      geojson.features.forEach((feature, index) => {
        expect(feature).toHaveProperty('type');
        expect(feature.type).toBe('Feature');
        expect(feature).toHaveProperty('geometry');
        expect(feature.geometry).toHaveProperty('type');
        expect(feature.geometry).toHaveProperty('coordinates');
      });
    }
  });
});

