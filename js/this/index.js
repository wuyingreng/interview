/**
 * 为什么使用 this。不用显示的传参
*/
function identify() {
  return this.name.toUpperCase();
}

function speak() {
  var greeting = "Hello, I'm" + identify.call(this);
  console.log(greeting);
}

var me = {
  name: 'johan',
};

var you = {
  name: 'elaine',
};

identify.call(me)
identify.call(you)

speak.call(me); // Hello, I'm JOHAN
speak.call(you); // Hello, I'm ELAINE

// 写法二：不用this pass context
function identify(context) {
  return context?.name?.toUpperCase();
}

function speak(context) {
  var greeting = "Hello, I'm" + identify(context);
  console.log(greeting);
}

identify(you); // ELAINE
speak(me); // Hello, I'm JOHAN

/***-------  调用方式    ------- ***/

/**
 * 1. 作为对象方法调用
 * 在 JavaScript 中，函数也是对象，因此函数可以作为一个对象的属性，
 * 此时该函数被称为该对象的方法，在调用这种调用方式时，this 被自然绑定到该对象
 * this === people
 * 注意和prototype的区别
*/

var people = {
  name: 'elaine',
  age: 28,
  sayName: function () {
    console.log(this.name)
  }
}

people.sayName(); // elaine

// 2和3用deepseek给的答案

/**
 * 2. 作为函数调用
 * 函数也可以直接被调用，此时 this 绑定到全局对象。在浏览器中，window 就是该全局对象。比如下面的例子：函数被调用时，this 被绑定到全局对象，接下来执行赋值语句，
 * 相当于隐式的声明了一个全局变量，这显然不是调用者希望的
*/
function sayAgfunc(age) {
  this.age = age;
}
sayAgfunc(5);
console.log(age) //5

/**
 * 3. 作为箭头函数调用
 * 理想中的设计方式应该是内部函数的 this 应该绑定到其外层函数对应的对象上
*/
var people = {
  name: 'eliane',
  age: 28,
  sayName: () => console.log(this.name, this),
  sayName2: function () {
    console.log(this.name, this);
  },
};
people.sayName(); //  '', Window
people.sayName2(); // elaine, {name: 'eliane', age: 28}
