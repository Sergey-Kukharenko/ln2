module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: '@babel/eslint-parser',
    requireConfigFile: false
  },
  extends: ['@nuxtjs', 'plugin:nuxt/recommended', 'plugin:prettier/recommended'],
  plugins: [],
  // add your custom rules here
  rules: {
    'no-console': 0,
    'vue/multi-word-component-names': [
      'error',
      {
        ignores: ['empty']
      }
    ]
  }
};
