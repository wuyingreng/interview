// 建造者模式

// 场景
function getPhone(size, type, screen, price = 100) {
  // ...
}

// 增加参数
function getPhone(size, type, screen, price = 100, discount) {}

getPhone(4.3, 'IOS', 'OLED', undefined, 0.8);

function getPhone(size, type, screen, price = 100, discount, mode = 'test') {}

// 优化

function getPhone({
  size,
  type = 'IOS',
  screen = 'OLED',
  discount = 0.8,
} = {}) {
  console.log(size);
  console.log(discount);
  console.log(price);
}
// 避免参数顺序
// 在扩展的时候 不需要担心其他地方调用会不会有问题

// 总结
// 建造者模式 可以直接通过对象传递参数即可
