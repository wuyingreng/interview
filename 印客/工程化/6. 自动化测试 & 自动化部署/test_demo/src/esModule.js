// ES Module 文件 - 使用ES6语法
export const add = (a, b) => a + b;

export const subtract = (a, b) => a - b;

export const multiply = (a, b) => a * b;

// 默认导出
export default function divide(a, b) {
  if (b === 0) {
    throw new Error('除数不能为零');
  }
  return a / b;
}

// 使用其他ES6语法
export const numbers = [1, 2, 3, 4, 5];

export const doubled = numbers.map(n => n * 2);

export const sum = numbers.reduce((acc, n) => acc + n, 0);

// 解构赋值
export const { PI, E } = Math;

// 模板字符串
export const greeting = (name) => `Hello, ${name}!`; 