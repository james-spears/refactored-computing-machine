export default {
  collectCoverageFrom: ['./src/**/*.{js,ts}'],
  extensionsToTreatAsEsm: ['.ts'],
  moduleNameMapper: {
    // '^@/app/database$': '<rootDir>/src/app/__mocks__/database.ts',
    '@/(.*)': ['<rootDir>/src/$1'],
  }
};
