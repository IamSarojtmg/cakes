module.exports = {
  preset:'ts-jest',
  testEnvironment: "node",
setupFiles:['<rootDir>/.env', 'dotenv/config'], //points towads the dotenv inside the server folder
 setupFilesAfterEnv: [
    '<rootDir>/src/test/setup.ts', // Make sure this path is correct
  ],

  // Use moduleNameMapper to resolve module paths, especially for absolute imports like `src/...`.
  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/src/$1', // Maps 'src/...' imports to your actual src folder
  },

  // Configuration for ts-jest specifically.
  globals: {
    'ts-jest': {
      // Point ts-jest to your backend's tsconfig.json file.
      // This ensures ts-jest compiles your tests and source code correctly during testing.
      tsconfig: '<rootDir>/tsconfig.json',
    },
  },


  testMatch:["**/**/*.test.ts"],
  verbose:true, //each invidual to be reporte dring run

  
};