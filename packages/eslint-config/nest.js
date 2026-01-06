import globals from 'globals';
import eslint from '@eslint/js';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import tseslint from 'typescript-eslint';

/** @type {import('eslint').Linter.Config[]} */
export const config = [
  // ignore files
  {
    ignores: ['dist/**', 'build/**', 'node_modules/**'],
  },

  // React settings
  eslint.configs.recommended,
  ...tseslint.configs.recommended,

  // NestJS settings
  {
    languageOptions: {
      globals: {
        process: true,
        __dirname: true,
        module: true,
        require: true,
        ...globals.node,
        ...globals.jest,
      },
      parserOptions: {
        project: ['./tsconfig.json'],
        tsconfigRootDir: import.meta.dir,
        ecmaVersion: 2022,
        sourceType: 'commonjs',
      },
    },
    rules: {
      'no-console': 'off',
      '@typescript-eslint/no-var-requires': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-floating-promises': 'warn',
      '@typescript-eslint/no-unsafe-argument': 'warn',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
    },
  },

  // remove prettier conflicts
  eslintPluginPrettierRecommended,
];
