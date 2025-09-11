const RULE_NAME = 'no-http-url';

module.exports = {
  name: RULE_NAME,
  meta: {
    type: 'suggestion',
    fixable: null,
    messages: {
      noHttpUrl: 'Recommended "{{url}}" switch to HTTPS',
    },
  },
  create(context) {
    return {
      /**
       * Literal 是 AST（抽象语法树）节点类型，表示JavaScript代码中的字面量。
       * // 变量声明
  *VariableDeclarator: function(node) { ... }

// 函数调用
CallExpression: function(node) { ... }

// 对象属性
Property: function(node) { ... }

// 数组元素
ArrayExpression: function(node) { ... }

// 条件语句
IfStatement: function(node) { ... }
       * */

      Literal: function handleRequires(node) {
        if (node.value && typeof node.value === 'string' && node.value.indexOf('http:') === 0) {
          context.report({
            node,
            messageId: 'noHttpUrl',
            data: {
              url: node.value,
            },
          });
        }
      },
    };
  },
};
