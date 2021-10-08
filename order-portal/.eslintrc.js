module.exports = {
  'env': {
    'browser': true,
    'es2021': true,
  },
  'extends': [
    'airbnb-typescript',
    'plugin:react/recommended',
    'react-app',
    'react-app/jest',
  ],
  parser: '@typescript-eslint/parser',
  'parserOptions': {
    'ecmaFeatures': {
      'jsx': true,
    },
    'ecmaVersion': 12,
    'sourceType': 'module',
    'project': './tsconfig.eslint.json',
  },
  'plugins': [
  ],
  'rules': {
    'react/require-default-props': 'off',
  },
};
