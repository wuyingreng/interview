module.exports = {
  rules: {
    'require-semicolon': require('./rules/require-semicolon')
  },
  configs: {
    recommended: {
      plugins: ['eslint-plugin'],
      rules: {
        'eslint-plugin/require-semicolon': 'error'
      }
    }
  }
};
