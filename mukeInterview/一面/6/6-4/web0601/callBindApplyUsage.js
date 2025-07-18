var scope = "global scope";
function checkscope() {
  var scope = "local scope";
  function f() {
    return console.log('this', this, this.scope);
  }
  return f();
}
checkscope();

/**--------------  call ---------------*/
// call方法
function greet(greeting, punctuation) {
  // punctuation /ˌpʌŋktʃuˈeɪʃən/ 标点符号
  console.log(`${greeting},${this.name}${punctuation}`)
}
const person = { name: "Alice" };

greet.call(person, "Hello", '!');







/**--------------  apply方法 ---------------*/
// apply方法
function sum(a, b, c) {
  console.log(this.name)
  return a + b + c
};
const obj = { name: 'Alice' }
//sum(numbers[0],numbers[1],numbers[2]);// fragment
const numbers = [1, 2, 3];

sum.apply(obj, numbers);



/**--------------  bind方法 ---------------*/
function sayHello(greeting) {
  console.log(`${greeting}${this.name}`)
}
const user = { name: "Bob" };
sayHello("Hi");// fragmentconst 
//在这里函数还没执行!
boundSayHello = sayHello.bind(user, 'Hi')
boundSayHello()



