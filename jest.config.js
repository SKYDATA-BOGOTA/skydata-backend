/**
 * Configuración de Jest para pruebas unitarias del backend
 * Base Normativa: ISO/IEC 25020:2019, ISO/IEC 25040:2011
 */

module.exports = {
  testEnvironment: 'node',
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.js',
    '!src/**/*.test.js'
  ],
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov', 'html'],
  coverageThreshold: {
    global: {
      branches: 40,
      functions: 50,
      lines: 40,
      statements: 40
    }
  },
  testMatch: ['**/tests/**/*.test.js'],
  testTimeout: 10000,
  verbose: true
};
