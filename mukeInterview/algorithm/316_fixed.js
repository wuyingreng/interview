/**
 * @param {string} s
 * @return {string}
 */
var removeDuplicateLetters = function (s) {
  // 统计每个字符的剩余出现次数
  const count = {};
  for (let char of s) {
    count[char] = (count[char] || 0) + 1;
  }

  // 记录字符是否已在栈中
  const visited = new Array(26).fill(false);
  const stack = [];

  for (let i = 0; i < s.length; i++) {
    const char = s[i];
    const charIndex = char.charCodeAt() - 'a'.charCodeAt();

    // 减少当前字符的剩余计数
    count[char]--;

    // 如果字符已经在栈中，跳过
    if (visited[charIndex]) {
      continue;
    }

    // 维护单调栈：移除字典序大于当前字符且后面还会出现的字符
    while (stack.length > 0) {
      const top = stack[stack.length - 1];
      const topIndex = top.charCodeAt() - 'a'.charCodeAt();

      // 如果栈顶字符字典序大于当前字符，且后面还会出现，则移除
      if (top > char && count[top] > 0) {
        stack.pop();
        visited[topIndex] = false;
      } else {
        break;
      }
    }

    // 将当前字符入栈
    stack.push(char);
    visited[charIndex] = true;
  }

  return stack.join('');
};

// 测试用例
console.log(removeDuplicateLetters("bcabc")); // 输出: "abc"
console.log(removeDuplicateLetters("cbacdcbc")); // 输出: "acdb" 