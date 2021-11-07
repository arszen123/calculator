module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'airbnb-base',
    'airbnb-typescript/base',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
    project: './tsconfig.json',
  },
  plugins: [
    '@typescript-eslint',
  ],
  rules: {
    'import/prefer-default-export': 'off',
    'class-methods-use-this': 'off',
    'no-useless-constructor': 'off',
    'no-restricted-syntax': 'off',
    'no-empty-function': 'off',
    'no-unused-vars': 'off',
    'newline-before-return': 'error',
  },
};
