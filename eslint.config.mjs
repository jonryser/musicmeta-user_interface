import coreWebVitals from 'eslint-config-next/core-web-vitals';
import nextTypescript from 'eslint-config-next/typescript';

export default [
    {
        ignores: [
            'dist/**',
            '.next/**',
            'node_modules/**',
            'build/**',
            'coverage/**',
            'templates/**',
            '*.config.js',
            '*.config.mjs',
            '*.setup.js',
        ],
    },
    ...coreWebVitals,
    ...nextTypescript,
    {
        rules: {
            '@typescript-eslint/no-explicit-any': 'off',
        },
    },
];
