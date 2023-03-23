module.exports = {
  preset: 'ts-jest',
    testPathIgnorePatterns: ["<rootDir>/node_modules/"],
    transform: {
      "^.+\\.(js|jsx|ts|tsx)$": "ts-jest",
    },
    moduleNameMapper: {
      "^@/(.*)$": "<rootDir>/src/$1",
    },
    testEnvironment: "jest-environment-jsdom","setupFilesAfterEnv": [
      "./src/setupTest.ts"
    ]
  }