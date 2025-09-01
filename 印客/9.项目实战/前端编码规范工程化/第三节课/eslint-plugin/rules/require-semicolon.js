module.exports = {
  meta: {
    type: 'suggestion',
    docs: {
      description: '要求所有语句以分号结尾',
      category: 'Stylistic Issues',
      recommended: true,
      url: 'https://github.com/your-repo/eslint-plugin'
    },
    fixable: 'code',
    schema: [],
    messages: {
      missingSemicolon: '语句缺少分号'
    }
  },

  create(context) {
    return {
      // 检查表达式语句
      ExpressionStatement(node) {
        checkSemicolon(node, context);
      },

      // 检查变量声明
      VariableDeclaration(node) {
        checkSemicolon(node, context);
      },

      // 检查函数声明
      FunctionDeclaration(node) {
        checkSemicolon(node, context);
      },

      // 检查类声明
      ClassDeclaration(node) {
        checkSemicolon(node, context);
      },

      // 检查导入声明
      ImportDeclaration(node) {
        checkSemicolon(node, context);
      },

      // 检查导出声明
      ExportNamedDeclaration(node) {
        checkSemicolon(node, context);
      },

      ExportDefaultDeclaration(node) {
        checkSemicolon(node, context);
      },

      ExportAllDeclaration(node) {
        checkSemicolon(node, context);
      },

      // 检查调试语句
      DebuggerStatement(node) {
        checkSemicolon(node, context);
      },

      // 检查空语句
      EmptyStatement(node) {
        checkSemicolon(node, context);
      },

      // 检查返回语句
      ReturnStatement(node) {
        checkSemicolon(node, context);
      },

      // 检查抛出语句
      ThrowStatement(node) {
        checkSemicolon(node, context);
      },

      // 检查继续语句
      ContinueStatement(node) {
        checkSemicolon(node, context);
      },

      // 检查中断语句
      BreakStatement(node) {
        checkSemicolon(node, context);
      }
    };
  }
};

function checkSemicolon(node, context) {
  const sourceCode = context.getSourceCode();
  const lastToken = sourceCode.getLastToken(node);

  // 如果最后一个token不是分号
  if (lastToken && lastToken.value !== ';') {
    context.report({
      node,
      messageId: 'missingSemicolon',
      fix(fixer) {
        // 自动修复：在语句末尾添加分号
        return fixer.insertTextAfter(lastToken, ';');
      }
    });
  }
}
