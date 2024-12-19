module.exports = {
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: {
    '^@components/(.*)$': '<rootDir>/components/$1',
    '^@services/(.*)$': '<rootDir>/services/$1',
    '^@types$': '<rootDir>/types/index.ts'
  },
  transform: {
    '^.+\\.(ts|tsx)$': 'babel-jest',
  },
};