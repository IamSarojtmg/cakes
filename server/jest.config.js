module.exports = {
  preset: "ts-jest", //use jest
  testEnvironment: "node",
  setupFiles: ["dotenv/config"], //points towads the dotenv inside the server folder
  setupFilesAfterEnv: [
    "<rootDir>/src/test/setup.ts", // points towards setup.ts
  ],
  transform: {
    "^.+\\.(ts)$": [
      "ts-jest",
      {
        tsconfig: "<rootDir>/tsconfig.json", // tells jest to understand ts files
      },
    ],
  },

  testMatch: ["<rootDir>/src/test/**/*.test.ts"], //look in server(rootdir)?src>test>any dir>find file ending with .test.ts and run it
  verbose: true, //each invidual to be reporte dring run
};
