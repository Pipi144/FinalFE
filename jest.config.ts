import nextJest from "next/jest";
import type { Config } from "jest";
const createJestConfig = nextJest({
  dir: "./", // ✅ Correctly points to Next.js root
});

const customJestConfig: Config = {
  preset: "ts-jest", // ✅ Ensures Jest understands TypeScript
  testEnvironment: "jest-environment-jsdom", // ✅ Supports DOM testing

  transform: {
    "^.+\\.(ts|tsx|js|jsx)$": ["ts-jest", { tsconfig: "tsconfig.jest.json" }], // ✅ Ensures TypeScript transformation
    "^.+\\.(js|jsx)$": "babel-jest", // ✅ Uses Babel for JavaScript files
  },

  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1", // ✅ Supports absolute imports
  },

  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"], // ✅ Ensures test setup runs

  transformIgnorePatterns: [
    "/node_modules/(?!@testing-library|@tanstack/react-query)", // ✅ Allows Jest to transform necessary dependencies
  ],

  collectCoverage: true,
  coverageDirectory: "coverage",

  resetMocks: true, // ✅ Resets mocks automatically
  clearMocks: true, // ✅ Clears mocks between tests

  verbose: true, // ✅ Shows detailed test output
};

export default createJestConfig(customJestConfig);
