module.exports = {
    collectCoverageFrom: [
        'src/**/*.{js,jsx,ts,tsx}',
        '!src/graphql/*',
        '!src/**/*.d.ts',
        '!src/**/index.ts',
        '!src/**/{queries,stories,styled}.{ts,tsx}',
    ],
    moduleFileExtensions: [
        'js',
        'ts',
        'tsx',
        'json',
    ],
    moduleNameMapper: {
        "^react-native$": "react-native-web",
        '^~/(.*)': '<rootDir>/src/$1',
    },
    modulePaths: [],
    preset: "ts-jest",
    roots: ['<rootDir>'],
    setupFiles: ["<rootDir>/jest.setup.js"],
    setupFilesAfterEnv: ['jest-expect-message'],
    snapshotSerializers: ["enzyme-to-json/serializer"],
    testEnvironment: 'jest-environment-jsdom-fourteen',
    testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/build/', '<rootDir>/docs/', '<rootDir>/node_modules/'],
    testMatch: [
        '<rootDir>/src/**/__tests__/**/*.(j|t)s?(x)',
        '<rootDir>/src/**/test.(j|t)s?(x)',
        '<rootDir>/src/**/*.test.(j|t)s?(x)',
    ],
    testURL: 'http://localhost',
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
        '^.+\\.svg$': 'jest-svg-transformer',
    },
    transformIgnorePatterns: ['[/\\\\]node_modules[/\\\\].+\\.(js|jsx|ts|tsx)$'],

    // https://github.com/zeit/next.js/issues/8663#issue-490553899
    globals: {
        // we must specify a custom tsconfig for tests because we need the typescript transform
        // to transform jsx into js rather than leaving it jsx such as the next build requires. you
        // can see this setting in tsconfig.jest.json -> "jsx": "react"
        "ts-jest": {
            tsConfig: '<rootDir>/tsconfig.jest.json',
            diagnostics: false
        },
        window: {}
    }
}
