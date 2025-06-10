class Stack {
  items = [];

  push(element) {
    this.items.push(element);
  }

  pop() {
    return this.items.pop();
  }

  peek() {
    return this.items[this.items.length - 1];
  }
}

/** 1. 用栈的数据结构把10进制转换为2进制*/
function decimalToBinary(decimal) {
  if (decimal === 0) return "0";

  const stack = new Stack();
  let num = decimal;

  while (num > 0) {
    stack.push(num % 2);  // 余数入栈
    num = Math.floor(num / 2);  // 正确更新
  }

  let binary = "";
  while (stack.peek() !== undefined) {
    binary += stack.pop();  // 逆序构建结果
  }

  return binary;
}

console.log('decimalToBinary(100)==>', decimalToBinary(100))

