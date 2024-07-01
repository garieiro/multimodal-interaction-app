import babelParser from '@babel/eslint-parser'
import reactPlugin from 'eslint-plugin-react'
import reactHooksPlugin from 'eslint-plugin-react-hooks'

export default [
  {
    ignores: ['dist/**', 'node_modules/**', 'bin/**', 'build/**'],
    plugins: {
      react: reactPlugin,
      'react-hooks': reactHooksPlugin,
    },
    files: ['**/*.js', '**/*.jsx'],
    languageOptions: {
      parser: babelParser,
    },
    rules: {
      'prefer-const': 'error',
      'react/jsx-uses-react': 'off',
      'react/jsx-uses-vars': 'error',
      'react/no-unescaped-entities': 'error',
      'react/prop-types': 'off',
      'react-hooks/rules-of-hooks': 'error',
    },
  },
]
