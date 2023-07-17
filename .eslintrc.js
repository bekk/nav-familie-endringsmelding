/** @type {import('eslint').Linter.Config} */
module.exports = {
  extends: [
    '@remix-run/eslint-config',
    '@remix-run/eslint-config/node',
    'prettier',
    'plugin:css-modules/recommended',
  ],

  plugins: ['unused-imports', 'css-modules', 'simple-import-sort'],
  rules: {
    '@typescript-eslint/consistent-type-imports': 'off',
    'no-unused-vars': 'off',
    'unused-imports/no-unused-imports': 'error',
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
  },
  ignorePatterns: ['!.*', 'dist', 'node_modules'],
};
