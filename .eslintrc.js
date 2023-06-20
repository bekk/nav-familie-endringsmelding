/** @type {import('eslint').Linter.Config} */
module.exports = {
  extends: [
    '@remix-run/eslint-config',
    '@remix-run/eslint-config/node',
    'prettier',
  ],
  plugins: ['unused-imports'],
  rules: {
    '@typescript-eslint/consistent-type-imports': 'off',
    'no-unused-vars': 'off',
    'unused-imports/no-unused-imports': 'error',
  },
  ignorePatterns: ['!.*', 'dist', 'node_modules'],
};
