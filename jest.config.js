module.exports = {
  setupFiles: [
    './tests/jest.setup.js',
  ],
  roots: [
    './tests/',
  ],
  testEnvironment: 'node',
  collectCoverage: true,
  transform: {
    '^.+\\.js$': 'babel-jest',
  },
  reporters: [
    'default',
    'jest-junit',
  ],
};
