module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    testMatch: ['**/__tests__/**/*.test.ts?(x)'],
    testPathIgnorePatterns: ['<rootDir>/__tests__/e2e.test.ts'],
  };
  
  