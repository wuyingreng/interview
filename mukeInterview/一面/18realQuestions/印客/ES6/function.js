/** -------- 参数相关 --------*/


function log(x, y = 5) { };


(function () { }).length; //0

(function (a, b, c = 3) { }).length; // 2 不包括默认值的

(function (a, ...rest) { }).length; // 1 不包括剩余参数

function log1({ x, ...rest }) {
  console.log('rest==>', rest)
} // rest是不排序的
log1({ x: 1, y: 2, z: 3 }) // rest==>{y: 2, z: 3}

function log2([x, ...rest]) {
  console.log('rest==>', rest)
} // rest是排序的
log2([1, 3, 7, 8]) // [3, 7, 8]

/** -------- 箭头函数 --------*/
const test = (x, y) => x + y;
const testFn = (x, y) => { return x + y }

// 箭头函数没有自己的this
function foo() {
  setTimeout(() => {
    console.log(`arrow id: ${this.id}`, 1000)
  })
}
function bar() {
  /**
   * 普通函数setTimeout的this是window,setTimeout是异步的，
   * 执行的时候全局已经有id这个属性了
   * */
  setTimeout(function () {
    console.log(`default id:, ${this.id}`, 1000)
  })
}
var id = 0;
bar.call({ id: 222 })
foo.call({ id: 222 })

function Timer() {
  this.s1 = 0;
  this.s2 = 0;
  // 箭头函数
  setInterval(() => this.s1++, 1000);// 普通函数
  setInterval(function () {
    this.s2++;
  }, 1000)
}
var timer = new Timer()
setTimeout(() => console.log('s1:', timer.s1), 3100);
// timer.s2并没有被改变
setTimeout(() => console.log('s2:', timer.s2), 3100);