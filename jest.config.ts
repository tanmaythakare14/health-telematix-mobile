import type { Config } from 'jest';

const config: Config = {
  preset: 'react-native',
  setupFilesAfterEnv: ['<rootDir>/__tests__/__configs__/setup.ts'],
  testPathIgnorePatterns: ['<rootDir>/__tests__/__configs__'],
  transformIgnorePatterns: ['node_modules/(?!my-library-dir)/'],
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.{js,jsx,ts,tsx}', '!src/**/*.test.{js,jsx,ts,tsx}', '!src/**/index.{js,jsx,ts,tsx}'],
  coverageReporters: ['text', 'lcov', 'html', 'json-summary'],
  coverageDirectory: 'coverage',
  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/src/$1',
  },
};

export default config;
