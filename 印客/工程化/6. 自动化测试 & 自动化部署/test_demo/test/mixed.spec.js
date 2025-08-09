// 测试ES Module和CommonJS的混合使用
const {
  result,
  extendedResult,
  add,
  subtract,
  multiply,
  divide,
  getBigger,
  addFromMain,
  abs
} = require('../src/mixedModule.js');

describe('ES Module和CommonJS混合使用测试', () => {

  test('ES Module函数正常工作', () => {
    expect(add(2, 3)).toBe(5);
    expect(subtract(5, 2)).toBe(3);
    expect(multiply(4, 3)).toBe(12);
    expect(divide(10, 2)).toBe(5);
  });

  test('CommonJS函数正常工作', () => {
    expect(getBigger(5, 3)).toBe(5);
    expect(addFromMain(2, 3)).toBe(5);
    expect(abs(-5)).toBe(5);
  });

  test('混合使用结果正确', () => {
    expect(result.addResult).toBe(15);
    expect(result.subtractResult).toBe(5);
    expect(result.multiplyResult).toBe(50);
    expect(result.divideResult).toBe(2);
    expect(result.biggerResult).toBe(10);
    expect(result.addFromMainResult).toBe(15);
    expect(result.absResult).toBe(10);
  });

  test('ES6语法正常工作', () => {
    expect(result.numbers).toEqual([1, 2, 3, 4, 5]);
    expect(result.greeting).toBe('Hello, World!');
    expect(result.firstNumber).toBe(1);
    expect(result.lastNumber).toBe(5);
    expect(result.isPositive(5)).toBe(true);
    expect(result.isPositive(-5)).toBe(false);
    expect(result.summary).toBe('计算结果: 15');
  });

  test('ES6数组方法正常工作', () => {
    expect(extendedResult.filteredNumbers).toEqual([3, 4, 5]);
    expect(extendedResult.mappedNumbers).toEqual([3, 6, 9, 12, 15]);
  });

  test('对象展开语法正常工作', () => {
    expect(extendedResult).toHaveProperty('result');
    expect(extendedResult).toHaveProperty('filteredNumbers');
    expect(extendedResult).toHaveProperty('mappedNumbers');
    expect(extendedResult).toHaveProperty('addResult');
  });

  test('错误处理', () => {
    expect(() => divide(10, 0)).toThrow('除数不能为零');
    expect(() => addFromMain('a', 'b')).toThrow(TypeError);
    expect(() => abs('abc')).toThrow(TypeError);
  });
}); 