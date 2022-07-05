module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:jest/recommended',
    'plugin:jest/style',
    'plugin:testing-library/react',
  ],
  env: {
    browser: true,
    node: true,
  },
  parserOptions: { sourceType: 'module', ecmaVersion: 'latest' },
  rules: {
    'react/prop-types': 0,
  },
};
