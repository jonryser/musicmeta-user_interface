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
        '^~/(.*)': '<rootDir>/src/$1',
        '^next/head$': '<rootDir>/src/__mocks__/nextHead.tsx',
        '\\.module\\.css$': '<rootDir>/src/__mocks__/styleMock.js',
    },
    modulePaths: [],
    preset: 'ts-jest',
    roots: ['<rootDir>'],
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js', 'jest-expect-message'],
    testEnvironment: 'jest-environment-jsdom',
    testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/build/', '<rootDir>/docs/', '<rootDir>/node_modules/'],
    testMatch: [
        '<rootDir>/src/**/__tests__/**/*.(j|t)s?(x)',
        '<rootDir>/src/**/test.(j|t)s?(x)',
        '<rootDir>/src/**/*.test.(j|t)s?(x)',
    ],
    transform: {
        '^.+\\.tsx?$': ['ts-jest', {
            tsconfig: '<rootDir>/tsconfig.jest.json',
            diagnostics: false,
        }],
    },
    transformIgnorePatterns: ['[/\\\\]node_modules[/\\\\].+\\.(js|jsx|ts|tsx)$'],
};
