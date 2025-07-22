/**----------  1. 函数声明和函数表达式的区别  ---------- */

console.log(add(1, 2));

// 1. 函数声明
function add(num1, num2) { return num1 + num2 };


function foo() {
  return bar();
  function bar() { return 3 };
  function bar() {
    return 9;
  }
};

console.log(foo());


// 2. 函数表达式
// sum(1, 2)
// var sum = function (num1, num2) { return num1 + num2 };
// var sum2 = function sum(num1, num2) { return num1 + num2 };
// sum(1, 2);

// let sum = function (num1, num2) { return num1 + num2 };

// a;
// let a = 3



/**----------  2. 变量  ---------- */
// console.log('testaUndeclare', unclareA)
// unclareA = 123

// console.log('testa', testa)
// let testa = 123

// console.log(unDeclareFoo());
// function unDeclareFoo() {
//   console.log("foo")
// };
// var unDeclareFoo = 1;



console.log(unDeclareFooExpress);
var unDeclareFooExpress = () => {
  console.log("foo")
};
var unDeclareFooExpress = 1;


console.log('test', unDeclareFooExpress);
unDeclareFooExpress = () => {
  console.log("foo")
};
unDeclareFooExpress = 1;

var data = [];

// var没有块级作用域所以，i是声明在全局中的。全局中只有一个i，执行data[0]() i=3
for (var i = 0; i < 3; i++) {
  data[i] = (function () {
    console.log(i);
  })(i);
}

data[0]();
data[1]();
data[2]();