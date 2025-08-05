const getBigger = require('../src/utils');

// 断言，你期望的结果
test('getBigger', () => {
  expect(getBigger(1, 3)).toBe(2);
  expect(getBigger(-3, -2)).toBe(-2);
  expect(() => getBigger('22', '44').throw(TypeError))
})
