import globals from 'globals';
import tseslint from 'typescript-eslint';
import eslint from '@eslint/js';
import architectureConfig from '@gilles-coudert/pure-architecture/eslint-config';
import importPlugin from 'eslint-plugin-import';

/**
 * PureArchitecture ESLint Configuration
 */
export default [
    eslint.configs.recommended,
    ...tseslint.configs.recommendedTypeChecked,
    {
        files: ['**/*.{js,mjs,cjs,ts,mts,cts}'],
        ignores: [
            'lib/**',
            'node_modules/**',
            '*{.,-}config.js',
            '*{.,-}config.ts',
            '*{.,-}config.mts',
        ],
        plugins: {
            '@typescript-eslint': tseslint.plugin,
            import: importPlugin,
        },
        languageOptions: {
            parser: tseslint.parser,
            globals: globals.node,
            parserOptions: {
                projectService: true,
                tsconfigRootDir: import.meta.dirname,
            },
        },
        rules: {
            '@typescript-eslint/no-unused-vars': [
                'error',
                { argsIgnorePattern: '^_' },
            ],
        },
    },
    // Clean Architecture layer restrictions
    ...architectureConfig.overrides,
];
