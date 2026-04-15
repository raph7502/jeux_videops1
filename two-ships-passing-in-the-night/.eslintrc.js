/** @type {import('eslint').Linter.Config} */
module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    jest: true,
  },
  extends: ['google'],
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
  },
  ignorePatterns: ['node_modules/', 'dist/', 'src/shaders/**/*.glsl.js'],
  rules: {
    // Le code source du projet utilise beaucoup de snake_case et `var`.
    // On conserve Google Style Guide comme base, mais on assouplit ces règles
    // pour éviter une CI bloquante sans refactor massif.
    'camelcase': 'off',
    'no-var': 'off',
    'max-len': 'off',
    'no-unused-vars': ['warn', {argsIgnorePattern: '^_'}],
  },
};
