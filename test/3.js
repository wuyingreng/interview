function longestValidParentheses(s) {
  // write code here
  const stack = []
  if (s.length <= 0) { return 0 };
  for (const i in s) {
    console.log('s[i]==>', s[i])
    if ((i - 1) > 0 && s[i] === ')' && s[i - 1] === '(') {
      stack.pop()
    } else {
      stack.push(s[i])
    }
  }
  console.log('stack==>', stack, s.length - stack.length)
  return s.length - stack.length
}

longestValidParentheses('(()')
longestValidParentheses(')()())')
/**
 * test case:
 * '(()' -->2
 * ')()())'--->4
 * '' -->0
 * '(())' //???
*/