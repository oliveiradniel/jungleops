import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import reactPlugin from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';

export default tseslint.config([
  // ignore files
  {
    ignores: ['dist/**', 'build/**', 'node_modules/**'],
  },

  // base settings (JS + TS)
  eslint.configs.recommended,
  ...tseslint.configs.recommended,

  // React settings
  {
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
