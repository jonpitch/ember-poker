module.exports = {
  globals: {
    server: true,
  },
  root: true,
  parserOptions: {
    ecmaVersion: 2017,
    sourceType: 'module'
  },
  extends: [
    'eslint:recommended',
    'plugin:ember/recommended'
  ],
  env: {
    browser: true
  },
  rules: {
    'ember/named-functions-in-promises': [2, {
      allowSimpleArrowFunction: true
    }]
  },
  globals: {
    t: true,
    server: true,
    localStorage: true,
    moment: true
  }
};
