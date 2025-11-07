// Configuración de Jest para Testing
// ISO/IEC 29119:2013: Software Testing
// ISO/IEC 12207:2017: Sec 6.4.6.4.3 - Unit Testing

module.exports = {
  // Entorno de pruebas
  testEnvironment: 'node',
  
  // Cobertura de código
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov', 'html'],
  
  // ISO 5055:2021 - Objetivo de cobertura > 60%
  coverageThreshold: {
    global: {
      branches: 60,
      functions: 60,
      lines: 60,
      statements: 60
    }
  },
  
  // Archivos a incluir en cobertura
  collectCoverageFrom: [
    'src/**/*.js',
    '!src/**/*.test.js',
    '!src/**/*.spec.js',
    '!**/node_modules/**'
  ],
  
  // Patrón de archivos de test
  testMatch: [
    '**/tests/**/*.test.js',
    '**/tests/**/*.spec.js'
  ],
  
  // Timeout para pruebas asíncronas
  testTimeout: 10000,
  
  // Verbose output
  verbose: true
};