/**----------   1. 静态作用域     ----------*/
// var value = 1;

// function foo() {
//   console.log(value)
// }

// function bar() {
//   var value = 2;
//   foo()
// }
// bar() // 1

// /**----------   2. 执行栈     ----------*/

// var scope1 = 'global scope';
// function checkScope1() {
//   var scope1 = 'locale scope';
//   function f() {
//     console.log(scope)
//   }
//   f()
// }

// checkScope1();


// var scope2 = 'global scope';
// function checkScope2() {
//   var scope2 = 'locale scope';
//   function f() {
//     console.log(scope2)
//   }
//   return f
// }

// checkScope2()();



// console.log(add2(1, 2));

// function add2(a, b) {
//   return a + b
// }

// console.log(add1(1, 2));

// var add1 = function (a, b) {
//   return a + b
// }


// function foo() {
//   console.log(a);
//   a = 1;
// }

// foo(); // ???

function bar() {
  a = 1;
  console.log(a);
}
bar(); 