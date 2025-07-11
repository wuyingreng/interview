
/**
 * @param {string} s
 * @return {string}
 */

const _ = require('lodash');

var removeDuplicateLetters = function (s) {
  const nums = _.countBy(s);
  // 这里不一样？？？
  const visited = [];
  const stack = [];

  for (let i = 0; i < s.length; i++) {
    const cha = s[i];
    if (!visited[cha.charCodeAt() - 'a'.charCodeAt()]) {
      while (stack.length > 0 && stack[stack.length - 1].charCodeAt() > cha.charCodeAt()) {
        // 栈顶元素后面还有
        if (nums[stack[stack.length - 1]] > 0) {
          // 弹栈标记栈顶元素没有存在栈里面
          visited[stack[stack.length - 1].charCodeAt() - 'a'.charCodeAt()] = 0;
          stack.pop();
        } else {
          break;
        }
      }
      stack.push(cha);
      visited[cha.charCodeAt() - 'a'.charCodeAt()] = 1;
    }
    nums[cha]--
  }

  return stack.join('')
}

removeDuplicateLetters("cbacdcbc")