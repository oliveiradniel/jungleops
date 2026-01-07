import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import reactPlugin from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import path from 'node:path';

export default tseslint.config([
  // ignore files
  {
    ignores: [
      'dist/**',
      'build/**',
      'node_modules/**',
      'eslint.config.js',
      'vite.config.ts',
    ],
  },

  // base settings (JS + TS)
  eslint.configs.recommended,
  ...tseslint.configs.recommended,

  // React settings
  {
    languageOptions: {
      parserOptions: {
        project: path.resolve('./tsconfig.app.json'),
        tsconfigRootDir: path.resolve('./'),
      },
    },
    files: ['**/*.{ts,tsx}'],
    plugins: {
      react: reactPlugin,
      'react-hooks': reactHooks,
    },
    settings: {
      react: { version: 'detect' },
    },
    rules: {
      'react/react-in-jsx-scope': 'off',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
    },
  },

  // remove prettier conflicts
  eslintPluginPrettierRecommended,
]);
