// 没有模块化之前不同的功能封装成不同的全局函数问题-全局function模式

/** -------------  1. 变量名称覆盖   -------------*/

function log() {
  console.log('module 1')
}
function log() {
  console.log('module 2')
}
log()

/** -------------  2. 数据安全   -------------*/

var count = 0
function increment() {
  count++
}
function getcount() {
  return count
}
count = 100
console.log(getcount()) //100


/** -------------  3. 模块之间的关系不清晰   -------------*/


// 用户模块
function fetchUser() { }
// UI模块
function render() { }
// 业务模块
function login() {
  fetchUser();
  render();
}
