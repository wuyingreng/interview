// 这块没有弄完
/**-------------  函数作为返回值      -------------*/

function create() {
  // a=100也是在create作用域
  let a = 100;
  // 函数定义是在create作用域
  return function () {
    console.log('函数作为返回值==>', a)
  }
}
// 找到地方接收这个函数

let fn = create();
let a = 200;
// 函数执行是在全局作用域
fn()



/**-------------  函数作为参数被传递     -------------*/
function print(fn) {
  let b = 200
  fn()
}
let b = 100;
function fnb() {
  console.log('函数作为参数被传递', b)
}

print(fnb)