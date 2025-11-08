module.exports = {
  testEnvironment: 'node',
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.js', '!src/**/*.test.js'],
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov', 'html'],
  coverageThreshold: {
    global: { branches: 60, functions: 60, lines: 60, statements: 60 }
  },
  testMatch: ['**/tests/**/*.test.js'],
  testTimeout: 10000,
  verbose: true
};