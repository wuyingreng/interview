module.exports = {
  parserPreset: 'conventional-changelog-conventionalcommits',
  rules: {
    'body-leading-blank': [1, 'always'],
    'body-max-line-length': [2, 'always', 100],
    'footer-leading-blank': [1, 'always'],
    'footer-max-line-length': [2, 'always', 100],
    'header-max-length': [2, 'always', 100],
    'scope-case': [2, 'always', 'lower-case'],
    'subject-case': [0],
    'subject-empty': [2, 'never'],
    'subject-full-stop': [2, 'never', '.'],
    'type-case': [2, 'always', 'lower-case'],
    'type-empty': [2, 'never'],
    'type-enum': [2, 'always', ['feat', 'fix', 'docs', 'style', 'test', 'refactor', 'chore', 'revert']],

    // 使用自定义规则要求提交信息必须是英文，不能包含中文字符
    /**
     * 错误级别（level）
      0: 关闭规则（off）
      1: 警告级别（warn）- 显示警告但不阻止提交
      2: 错误级别（error）- 显示错误并阻止提交。越严重的值越大
      适用性（applicable）
      'always': 总是应用此规则
      'never': 从不应用此规则
      值（value）
      规则的具体配置值（可选
     * 
     * 
     * */
    'subject-no-chinese': [2, 'always'],
    'body-no-chinese': [1, 'always'],
  },

  // 自定义规则插件，提供更友好的错误消息
  plugins: [
    {
      rules: {
        // 检查subject不能包含中文字符
        'subject-no-chinese': ({ subject }) => {
          if (!subject) return [false, '提交信息不能为空'];

          /**
           * 检查是否包含中文字符 const chineseRegex = /[\u4e00-\u9fff\u3000-\u303f\uff00-\uffef]/;
           * */
          const chineseRegex = /[\u4e00-\u9fff\u3000-\u303f\uff00-\uffef]/;
          const hasChinese = chineseRegex.test(subject);

          if (hasChinese) {
            return [false, '提交信息必须使用英文，不能包含中文字符。例如：feat: add user login functionality'];
          }

          return [true];
        },

        // 检查body不能包含中文字符（可选）
        'body-no-chinese': ({ body }) => {
          if (!body) return [true]; // body是可选的

          // 检查是否包含中文字符
          const chineseRegex = /[\u4e00-\u9fff\u3000-\u303f\uff00-\uffef]/;
          const hasChinese = chineseRegex.test(body);

          if (hasChinese) {
            return [false, '提交信息正文必须使用英文，不能包含中文字符'];
          }

          return [true];
        }
      }
    }
  ]
};