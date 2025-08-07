/** ----------   函数传参 ----------        */

// var value = 1
// function foo(v) { // 相当于新建了一个变量v=1
//   v = 2
//   console.log(v)
// }

// foo(value)
// console.log(value)

var obj = {
  val: 1
}

// 这里还涉及到了对象的引用传递
function foo1(v) {
  v.val = 2;
  console.log(v.val);
}
foo1(obj)
console.log(obj.val);

/**
 * AO:{
 *  arguments:{
 *  0:obj,
 *  length:1
 * }
 * 
 * }
 * 
*/