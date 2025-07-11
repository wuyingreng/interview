/**
 * @param {string} s
 * @return {string}
 */
var removeDuplicateLetters = function (s) {
  // 统计每个字符的出现次数
  const nums = {};
  for (let char of s) {
    nums[char] = (nums[char] || 0) + 1;
  }

  const visited = new Array(26).fill(false);
  const stack = [];

  for (let i = 0; i < s.length; i++) {
    const cha = s[i];

    // 先减少计数
    nums[cha]--;

    // 如果字符已经在栈中，跳过
    if (visited[cha.charCodeAt() - 'a'.charCodeAt()]) {
      continue;
    }

    // 维护单调栈
    while (stack.length > 0) {
      const top = stack[stack.length - 1];  // 先保存栈顶元素

      // 如果栈顶字符字典序大于当前字符，且后面还会出现
      if (top.charCodeAt() > cha.charCodeAt() && nums[top] > 0) {
        stack.pop();  // 弹出栈顶
        visited[top.charCodeAt() - 'a'.charCodeAt()] = false;  // 使用保存的元素
      } else {
        break;
      }
    }

    // 将当前字符入栈
    stack.push(cha);
    visited[cha.charCodeAt() - 'a'.charCodeAt()] = true;
  }

  return stack.join('');
};

// 测试
console.log(removeDuplicateLetters("bcabc")); // "abc"
console.log(removeDuplicateLetters("cbacdcbc")); // "acdb" 