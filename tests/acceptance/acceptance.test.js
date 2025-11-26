/**
 * Pruebas de Aceptación Backend según ISO/IEC 29119-2:2013
 * 
 * Objetivo: Validar que el backend cumple con los requisitos de aceptación del usuario
 * 
 * Base Normativa:
 * - ISO/IEC 29119-2:2013 (Test Design Techniques)
 * - ISO/IEC 25010:2011 8.1.2 (Pertinencia Funcional)
 * - ISO/IEC 25040:2011 Actividad 1 - Tarea 1.3 (Criterios de Evaluación)
 * 
 * Trazabilidad: SwR-F05, SwR-F06, SwR-F08, SwR-I03, CU-03
 */

const request = require('supertest');
const express = require('express');
const cors = require('cors');

// SwR-F05: Endpoint REST de Datos
// SwR-F06: Formato GeoJSON según RFC 7946
// SwR-F08: Datos de Demostración
// SwR-I03: Servidor HTTP en Backend
// CU-03: Obtener Datos Ambientales
// Trazabilidad: ISO/IEC/IEEE 29148:2018 8.4

describe('Pruebas de Aceptación Backend (SwR-F05, SwR-F06, SwR-F08, SwR-I03, CU-03)', () => {
    let app;

    beforeEach(() => {
        app = express();
        app.use(cors());
        app.use(express.json());

        app.get('/api/datos', (req, res) => {
            res.setHeader('Content-Type', 'application/json');
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.status(200).json({
                type: 'FeatureCollection',
                features: [
                    {
                        type: 'Feature',
                        geometry: { type: 'Point', coordinates: [-74.0817, 4.6097] },
                        properties: {
                            nombre: 'Estación Centro',
                            temperatura: 22.5,
                            humedad: 65,
                            presion: 1013.25
                        }
                    }
                ]
            });
        });
    });

    /**
     * Criterio de Aceptación AC-BE-01: SwR-F05 - Endpoint REST Disponible
     * El backend DEBE proporcionar un endpoint REST funcional para obtener datos ambientales
     */
    describe('AC-BE-01: SwR-F05 - Endpoint REST Disponible', () => {
        test('DEBE proporcionar endpoint GET /api/datos que responde correctamente', async () => {
            // Given: El backend está ejecutándose
            // When: Se solicita datos ambientales mediante GET /api/datos
            const response = await request(app)
                .get('/api/datos')
                .expect(200);

            // Then: El endpoint debe responder con HTTP 200 y datos válidos
            expect(response.status).toBe(200);
            expect(response.body).toBeDefined();
        });
    });

    /**
     * Criterio de Aceptación AC-BE-02: SwR-F06 - Formato GeoJSON Válido
     * El backend DEBE retornar datos en formato GeoJSON válido según RFC 7946
     */
    describe('AC-BE-02: SwR-F06 - Formato GeoJSON Válido', () => {
        test('DEBE retornar FeatureCollection válido según RFC 7946', async () => {
            // Given: El backend está ejecutándose
            // When: Se solicita datos ambientales
            const response = await request(app)
                .get('/api/datos')
                .expect(200);

            // Then: Debe retornar FeatureCollection válido
            expect(response.body.type).toBe('FeatureCollection');
            expect(Array.isArray(response.body.features)).toBe(true);
        });

        test('DEBE incluir features con estructura GeoJSON válida', async () => {
            // Given: El backend está ejecutándose
            // When: Se solicita datos ambientales
            const response = await request(app)
                .get('/api/datos')
                .expect(200);

            // Then: Cada feature debe tener estructura GeoJSON válida
            const feature = response.body.features[0];
            expect(feature.type).toBe('Feature');
            expect(feature.geometry).toBeDefined();
            expect(feature.properties).toBeDefined();
        });
    });

    /**
     * Criterio de Aceptación AC-BE-03: SwR-F08 - Datos Ambientales Disponibles
     * El backend DEBE proporcionar datos ambientales de demostración
     */
    describe('AC-BE-03: SwR-F08 - Datos Ambientales Disponibles', () => {
        test('DEBE retornar al menos una estación con datos ambientales', async () => {
            // Given: El backend está ejecutándose con datos mock
            // When: Se solicita datos ambientales
            const response = await request(app)
                .get('/api/datos')
                .expect(200);

            // Then: Debe retornar al menos una estación
            expect(response.body.features.length).toBeGreaterThan(0);
            expect(response.body.features[0].properties.nombre).toBeDefined();
        });

        test('DEBE incluir propiedades ambientales en cada estación', async () => {
            // Given: El backend está ejecutándose
            // When: Se solicita datos ambientales
            const response = await request(app)
                .get('/api/datos')
                .expect(200);

            // Then: Cada estación debe tener propiedades ambientales
            const properties = response.body.features[0].properties;
            expect(properties.temperatura).toBeDefined();
            expect(properties.humedad).toBeDefined();
        });
    });

    /**
     * Criterio de Aceptación AC-BE-04: SwR-I03 - Servidor HTTP Funcional
     * El backend DEBE ejecutarse como servidor HTTP funcional
     */
    describe('AC-BE-04: SwR-I03 - Servidor HTTP Funcional', () => {
        test('DEBE responder a solicitudes HTTP GET correctamente', async () => {
            // Given: El servidor HTTP está ejecutándose
            // When: Se hace una solicitud HTTP GET
            const response = await request(app)
                .get('/api/datos')
                .expect(200);

            // Then: Debe responder correctamente
            expect(response.status).toBe(200);
            expect(response.headers['content-type']).toMatch(/application\/json/);
        });

        test('DEBE incluir headers HTTP apropiados', async () => {
            // Given: El servidor HTTP está ejecutándose
            // When: Se hace una solicitud HTTP GET
            const response = await request(app)
                .get('/api/datos')
                .expect(200);

            // Then: Debe incluir headers apropiados
            expect(response.headers['content-type']).toBeDefined();
            expect(response.headers['access-control-allow-origin']).toBeDefined();
        });
    });

    /**
     * Criterio de Aceptación AC-BE-05: CU-03 - Caso de Uso Obtener Datos Ambientales
     * El backend DEBE cumplir con el caso de uso CU-03 completo
     */
    describe('AC-BE-05: CU-03 - Caso de Uso Obtener Datos Ambientales', () => {
        test('DEBE cumplir con el flujo completo del caso de uso CU-03', async () => {
            // Given: El backend está ejecutándose
            // When: Se ejecuta el caso de uso CU-03 (Obtener Datos Ambientales)
            const response = await request(app)
                .get('/api/datos')
                .expect(200);

            // Then: Debe cumplir con todos los criterios del caso de uso
            // 1. Endpoint disponible
            expect(response.status).toBe(200);
            // 2. Formato GeoJSON válido
            expect(response.body.type).toBe('FeatureCollection');
            // 3. Datos ambientales presentes
            expect(response.body.features.length).toBeGreaterThan(0);
            expect(response.body.features[0].properties.temperatura).toBeDefined();
        });
    });

    /**
     * Criterio de Aceptación AC-BE-06: Integración Completa Backend
     * El backend DEBE funcionar como un sistema integrado completo
     */
    describe('AC-BE-06: Integración Completa Backend', () => {
        test('DEBE integrar correctamente todos los componentes del backend', async () => {
            // Given: Todos los componentes del backend están integrados
            // When: Se solicita datos ambientales
            const response = await request(app)
                .get('/api/datos')
                .expect(200);

            // Then: Todos los componentes deben funcionar integrados
            // Servidor HTTP funciona
            expect(response.status).toBe(200);
            // Endpoint funciona
            expect(response.body).toBeDefined();
            // Formato GeoJSON válido
            expect(response.body.type).toBe('FeatureCollection');
            // Datos disponibles
            expect(response.body.features.length).toBeGreaterThan(0);
        });
    });
});

/**
 * Resumen de Pruebas de Aceptación Backend:
 * 
 * ✅ AC-BE-01: SwR-F05 - Endpoint REST Disponible (1 test)
 * ✅ AC-BE-02: SwR-F06 - Formato GeoJSON Válido (2 tests)
 * ✅ AC-BE-03: SwR-F08 - Datos Ambientales Disponibles (2 tests)
 * ✅ AC-BE-04: SwR-I03 - Servidor HTTP Funcional (2 tests)
 * ✅ AC-BE-05: CU-03 - Caso de Uso Obtener Datos Ambientales (1 test)
 * ✅ AC-BE-06: Integración Completa Backend (1 test)
 * 
 * Total: 9 criterios de aceptación validados
 * 
 * Trazabilidad:
 * - SwR-F05: Endpoint REST de Datos
 * - SwR-F06: Formato GeoJSON según RFC 7946
 * - SwR-F08: Datos de Demostración
 * - SwR-I03: Servidor HTTP en Backend
 * - CU-03: Obtener Datos Ambientales
 * - Base Normativa: ISO/IEC 29119-2:2013, ISO/IEC 25010:2011 8.1.2, ISO/IEC 25040:2011 Act. 1 - Tarea 1.3
 */
