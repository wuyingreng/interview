// 题号20 有效的括号
const isValid = (s) => {
  if (s.length % 2 === 1) return false
  const stack = [];
  for (let i = 0; i <= s.length - 1; i++) {
    if (s[i] === '(' || s[i] === '{' || s[i] === '[') {
      stack.push(s[i])
    } else if (s[i] === ')' || s[i] === '}' || s[i] === ']') {
      // 栈顶元素
      const t = stack[stack.length - 1];
      if ((t === '(' && s[i] === ')') || (t === '{' && s[i] === '}') || (t === '[' && s[i] === ']')) {
        stack.pop()
      } else {
        return false
      }
    }

  }
  return stack.length === 0
};

s = "(){}}{"

isValid(s)