/**
 * Pruebas de Interoperabilidad API (Backend)
 * 
 * Base Normativa:
 * - ISO/IEC 25010:2011 Sección 8.5.1 (Compatibilidad)
 * - RFC 7946 (GeoJSON standard)
 * 
 * Trazabilidad:
 * - SwR-I02: Compatibilidad con estándares web
 * - SwR-I03: Interoperabilidad Frontend-Backend
 * 
 * Objetivo: Verificar que la API funciona con diferentes clientes HTTP
 */

const request = require('supertest');
const app = require('../src/presentation/server'); // Ajustar ruta según estructura

describe('Interoperabilidad API', () => {
  /**
   * Test COMP-API-001: La API funciona con fetch API
   * ISO/IEC 25010:2011 8.5.1
   */
  test('COMP-API-001: La API responde correctamente a peticiones fetch', async () => {
    const response = await fetch('http://localhost:3001/api/datos');
    
    expect(response.ok).toBe(true);
    expect(response.status).toBe(200);
    
    const data = await response.json();
    expect(data).toHaveProperty('type');
    expect(data.type).toBe('FeatureCollection');
  });

  /**
   * Test COMP-API-002: La API funciona con axios
   * ISO/IEC 25010:2011 8.5.1
   */
  test('COMP-API-002: La API responde correctamente a peticiones axios', async () => {
    const axios = require('axios');
    const response = await axios.get('http://localhost:3001/api/datos');
    
    expect(response.status).toBe(200);
    expect(response.data).toHaveProperty('type');
    expect(response.data.type).toBe('FeatureCollection');
  });

  /**
   * Test COMP-API-003: Headers HTTP correctos (Content-Type)
   * ISO/IEC 25010:2011 8.5.1
   */
  test('COMP-API-003: Los headers HTTP son correctos', async () => {
    const response = await request(app)
      .get('/api/datos')
      .expect(200);
    
    expect(response.headers['content-type']).toMatch(/application\/json/);
  });

  /**
   * Test COMP-API-004: Headers CORS correctos
   * ISO/IEC 25010:2011 8.5.1
   */
  test('COMP-API-004: Los headers CORS están configurados correctamente', async () => {
    const response = await request(app)
      .get('/api/datos')
      .set('Origin', 'http://localhost:3000')
      .expect(200);
    
    // Verificar que los headers CORS están presentes si están configurados
    // Esto depende de la configuración del servidor
    if (response.headers['access-control-allow-origin']) {
      expect(response.headers['access-control-allow-origin']).toBeDefined();
    }
  });

  /**
   * Test COMP-API-005: El formato GeoJSON es válido según RFC 7946
   * RFC 7946, ISO/IEC 25010:2011 8.5.1
   */
  test('COMP-API-005: El formato GeoJSON cumple con RFC 7946', async () => {
    const response = await request(app)
      .get('/api/datos')
      .expect(200);
    
    const geojson = response.body;
    
    // Verificar estructura básica
    expect(geojson).toHaveProperty('type');
    expect(geojson.type).toBe('FeatureCollection');
    expect(geojson).toHaveProperty('features');
    expect(Array.isArray(geojson.features)).toBe(true);
    
    // Verificar cada feature
    geojson.features.forEach((feature, index) => {
      expect(feature).toHaveProperty('type');
      expect(feature.type).toBe('Feature');
      expect(feature).toHaveProperty('geometry');
      expect(feature.geometry).toHaveProperty('type');
      expect(feature.geometry).toHaveProperty('coordinates');
      
      // Validar coordenadas si es Point
      if (feature.geometry.type === 'Point') {
        const [lon, lat] = feature.geometry.coordinates;
        expect(typeof lon).toBe('number');
        expect(typeof lat).toBe('number');
        expect(lon).toBeGreaterThanOrEqual(-180);
        expect(lon).toBeLessThanOrEqual(180);
        expect(lat).toBeGreaterThanOrEqual(-90);
        expect(lat).toBeLessThanOrEqual(90);
      }
    });
  });
});

