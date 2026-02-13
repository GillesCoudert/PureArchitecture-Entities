import globals from 'globals';
import tseslint from 'typescript-eslint';
import eslint from '@eslint/js';

/**
 * PureArchitecture ESLint Configuration
 *
 * This configuration enforces code quality standards for Pure Architecture projects:
 * - Strict TypeScript typing
 * - Consistent code style
 * - JSDoc documentation requirements
 * - Clean code practices
 */
export default [
    eslint.configs.recommended,
    ...tseslint.configs.recommendedTypeChecked,
    {
        files: ['**/*.{js,mjs,cjs,ts,mts,cts}'],
        ignores: ['lib/**', 'node_modules/**', '*.config.ts', '*.config.mts'],
        plugins: {
            '@typescript-eslint': tseslint.plugin,
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
            // TypeScript specific rules
            '@typescript-eslint/no-unused-vars': [
                'error',
                {
                    argsIgnorePattern: '^_',
                    varsIgnorePattern: '^_',
                    caughtErrorsIgnorePattern: '^_',
                },
            ],
            '@typescript-eslint/explicit-function-return-type': [
                'warn',
                {
                    allowExpressions: true,
                    allowTypedFunctionExpressions: true,
                    allowHigherOrderFunctions: true,
                },
            ],
            '@typescript-eslint/no-explicit-any': 'error',
            '@typescript-eslint/no-non-null-assertion': 'warn',
            '@typescript-eslint/prefer-nullish-coalescing': 'warn',
            '@typescript-eslint/prefer-optional-chain': 'warn',
            '@typescript-eslint/consistent-type-imports': [
                'error',
                { prefer: 'type-imports', fixStyle: 'inline-type-imports' },
            ],
            '@typescript-eslint/naming-convention': [
                'error',
                {
                    selector: 'interface',
                    format: ['PascalCase'],
                    custom: {
                        regex: '^I[A-Z]',
                        match: false,
                    },
                },
                {
                    selector: 'typeAlias',
                    format: ['PascalCase'],
                },
                {
                    selector: 'class',
                    format: ['PascalCase'],
                },
            ],

            // Code quality rules
            'no-console': ['warn', { allow: ['warn', 'error'] }],
            'prefer-const': 'error',
            'no-var': 'error',
            eqeqeq: ['error', 'always'],
            curly: ['error', 'all'],
            'no-throw-literal': 'error',
            'no-return-await': 'error',

            // Best practices for Pure Architecture
            'max-lines': [
                'warn',
                { max: 300, skipBlankLines: true, skipComments: true },
            ],
            'max-depth': ['warn', 4],
            complexity: ['warn', 10],
            'max-params': ['warn', 4],
        },
    },
];
