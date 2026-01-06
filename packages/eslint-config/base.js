import eslint from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import turboPlugin from 'eslint-plugin-turbo';
import tseslint from 'typescript-eslint';

const prettierConfig = require('@challenge/prettier-config');

/** @type {import("eslint").Linter.Config[]} */
export const config = [
  eslint.configs.recommended,
  eslintConfigPrettier,
  eslintPluginPrettierRecommended,
  ...tseslint.configs.recommendedTypeChecked,
  {
    plugins: {
      turbo: turboPlugin,
    },
    rules: {
      'turbo/no-undeclared-env-vars': 'warn',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
      quotes: 'off',
      '@typescript-eslint/quotes': 'off',
      'prettier/prettier': ['error', prettierConfig],
    },
  },
  {
    ignores: ['dist/**', 'build/**', 'node_modules/**'],
  },
];
