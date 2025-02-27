export default  {
    setupFilesAfterEnv: ['<rootDir>/config.test.js'], // Runs setup after test environment setup
    testEnvironment: 'jsdom', // Simulates browser-like environment for React components
  
    transform: {
      '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest', // Ensures proper transformation using Babel
    },
  
    moduleNameMapper: {
      '\\.(css|less|scss|sass)$': 'identity-obj-proxy', // Mocks styles for Jest
      '\\.(gif|ttf|eot|svg|png|jpg|jpeg)$': '<rootDir>/__mocks__/fileMock.js',
      "react-slick": "<rootDir>/__mocks__/react-slick.js", // Handles static file imports
    },
  
    collectCoverage: true, // Enables test coverage collection
    coverageDirectory: 'coverage', // Stores coverage reports in 'coverage/' folder
    coverageReporters: ['html', 'lcov', 'text', 'json-summary'], // Generates various report formats
  
    testMatch: [
      '**/__tests__/**/*.test.{js,jsx,ts,tsx}', // Matches test files inside `__tests__`
      '**/?(*.)+(spec|test).{js,jsx,ts,tsx}', // Matches standalone test files
    ],
  
    setupFiles: ['<rootDir>/jest.setup.js'], // Setup file for additional configurations
    transformIgnorePatterns: ['/node_modules/'], // Avoids transforming node_modules
  };
  
