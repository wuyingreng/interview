
const foo = {
  val: 1
}

function bar(name) {
  console.log(this, 'test', this.val, name)
}


var value = 2;

var foo2 = {
  value: 1
};

function bar2(name, age) {
  this.habit = 'shopping';
  console.log(this.value);
  console.log(name);
  console.log(age);
}

bar.prototype.friend = 'kevin';

var bindFoo = bar.bind(foo, 'daisy');
/**
 * 调用new 之前
 * bindFoo(18) // 这些这里的时候,this还是foo.
* console.log('foo==>', foo)//{value: 1, habit: 'shopping'}
*/

var obj18 = new bindFoo('18');

console.log(obj18.habit);
console.log(obj18.friend);


/*
 * 需求点：
 * 1. bind绑定this,不传默认window
 * 2. bind返回一个函数，bind(this,args) args会成为返回函数的预设参数
 * 3. bind 返回的函数可以被当做构造函数
*/
Function.prototype.myBind = function (ctx = window, ...args) {
  const _this = this;
  return function (...nextArgs) {
    const result = _this.call(ctx, ...args, ...nextArgs);
    return result
  }
}
const barBind = bar.myBind(foo, 'Emily2');
barBind('emily3')