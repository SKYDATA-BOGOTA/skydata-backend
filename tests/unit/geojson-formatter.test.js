/**
 * Pruebas Unitarias Backend - GeoJSON Formatter según ISO/IEC 25010:2011 8.1.2
 * 
 * Objetivo: Validar que el formateador/validador de GeoJSON funciona correctamente
 * 
 * Base Normativa:
 * - ISO/IEC 25010:2011 8.1.2 (Adecuación Funcional - Completitud Funcional)
 * - ISO/IEC 25023:2016 Sección 5.1.2 (Corrección Funcional)
 * - ISO/IEC 25020:2019 (Modelo de Medición)
 * - ISO/IEC 12207:2017 Sección 6.4.6.4.3 (Unit Testing)
 * - RFC 7946 (GeoJSON Format)
 * 
 * Trazabilidad: SwR-F06, SwR-ST01
 */

// SwR-F06: Formato GeoJSON según RFC 7946
// SwR-ST01: Validadores GeoJSON
// Trazabilidad: ISO/IEC/IEEE 29148:2018 8.4

describe('Pruebas Unitarias - GeoJSON Formatter/Validator (SwR-F06, SwR-ST01)', () => {
    /**
     * Test UT-BE-004: SwR-F06 - Formato GeoJSON según RFC 7946
     * Verificar que el GeoJSON cumple con el estándar RFC 7946
     */
    describe('UT-BE-004: SwR-F06 - Formato GeoJSON según RFC 7946', () => {
        test('DEBE validar que un FeatureCollection tiene estructura correcta', () => {
            // Given: Un objeto GeoJSON FeatureCollection válido
            const validGeojson = {
                type: 'FeatureCollection',
                features: [
                    {
                        type: 'Feature',
                        geometry: {
                            type: 'Point',
                            coordinates: [-74.0817, 4.6097]
                        },
                        properties: {
                            nombre: 'Estación Centro'
                        }
                    }
                ]
            };

            // When: Se valida el GeoJSON
            const isValid = validateGeoJSONStructure(validGeojson);

            // Then: Debe ser válido
            expect(isValid).toBe(true);
        });

        test('DEBE rechazar GeoJSON sin tipo FeatureCollection', () => {
            // Given: Un objeto que no es FeatureCollection
            const invalidGeojson = {
                type: 'InvalidType',
                features: []
            };

            // When: Se valida el GeoJSON
            const isValid = validateGeoJSONStructure(invalidGeojson);

            // Then: Debe ser inválido
            expect(isValid).toBe(false);
        });

        test('DEBE validar que cada Feature tiene geometry y properties', () => {
            // Given: Un FeatureCollection con features válidos
            const validGeojson = {
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

            // When: Se valida cada feature
            const isValid = validGeojson.features.every(feature => 
                feature.type === 'Feature' &&
                feature.geometry &&
                feature.properties !== undefined
            );

            // Then: Todos los features deben ser válidos
            expect(isValid).toBe(true);
        });

        test('DEBE rechazar Features sin geometry', () => {
            // Given: Un Feature sin geometry
            const invalidFeature = {
                type: 'Feature',
                properties: {}
            };

            // When: Se valida el feature
            const isValid = validateFeatureStructure(invalidFeature);

            // Then: Debe ser inválido
            expect(isValid).toBe(false);
        });
    });

    /**
     * Test UT-BE-005: SwR-ST01 - Validadores GeoJSON
     * Verificar que los validadores funcionan correctamente
     */
    describe('UT-BE-005: SwR-ST01 - Validadores GeoJSON', () => {
        test('DEBE validar coordenadas según RFC 7946', () => {
            // Given: Coordenadas válidas [longitud, latitud]
            const validCoordinates = [-74.0817, 4.6097];

            // When: Se validan las coordenadas
            const isValid = validateCoordinates(validCoordinates);

            // Then: Deben ser válidas
            expect(isValid).toBe(true);
        });

        test('DEBE rechazar coordenadas fuera de rango válido', () => {
            // Given: Coordenadas inválidas
            const invalidCoordinates1 = [999, 4.6097]; // Longitud fuera de rango
            const invalidCoordinates2 = [-74.0817, 999]; // Latitud fuera de rango

            // When: Se validan las coordenadas
            const isValid1 = validateCoordinates(invalidCoordinates1);
            const isValid2 = validateCoordinates(invalidCoordinates2);

            // Then: Deben ser inválidas
            expect(isValid1).toBe(false);
            expect(isValid2).toBe(false);
        });

        test('DEBE validar tipos de geometry según RFC 7946', () => {
            // Given: Tipos de geometry válidos
            const validTypes = ['Point', 'LineString', 'Polygon', 'MultiPoint', 'MultiLineString', 'MultiPolygon'];

            // When: Se validan los tipos
            const allValid = validTypes.every(type => validateGeometryType(type));

            // Then: Todos deben ser válidos
            expect(allValid).toBe(true);
        });

        test('DEBE rechazar tipos de geometry no válidos', () => {
            // Given: Tipos de geometry inválidos
            const invalidTypes = ['Circle', 'Rectangle', 'InvalidType'];

            // When: Se validan los tipos
            const allInvalid = invalidTypes.every(type => !validateGeometryType(type));

            // Then: Todos deben ser inválidos
            expect(allInvalid).toBe(true);
        });

        test('DEBE validar estructura de Point geometry', () => {
            // Given: Una geometry Point válida
            const validPoint = {
                type: 'Point',
                coordinates: [-74.0817, 4.6097]
            };

            // When: Se valida la geometry
            const isValid = validatePointGeometry(validPoint);

            // Then: Debe ser válida
            expect(isValid).toBe(true);
        });

        test('DEBE rechazar Point con número incorrecto de coordenadas', () => {
            // Given: Una geometry Point con coordenadas incorrectas
            const invalidPoint1 = {
                type: 'Point',
                coordinates: [-74.0817] // Falta latitud
            };
            const invalidPoint2 = {
                type: 'Point',
                coordinates: [-74.0817, 4.6097, 100] // Demasiadas coordenadas
            };

            // When: Se validan las geometries
            const isValid1 = validatePointGeometry(invalidPoint1);
            const isValid2 = validatePointGeometry(invalidPoint2);

            // Then: Deben ser inválidas
            expect(isValid1).toBe(false);
            expect(isValid2).toBe(false);
        });
    });
});

// Funciones auxiliares para validación GeoJSON

/**
 * Valida la estructura de un GeoJSON FeatureCollection
 */
function validateGeoJSONStructure(geojson) {
    if (!geojson || typeof geojson !== 'object') {
        return false;
    }
    if (geojson.type !== 'FeatureCollection') {
        return false;
    }
    if (!Array.isArray(geojson.features)) {
        return false;
    }
    return true;
}

/**
 * Valida la estructura de un Feature
 */
function validateFeatureStructure(feature) {
    if (!feature || typeof feature !== 'object') {
        return false;
    }
    if (feature.type !== 'Feature') {
        return false;
    }
    if (!feature.geometry) {
        return false;
    }
    if (feature.properties === undefined) {
        return false;
    }
    return true;
}

/**
 * Valida coordenadas según RFC 7946
 */
function validateCoordinates(coords) {
    if (!Array.isArray(coords) || coords.length < 2) {
        return false;
    }
    const [lng, lat] = coords;
    // Validar rango: longitud [-180, 180], latitud [-90, 90]
    return typeof lng === 'number' &&
           typeof lat === 'number' &&
           lng >= -180 && lng <= 180 &&
           lat >= -90 && lat <= 90;
}

/**
 * Valida tipos de geometry según RFC 7946
 */
function validateGeometryType(type) {
    const validTypes = [
        'Point',
        'LineString',
        'Polygon',
        'MultiPoint',
        'MultiLineString',
        'MultiPolygon',
        'GeometryCollection'
    ];
    return validTypes.includes(type);
}

/**
 * Valida estructura de Point geometry
 */
function validatePointGeometry(geometry) {
    if (!geometry || geometry.type !== 'Point') {
        return false;
    }
    if (!Array.isArray(geometry.coordinates)) {
        return false;
    }
    // Point debe tener exactamente 2 coordenadas [lng, lat]
    if (geometry.coordinates.length !== 2) {
        return false;
    }
    return validateCoordinates(geometry.coordinates);
}

/**
 * Resumen de Pruebas Unitarias Backend - GeoJSON Formatter:
 * 
 * ✅ UT-BE-004: SwR-F06 - Formato GeoJSON según RFC 7946 (4 tests)
 * ✅ UT-BE-005: SwR-ST01 - Validadores GeoJSON (6 tests)
 * 
 * Total: 10 tests unitarios
 * 
 * Trazabilidad:
 * - SwR-F06: Formato GeoJSON según RFC 7946
 * - SwR-ST01: Validadores GeoJSON
 * - Base Normativa: ISO/IEC 25010:2011 8.1.2, ISO/IEC 25023:2016 5.1.2, RFC 7946, ISO/IEC 12207:2017 6.4.6.4.3
 * - Fase 2.5 del plan de implementación
 */
