module.exports = {
  plugins: ['eslint-plugin'],
  rules: {
    // 启用分号检查规则
    'eslint-plugin/require-semicolon': 'error'
  },

  // 或者使用推荐配置
  // extends: ['plugin:eslint-plugin/recommended']
};
