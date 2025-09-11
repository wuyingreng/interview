/**---------------------- 兼容bind作为构造函数的版本 太复杂了，没有学会 ----------------------*/
const foo = {
  val: 1
}

function bar(name) {
  console.log(this, 'test', this.val, name)
}


var value = 2;

const barBind = bar.myBind(foo, 'Emily2');

const barObj = barBind(18);


// 在上面的例子中foo-->ctx
Function.prototype.myBind = function (ctx = window, ...args) {

  // 如果前面有Function.prototype 这个if可以不要
  if (typeof this !== 'function') {
    throw new Error('Function.prototype.bind - what is trying to be bound is not callable')
  }
  // _this-->bar
  const _this = this;

  const boundNOP = function () { }
  // barObj habit 属性，所以fBound 上有habit属性，this 指向 fBound
  // 作为昔通函数 ctx
  // 作为构造函数， this指向调用他的人，
  var bound = function (...nextArgs) {
    // 作为构造函数 this是 fBound的实例
    // barObj -> this
    //构造函数->bound
    // barObj 是构造函数的实例，也就证明，它是new创建出的实例
    // barObj instanceof 构造函数〖
    // this instanceof fBound.
    // 注意外面是_this,里面是this.this是实例，_this是调用myBind的在demo中是bar2
    const result = _this.call(this instanceof bound ? this : ctx, ...args, ...nextArgs);
    return result
  }
  // bar2.prototype.friend = 'kevin';
  // this.prototype.friend = 'kevin';
  // obj18 上有prototype属性，所以bound也应该有prototype.friend 属性

  /**
   * 中转一层是为了防止修改bound.protype上的属性导致this的属性被修改
   * typeof Person.prototype
   *  bound.prototype===this.prototype;两个内存地址执行一样。修改
   * bound.prototype 就会修改到最后实例的prototype
  */
  // 
  //??? 思考下普通的函数,boundNop  也是这样的对应的吗
  boundNOP = this.prototype;
  bound.prototype = new boundNOP()

  return bound
}


/**---------------------- bind作为构造函数使用 ----------------------*/
var foo2 = {
  value: 1
};

function bar2(name, age) {
  this.habit = 'shopping';
  console.log(this.value, this);
  console.log(name);
  console.log(age);
}

bar2.prototype.friend = 'kevin';
const barNewBind = bar2.myBind(foo2, 'Emily2');
const barNewObj = new barNewBind(18)


console.log(barNewObj.habit);
console.log(barNewObj.friend);