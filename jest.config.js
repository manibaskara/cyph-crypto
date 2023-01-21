module.exports = {
  preset: 'react-native',
  setupFiles: ['<rootDir>/jest-setup.js'],
  transformIgnorePatterns: [
    'node_modules/(?!(@?react-native|react-native.*|@?react-navigation.*|@?react-navigation-stack|@?react-native-community/*)/)',
  ],
  collectCoverage: true,
  coveragePathIgnorePatterns: ['src/shared/testing/testing.tsx'],
};
