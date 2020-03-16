module.exports = {
    collectCoverageFrom: [
        'src/**/*.{js,jsx,ts,tsx}',
        '!src/graphql/*',
        '!src/**/*.d.ts',
        '!src/**/index.ts',
        '!src/**/{queries,stories,styled}.{ts,tsx}',
    ],
    moduleFileExtensions: [
        'web.js',
        'js',
        'web.ts',
        'ts',
        'web.tsx',
        'tsx',
        'json',
        'web.jsx',
        'jsx',
        'node',
    ],
    moduleNameMapper: {
        '^~/(.*)': '<rootDir>/src/$1',
    },
    modulePaths: [],
    setupFilesAfterEnv: ['jest-expect-message'],
    testEnvironment: 'jest-environment-jsdom-fourteen',
    testMatch: [
        '<rootDir>/src/**/__tests__/**/*.(j|t)s?(x)',
        '<rootDir>/src/**/test.(j|t)s?(x)',
    ],
    testURL: 'http://localhost',
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
        '^.+\\.svg$': 'jest-svg-transformer',
    },
    transformIgnorePatterns: ['[/\\\\]node_modules[/\\\\].+\\.(js|jsx|ts|tsx)$'],
}
