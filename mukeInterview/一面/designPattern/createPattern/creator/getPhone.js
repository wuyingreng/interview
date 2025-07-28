function getPhone(size, type, screen, price = 100) {
};
function getPhone(size, type, screen, price, discount) { };
// 后续需求更改，不断的加参数很麻烦

getPhone(7, 'Ios', '120', 100, 0.8, people);
// 参数的设计思想就是建造者模式
function getPhone({
  size,
  type = 'IOS', screen = '120',
  discount }
  = {}) {
  console.log(price)
  // 里面的if就是观察者模式
  // if(){}
  // // if () {}
}
getPhone({ size: 4 })

