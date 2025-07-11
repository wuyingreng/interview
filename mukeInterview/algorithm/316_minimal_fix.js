/**
 * @param {string} s
 * @return {string}
 */
var removeDuplicateLetters = function (s) {
  const nums = _.countBy(s);
  const visited = [];
  const stack = [];

  for (let i = 0; i < s.length; i++) {
    const cha = s[i];

    // 改动1：提前更新计数器
    nums[cha]--;

    if (!visited[cha.charCodeAt() - 'a'.charCodeAt()]) {
      // 如果栈顶元素的字典序是大于当前元素的
      if (stack.length > 0 && stack[stack.length - 1].charCodeAt() > cha.charCodeAt()) {
        while (stack.length > 0) {
          // 改动2：添加字典序检查条件
          if (stack[stack.length - 1].charCodeAt() > cha.charCodeAt() && nums[stack[stack.length - 1]] > 0) {
            // 弹栈标记栈顶元素没有存在栈里面
            visited[stack[stack.length - 1].charCodeAt() - 'a'.charCodeAt()] = 0;
            stack.pop();
          } else {
            break;
          }
        }
        stack.push(cha);
        visited[cha.charCodeAt() - 'a'.charCodeAt()] = 1;
      } else {
        console.log(cha)
        stack.push(cha);
        visited[cha.charCodeAt() - 'a'.charCodeAt()] = 1;
      }
    }

    // 改动1：移除这行（已经提前执行了）
    // nums[cha]--
  }
  return stack.join('')
}; 