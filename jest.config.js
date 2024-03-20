module.exports = {
  testEnvironment: 'node',
  collectCoverageFrom: [
'**/services/**/*.js'
  ],
  coverageThreshold: {
    './src/': {
      branches: 90,
      functions: 90,
      lines: 90,
      statements: 90
    }
  },
  moduleDirectories: ['node_modules', 'src'],
  modulePathIgnorePatterns: [],
  testPathIgnorePatterns: ['<rootDir>/node_modules/']
};
