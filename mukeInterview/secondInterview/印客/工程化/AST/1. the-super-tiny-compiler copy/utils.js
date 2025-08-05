const assert = require('assert')
function tokenizer(input) {
  // 指针
  let current = 0;
  // 收集数据的地方
  let tokens = [];

  // 一直遍历到数组的末尾。数组的索引从0开始
  while (current < input.length) {
    // 当前字符串
    let char = input[current];

    if (char === '(') {
      tokens.push({
        type: 'paren',
        value: '(',
      });

      current++;

      continue;
    }

    if (char === ')') {
      tokens.push({
        type: 'paren',
        value: ')',
      });
      current++;
      continue;
    }

    // token流里面去掉空格
    let WHITESPACE = /\s/;
    if (WHITESPACE.test(char)) {
      current++;
      continue;
    }

    let NUMBERS = /[0-9]/;
    if (NUMBERS.test(char)) {
      let value = '';
      // 必须要这个内层while循环，不然let value不好存放。
      while (NUMBERS.test(char)) {
        value += char;
        char = input[++current];
      }

      tokens.push({ type: 'number', value });

      continue;
    }

    // 'ab'
    if (char === '"') {
      let value = '';

      // chart='a'8
      // 去掉开头的""" 不处理
      char = input[++current];

      while (char !== '"') {
        // val='a'
        // val='ab'
        value += char;
        // char='b'
        // chart=''
        char = input[++current];
      }

      // char=8 current跑到了索引8上面又重新赋值char
      // 去掉末尾的'“' 不进行处理
      ++current;

      tokens.push({ type: 'string', value });
      // 这个continue是外层的continue，表示后面的current++不要再执行了
      continue;
    }

    let LETTERS = /[a-z]/i;
    if (LETTERS.test(char)) {
      let value = '';

      while (LETTERS.test(char)) {
        value += char;
        char = input[++current];
      }

      tokens.push({ type: 'name', value });

      continue;
    }

    // 每一个if 里面要加continue，因为后面有抛出错误
    throw new TypeError('I dont know what this character is: ' + char);
  }
  return tokens;
}
// tokens是平铺的。没有嵌套
const tokens = [
  { type: 'paren', value: '(' },
  { type: 'name', value: 'add' },
  { type: 'number', value: '2' },
  { type: 'paren', value: '(' },
  { type: 'name', value: 'subtract' },
  { type: 'number', value: '4' },
  { type: 'number', value: '2' },
  { type: 'paren', value: ')' },
  { type: 'paren', value: ')' }
];
const input = '(add 2 (subtract 4 2))'; // lisp语法
console.log('tokens==>', tokenizer(input))
assert.deepStrictEqual(tokenizer(input), tokens, 'Tokenizer should turn `input` string into `tokens` array');