export default {
  clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: [
    './src/**/*.ts?(x)',
    '!./src/app/index.tsx',
    '!./src/shared/types/*',
    '!./src/shared/config/openapi/*',
    '!./src/widgets/users-table/model/*',
    '!./src/__data__/*',
  ],
  coverageDirectory: '<rootDir>/reports/coverage',
  coverageProvider: 'v8',
  coverageReporters: [
    [
      'html',
      {
        subdir: 'html',
      },
    ],
  ],
  preset: 'ts-jest',
  testEnvironment: 'jest-environment-jsdom',
  testEnvironmentOptions: {
    customExportConditions: [''],
  },
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  roots: ['<rootDir>'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: {
    '\\.(gif|ttf|eot|svg|png|jpg)$': '<rootDir>/src/shared/test/__mocks__/fileMock.js',
    '^@/(.*)$': '<rootDir>/src/$1',
  },
};
