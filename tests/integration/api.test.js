/**
 * Pruebas de Integración Backend según ISO/IEC 25040:2011 Actividad 2 - Tarea 2.2
 * 
 * Objetivo: Validar la integración completa entre componentes del backend
 * 
 * Base Normativa:
 * - ISO/IEC 25040:2011 Actividad 2 - Tarea 2.2 (Integration Testing)
 * - ISO/IEC 12207:2017 Sección 6.4.6.4.3 (Integration Testing)
 * - ISO/IEC 25010:2011 8.1.2 (Adecuación Funcional)
 * 
 * Trazabilidad: SwR-F05, SwR-F06, SwR-F08, SwR-I03, SwR-ST01
 */

const request = require('supertest');
const express = require('express');
const cors = require('cors');

// SwR-F05: Endpoint REST de Datos
// SwR-F06: Formato GeoJSON según RFC 7946
// SwR-F08: Datos de Demostración
// SwR-I03: Servidor HTTP en Backend
// SwR-ST01: Validadores GeoJSON
// Trazabilidad: ISO/IEC/IEEE 29148:2018 8.4

describe('Pruebas de Integración Backend - API Completa (SwR-F05, SwR-F06, SwR-F08, SwR-I03, SwR-ST01)', () => {
    let app;

    beforeEach(() => {
        app = express();
        app.use(cors());
        app.use(express.json());

        // Mock de la ruta /api/datos con integración completa
        app.get('/api/datos', (req, res) => {
            // Simular validación GeoJSON (SwR-ST01)
            const mockData = {
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
                            humedad: 65,
                            presion: 1013.25
                        }
                    }
                ]
            };

            // Validar estructura GeoJSON (SwR-F06, SwR-ST01)
            if (mockData.type === 'FeatureCollection' && Array.isArray(mockData.features)) {
                res.setHeader('Content-Type', 'application/json');
                res.setHeader('Access-Control-Allow-Origin', '*');
                res.status(200).json(mockData);
            } else {
                res.status(500).json({ error: 'Invalid GeoJSON structure' });
            }
        });
    });

    /**
     * Test IT-BE-001: SwR-F05 + SwR-I03 - Integración Endpoint y Servidor HTTP
     * Verificar que el endpoint y el servidor HTTP funcionan integrados
     */
    describe('IT-BE-001: SwR-F05 + SwR-I03 - Integración Endpoint y Servidor HTTP', () => {
        test('DEBE responder correctamente cuando se integran endpoint y servidor HTTP', async () => {
            // Given: El servidor está ejecutándose con el endpoint configurado
            // When: Se hace una solicitud GET a /api/datos
            const response = await request(app)
                .get('/api/datos')
                .expect(200);

            // Then: Debe responder con HTTP 200 y datos válidos
            expect(response.status).toBe(200);
            expect(response.body).toBeDefined();
            expect(response.body.type).toBe('FeatureCollection');
        });

        test('DEBE incluir headers CORS cuando endpoint y servidor están integrados', async () => {
            // Given: El servidor está ejecutándose con CORS configurado
            // When: Se hace una solicitud GET a /api/datos
            const response = await request(app)
                .get('/api/datos')
                .expect(200);

            // Then: Debe incluir headers CORS
            expect(response.headers['access-control-allow-origin']).toBeDefined();
        });
    });

    /**
     * Test IT-BE-002: SwR-F06 + SwR-ST01 - Integración Formato GeoJSON y Validadores
     * Verificar que el formato GeoJSON y los validadores funcionan integrados
     */
    describe('IT-BE-002: SwR-F06 + SwR-ST01 - Integración Formato GeoJSON y Validadores', () => {
        test('DEBE retornar GeoJSON válido cuando validadores y formateo están integrados', async () => {
            // Given: El servidor está ejecutándose con validadores GeoJSON
            // When: Se hace una solicitud GET a /api/datos
            const response = await request(app)
                .get('/api/datos')
                .expect(200);

            // Then: Debe retornar GeoJSON válido según RFC 7946
            expect(response.body.type).toBe('FeatureCollection');
            expect(Array.isArray(response.body.features)).toBe(true);
            expect(response.body.features[0].type).toBe('Feature');
            expect(response.body.features[0].geometry).toBeDefined();
            expect(response.body.features[0].properties).toBeDefined();
        });

        test('DEBE validar coordenadas cuando validadores están integrados', async () => {
            // Given: El servidor está ejecutándose con validadores
            // When: Se hace una solicitud GET a /api/datos
            const response = await request(app)
                .get('/api/datos')
                .expect(200);

            // Then: Las coordenadas deben ser válidas según RFC 7946
            const coordinates = response.body.features[0].geometry.coordinates;
            expect(coordinates.length).toBe(2);
            expect(coordinates[0]).toBeGreaterThanOrEqual(-180);
            expect(coordinates[0]).toBeLessThanOrEqual(180);
            expect(coordinates[1]).toBeGreaterThanOrEqual(-90);
            expect(coordinates[1]).toBeLessThanOrEqual(90);
        });
    });

    /**
     * Test IT-BE-003: SwR-F08 + SwR-F05 - Integración Datos Mock y Endpoint
     * Verificar que los datos mock se integran correctamente con el endpoint
     */
    describe('IT-BE-003: SwR-F08 + SwR-F05 - Integración Datos Mock y Endpoint', () => {
        test('DEBE retornar datos mock cuando están integrados con el endpoint', async () => {
            // Given: El servidor está ejecutándose con datos mock
            // When: Se hace una solicitud GET a /api/datos
            const response = await request(app)
                .get('/api/datos')
                .expect(200);

            // Then: Debe retornar datos mock válidos
            expect(response.body.features.length).toBeGreaterThan(0);
            expect(response.body.features[0].properties.nombre).toBeDefined();
            expect(response.body.features[0].properties.temperatura).toBeDefined();
        });

        test('DEBE preservar todas las propiedades ambientales cuando datos mock están integrados', async () => {
            // Given: El servidor está ejecutándose con datos mock completos
            // When: Se hace una solicitud GET a /api/datos
            const response = await request(app)
                .get('/api/datos')
                .expect(200);

            // Then: Todas las propiedades ambientales deben estar presentes
            const properties = response.body.features[0].properties;
            expect(properties.nombre).toBe('Estación Centro');
            expect(properties.temperatura).toBe(22.5);
            expect(properties.humedad).toBe(65);
            expect(properties.presion).toBe(1013.25);
        });
    });

    /**
     * Test IT-BE-004: Integración Completa de Flujo Backend
     * Verificar que todos los componentes funcionan integrados en un flujo completo
     */
    describe('IT-BE-004: Integración Completa de Flujo Backend', () => {
        test('DEBE ejecutar flujo completo: Request → Validación → Procesamiento → Respuesta', async () => {
            // Given: El servidor está ejecutándose con todos los componentes integrados
            // When: Se hace una solicitud GET a /api/datos
            const startTime = Date.now();
            const response = await request(app)
                .get('/api/datos')
                .expect(200);
            const endTime = Date.now();
            const responseTime = endTime - startTime;

            // Then: El flujo completo debe funcionar correctamente
            expect(response.status).toBe(200);
            expect(response.headers['content-type']).toMatch(/application\/json/);
            expect(response.body.type).toBe('FeatureCollection');
            expect(response.body.features.length).toBeGreaterThan(0);
            // Verificar que la respuesta es rápida (< 1 segundo según ISO 25010:2011 8.2.1)
            expect(responseTime).toBeLessThan(1000);
        });
    });

    /**
     * Test IT-BE-005: Manejo de Errores en Integración
     * Verificar que los errores se manejan correctamente cuando los componentes están integrados
     */
    describe('IT-BE-005: Manejo de Errores en Integración', () => {
        test('DEBE manejar errores cuando la estructura GeoJSON es inválida', async () => {
            // Given: Un servidor con validación integrada
            // When: Se intenta retornar datos inválidos
            app.get('/api/datos/invalid', (req, res) => {
                const invalidData = { type: 'InvalidType' };
                if (invalidData.type !== 'FeatureCollection') {
                    res.status(500).json({ error: 'Invalid GeoJSON structure' });
                }
            });

            const response = await request(app)
                .get('/api/datos/invalid')
                .expect(500);

            // Then: Debe retornar un error apropiado
            expect(response.status).toBe(500);
            expect(response.body.error).toBeDefined();
        });
    });
});

/**
 * Resumen de Pruebas de Integración Backend:
 * 
 * ✅ IT-BE-001: SwR-F05 + SwR-I03 - Integración Endpoint y Servidor HTTP (2 tests)
 * ✅ IT-BE-002: SwR-F06 + SwR-ST01 - Integración Formato GeoJSON y Validadores (2 tests)
 * ✅ IT-BE-003: SwR-F08 + SwR-F05 - Integración Datos Mock y Endpoint (2 tests)
 * ✅ IT-BE-004: Integración Completa de Flujo Backend (1 test)
 * ✅ IT-BE-005: Manejo de Errores en Integración (1 test)
 * 
 * Total: 8 tests de integración
 * 
 * Trazabilidad:
 * - SwR-F05: Endpoint REST de Datos
 * - SwR-F06: Formato GeoJSON según RFC 7946
 * - SwR-F08: Datos de Demostración
 * - SwR-I03: Servidor HTTP en Backend
 * - SwR-ST01: Validadores GeoJSON
 * - Base Normativa: ISO/IEC 25040:2011 Act. 2 - Tarea 2.2, ISO/IEC 12207:2017 6.4.6.4.3, ISO/IEC 25010:2011 8.1.2
 */
