// 混合使用ES Module和CommonJS
// 在CommonJS中导入ES Module
const { add, subtract, multiply, numbers, greeting } = require('./esModule.js');
const divide = require('./esModule.js').default;

// 导入现有的CommonJS模块
const getBigger = require('./utils.js');
const { add: addFromMain, abs } = require('./main.js');

// 使用ES6语法
const result = {
  // 使用ES Module的函数
  addResult: add(10, 5),
  subtractResult: subtract(10, 5),
  multiplyResult: multiply(10, 5),
  divideResult: divide(10, 5),

  // 使用CommonJS的函数
  biggerResult: getBigger(10, 5),
  addFromMainResult: addFromMain(10, 5),
  absResult: abs(-10),

  // 使用ES6的其他语法
  numbers,
  greeting: greeting('World'),

  // 解构赋值
  firstNumber: numbers[0],
  lastNumber: numbers[numbers.length - 1],

  // 箭头函数
  isPositive: (num) => num > 0,

  // 模板字符串
  summary: `计算结果: ${add(10, 5)}`
};

// 使用ES6的数组方法
const filteredNumbers = numbers.filter(n => n > 2);
const mappedNumbers = numbers.map(n => n * 3);

// 使用ES6的对象展开语法
const extendedResult = {
  ...result,
  filteredNumbers,
  mappedNumbers,
  // 计算属性名
  [`result_${Date.now()}`]: 'dynamic property'
};

module.exports = {
  result,
  extendedResult,
  // 重新导出ES Module的内容
  add,
  subtract,
  multiply,
  divide,
  // 重新导出CommonJS的内容
  getBigger,
  addFromMain,
  abs
}; 