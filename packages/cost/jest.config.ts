import type { Config } from '@jest/types';
// Sync object
const config: Config.InitialOptions = {
    verbose: true,
    transform: {
        "^.+\\.tsx?$": "ts-jest",
    },
    rootDir: "./",
    collectCoverage: true,
    collectCoverageFrom: ["./lib/**"],
    coverageThreshold: {
        "global": {
            branches: 100,
            functions: 100,
            lines: 100,
            statements: 100,
        }
    },
    coveragePathIgnorePatterns: ["./lib/csvEstimate.ts"]

};
export default config;