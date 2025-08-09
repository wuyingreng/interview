const assert = require('assert');

function tokenizer(input) {
  let current = 0;
  let tokens = [];
  console.log('current==>', current)
  // input.length-1 刚好是最后一个的长度
  // 满足某些条件才continue。统一都在if里面用continue。因为全局有个抛出错误
  while (current < input.length) {
    let char = input[current];
    if (char === '(') {
      tokens.push({ type: 'paren', value: '(' });
      current++;
      continue;
    }
    if (char === ')') {
      tokens.push({ type: 'paren', value: ')' });
      current++;
      continue;
    }

    // tokens里面可以去掉空格
    let WHITESPACE = /\s/;
    if (WHITESPACE.test(char)) {
      current++;
      continue;
    }
    let NUMBERS = /[0-9]/;
    if (NUMBERS.test(char)) {
      // 初始值为''
      let value = '';
      // 要进入while循环体了,
      while (NUMBERS.test(char)) {
        // 第一次的也放在里面，省的写在两个地方。
        value += char;
        // ++current ==> current=current+1;let b=current;
        char = input[++current];
      }
      tokens.push({ type: 'number', value });
      // 做完了才continue.
      continue
    }
    if (char === '"') {
      let value = '';

      char = input[++current];

      while (char !== '"') {
        value += char;
        char = input[++current];
      }

      ++current;

      tokens.push({ type: 'string', value });

      continue;
    }


    let LETTERS = /[a-z]/i;
    if (LETTERS.test(char)) {
      let value = '';
      while (LETTERS.test(char)) {
        value += char;
        char = input[++current]
      }
      tokens.push({ type: 'name', value });
      continue;
    }
    throw new TypeError('I dont know what this character is: ' + char);
  }
  return tokens
}


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
// assert.deepStrictEqual(tokenizer(input), tokens, 'Tokenizer should turn `input` string into `tokens` array');