/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function (s) {
  if (s.length % 2 !== 0) return false;
  const stack = [];
  const map = new Map();
  // 这里用set表示
  map.set('{', '}');
  map.set('(', ')');
  map.set('[', ']');
  console.log(map)
  for (let i = 0; i < s.length; i++) {
    // 判断有没有这个key
    if (map.has(s[i])) {
      stack.push(s[i])
    } else {
      const stackPeak = stack[stack.length - 1];
      // 判断栈顶元素和当前元素是不是一一对应关系
      if (map.get(stackPeak) === s[i]) {
        stack.pop()
      } else {
        console.log(map.get(stackPeak))
        return false
      }
    }
  }

  return stack.length === 0;

};
isValid("()")