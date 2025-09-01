const { RuleTester } = require('eslint');
const rule = require('../rules/require-semicolon');

const ruleTester = new RuleTester({
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module'
  }
});

ruleTester.run('require-semicolon', rule, {
  valid: [
    // 正确的分号使用
    'const x = 1;',
    'let y = 2;',
    'var z = 3;',
    'function test() {};',
    'class Test {};',
    'import { x } from "module";',
    'export default x;',
    'export { x };',
    'return x;',
    'throw new Error();',
    'continue;',
    'break;',
    'debugger;',
    ';', // 空语句
    'console.log("test");'
  ],

  invalid: [
    // 缺少分号的情况
    {
      code: 'const x = 1',
      errors: [{ messageId: 'missingSemicolon' }],
      output: 'const x = 1;'
    },
    {
      code: 'let y = 2',
      errors: [{ messageId: 'missingSemicolon' }],
      output: 'let y = 2;'
    },
    {
      code: 'function test() {}',
      errors: [{ messageId: 'missingSemicolon' }],
      output: 'function test() {};'
    },
    {
      code: 'class Test {}',
      errors: [{ messageId: 'missingSemicolon' }],
      output: 'class Test {};'
    },
    {
      code: 'import { x } from "module"',
      errors: [{ messageId: 'missingSemicolon' }],
      output: 'import { x } from "module";'
    },
    {
      code: 'export default x',
      errors: [{ messageId: 'missingSemicolon' }],
      output: 'export default x;'
    },
    {
      code: 'return x',
      errors: [{ messageId: 'missingSemicolon' }],
      output: 'return x;'
    },
    {
      code: 'throw new Error()',
      errors: [{ messageId: 'missingSemicolon' }],
      output: 'throw new Error();'
    },
    {
      code: 'console.log("test")',
      errors: [{ messageId: 'missingSemicolon' }],
      output: 'console.log("test");'
    }
  ]
});
