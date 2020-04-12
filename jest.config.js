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
    },
    modulePaths: [],
    roots: ['<rootDir>'],
    setupFilesAfterEnv: ['<rootDir>/config/setup.js', 'jest-expect-message'],
    testEnvironment: 'jest-environment-jsdom-fourteen',
    testPathIgnorePatterns: ['<rootDir>[/\\\\](build|docs|node_modules|.next)[/\\\\]'],
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
}
