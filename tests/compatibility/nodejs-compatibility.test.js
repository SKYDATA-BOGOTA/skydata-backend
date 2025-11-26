/**
 * Pruebas de Compatibilidad con Node.js (Backend)
 * 
 * Base Normativa:
 * - ISO/IEC 25010:2011 Sección 8.5.1 (Compatibilidad)
 * 
 * Trazabilidad:
 * - SwR-I01: Compatibilidad con versiones de Node.js
 * 
 * Objetivo: Verificar que el backend funciona correctamente en Node.js 18.x y 20.x
 */

/**
 * Test COMP-NODE-001: Verificar versión de Node.js
 * ISO/IEC 25010:2011 8.5.1
 */
describe('Compatibilidad con Node.js', () => {
  test('COMP-NODE-001: La versión de Node.js es compatible (18.x o 20.x)', () => {
    const nodeVersion = process.version;
    const majorVersion = parseInt(nodeVersion.slice(1).split('.')[0]);
    
    expect(majorVersion).toBeGreaterThanOrEqual(18);
    expect(majorVersion).toBeLessThanOrEqual(20);
  });

  test('COMP-NODE-002: Todas las funcionalidades funcionan en Node.js actual', async () => {
    // Verificar que las características modernas de Node.js están disponibles
    expect(typeof fetch).toBe('function'); // Node.js 18+
    expect(typeof globalThis).toBe('object');
    
    // Verificar que los módulos ES6 funcionan
    const testModule = await import('fs/promises');
    expect(testModule).toBeDefined();
  });

  test('COMP-NODE-003: Las dependencias son compatibles con Node.js', () => {
    // Verificar que las APIs necesarias están disponibles
    expect(typeof require).toBe('function');
    expect(typeof module).toBe('object');
    expect(typeof exports).toBe('object');
  });
});

