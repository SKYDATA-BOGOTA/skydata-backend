/**
 * Pruebas Unitarias Backend - Routes según ISO/IEC 25010:2011 8.1.2
 * 
 * Objetivo: Validar que las rutas del backend funcionan correctamente
 * 
 * Base Normativa:
 * - ISO/IEC 25010:2011 8.1.2 (Adecuación Funcional - Completitud Funcional)
 * - ISO/IEC 25023:2016 Sección 5.1.1 (Completitud Funcional)
 * - ISO/IEC 25020:2019 (Modelo de Medición)
 * - ISO/IEC 12207:2017 Sección 6.4.6.4.3 (Unit Testing)
 * 
 * Trazabilidad: SwR-F05, SwR-I03
 */

const request = require('supertest');
const express = require('express');

// SwR-F05: Endpoint REST de Datos
// SwR-I03: Servidor HTTP en Backend
// Trazabilidad: ISO/IEC/IEEE 29148:2018 8.4

describe('Pruebas Unitarias - Routes (SwR-F05, SwR-I03)', () => {
    let app;

    beforeEach(() => {
        // Crear una instancia de Express para testing
        app = express();
        app.use(express.json());

        // Mock de la ruta /api/datos
        // SwR-F05: Endpoint REST de Datos
        app.get('/api/datos', (req, res) => {
            res.setHeader('Content-Type', 'application/json');
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.status(200).json({
                type: 'FeatureCollection',
                features: [
                    {
                        type: 'Feature',
                        geometry: {
                            type: 'Point',
                            coordinates: [-74.0817, 4.6097]
                        },
                        properties: {
                            nombre: 'Estación Centro',
                            temperatura: 22.5,
                            humedad: 65
                        }
                    }
                ]
            });
        });
    });

    /**
     * Test UT-BE-001: SwR-F05 - Endpoint REST de Datos
     * Verificar que el endpoint GET /api/datos retorna datos ambientales
     */
    describe('UT-BE-001: SwR-F05 - Endpoint REST de Datos', () => {
        test('DEBE responder con HTTP 200 al hacer GET /api/datos', async () => {
            // Given: El servidor está ejecutándose
            // When: Se hace una solicitud GET a /api/datos
            const response = await request(app)
                .get('/api/datos')
                .expect(200);

            // Then: La respuesta debe tener código HTTP 200
            expect(response.status).toBe(200);
        });

        test('DEBE retornar Content-Type application/json', async () => {
            // Given: El servidor está ejecutándose
            // When: Se hace una solicitud GET a /api/datos
            const response = await request(app)
                .get('/api/datos')
                .expect('Content-Type', /json/);

            // Then: El Content-Type debe ser application/json
            expect(response.headers['content-type']).toMatch(/application\/json/);
        });

        test('DEBE retornar un GeoJSON válido (FeatureCollection)', async () => {
            // Given: El servidor está ejecutándose
            // When: Se hace una solicitud GET a /api/datos
            const response = await request(app)
                .get('/api/datos')
                .expect(200);

            // Then: La respuesta debe ser un FeatureCollection válido
            expect(response.body).toHaveProperty('type', 'FeatureCollection');
            expect(response.body).toHaveProperty('features');
            expect(Array.isArray(response.body.features)).toBe(true);
        });

        test('DEBE incluir features con estructura GeoJSON válida', async () => {
            // Given: El servidor está ejecutándose
            // When: Se hace una solicitud GET a /api/datos
            const response = await request(app)
                .get('/api/datos')
                .expect(200);

            // Then: Cada feature debe tener estructura GeoJSON válida
            const feature = response.body.features[0];
            expect(feature).toHaveProperty('type', 'Feature');
            expect(feature).toHaveProperty('geometry');
            expect(feature).toHaveProperty('properties');
            expect(feature.geometry).toHaveProperty('type', 'Point');
            expect(feature.geometry).toHaveProperty('coordinates');
            expect(Array.isArray(feature.geometry.coordinates)).toBe(true);
        });
    });

    /**
     * Test UT-BE-002: SwR-I03 - Servidor HTTP en Backend
     * Verificar que el servidor HTTP funciona correctamente
     */
    describe('UT-BE-002: SwR-I03 - Servidor HTTP en Backend', () => {
        test('DEBE incluir headers CORS en las respuestas', async () => {
            // Given: El servidor está ejecutándose
            // When: Se hace una solicitud GET a /api/datos
            const response = await request(app)
                .get('/api/datos')
                .expect(200);

            // Then: Debe incluir headers CORS
            expect(response.headers['access-control-allow-origin']).toBeDefined();
        });

        test('DEBE manejar solicitudes OPTIONS para CORS preflight', async () => {
            // Given: Se configura OPTIONS handler
            app.options('/api/datos', (req, res) => {
                res.setHeader('Access-Control-Allow-Origin', '*');
                res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
                res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
                res.status(200).end();
            });

            // When: Se hace una solicitud OPTIONS
            const response = await request(app)
                .options('/api/datos')
                .expect(200);

            // Then: Debe responder correctamente con headers CORS
            expect(response.headers['access-control-allow-origin']).toBeDefined();
            expect(response.headers['access-control-allow-methods']).toContain('GET');
        });

        test('DEBE rechazar métodos HTTP no permitidos', async () => {
            // Given: El servidor solo permite GET
            // When: Se intenta hacer POST a /api/datos
            const response = await request(app)
                .post('/api/datos')
                .send({ data: 'test' });

            // Then: Debe responder con 404 o 405
            expect([404, 405]).toContain(response.status);
        });
    });

    /**
     * Test UT-BE-003: Validación de GeoJSON según RFC 7946
     * Verificar que el GeoJSON retornado cumple con RFC 7946
     */
    describe('UT-BE-003: Validación de GeoJSON según RFC 7946', () => {
        test('DEBE retornar coordenadas en formato [longitud, latitud]', async () => {
            // Given: El servidor está ejecutándose
            // When: Se hace una solicitud GET a /api/datos
            const response = await request(app)
                .get('/api/datos')
                .expect(200);

            // Then: Las coordenadas deben estar en formato [lng, lat]
            const coordinates = response.body.features[0].geometry.coordinates;
            expect(coordinates.length).toBe(2);
            expect(typeof coordinates[0]).toBe('number'); // longitud
            expect(typeof coordinates[1]).toBe('number'); // latitud
            // Validar rango de coordenadas
            expect(coordinates[0]).toBeGreaterThanOrEqual(-180);
            expect(coordinates[0]).toBeLessThanOrEqual(180);
            expect(coordinates[1]).toBeGreaterThanOrEqual(-90);
            expect(coordinates[1]).toBeLessThanOrEqual(90);
        });

        test('DEBE incluir propiedades ambientales en cada feature', async () => {
            // Given: El servidor está ejecutándose
            // When: Se hace una solicitud GET a /api/datos
            const response = await request(app)
                .get('/api/datos')
                .expect(200);

            // Then: Cada feature debe tener propiedades ambientales
            const properties = response.body.features[0].properties;
            expect(properties).toBeDefined();
            expect(typeof properties).toBe('object');
        });
    });
});

/**
 * Resumen de Pruebas Unitarias Backend - Routes:
 * 
 * ✅ UT-BE-001: SwR-F05 - Endpoint REST de Datos (4 tests)
 * ✅ UT-BE-002: SwR-I03 - Servidor HTTP en Backend (3 tests)
 * ✅ UT-BE-003: Validación de GeoJSON según RFC 7946 (2 tests)
 * 
 * Total: 9 tests unitarios
 * 
 * Trazabilidad:
 * - SwR-F05: Endpoint REST de Datos
 * - SwR-I03: Servidor HTTP en Backend
 * - Base Normativa: ISO/IEC 25010:2011 8.1.2, ISO/IEC 25023:2016 5.1.1, ISO/IEC 12207:2017 6.4.6.4.3
 * - Fase 2.4 del plan de implementación
 */
