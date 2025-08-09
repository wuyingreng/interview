function parseNumbers(input) {
  let current = 0;
  let numbers = [];
  let char = input[current]
  while (current < input.length) {
    if (/[0-9]/.test(char)) {
      let nums = '';
      while (current < input.length && /[0-9]/.test(char)) {
        nums += char;
        char = input[++current]
      }
      numbers.push(nums);
      // 这个continue是外层的continue，表示后面的current++不要再执行了
      continue;
    }
    current++
  }
  return numbers
}

console.log(parseNumbers("abc123def456")); // [123, 456]