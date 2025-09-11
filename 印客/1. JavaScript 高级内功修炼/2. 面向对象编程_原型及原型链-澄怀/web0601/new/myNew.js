// 这里是没有this的因为调用方式是objectFactory(fn,args)不像bind是 obj.bind(xx)实例调用bind
/** ------------  手写new       ------------*/
/**
 * 根据需求写函数
 * 需求1：调用函数，生成一个对象。返回这个对象。this是这个对象。调用fn，this被新增属性
 * 需求2：对象和函数的关系。对象.__proto__==函数.prototype
 * 需求3：如何obj调用fn，得到的result是对象，就返回result而不是obj
*/
// 因为new是关键字，所以要用objectFactory函数的形式
function objectFactory(fn, ...args) {
  // 因为要最后返回obj，所以要创建obj.obj在这里是实例
  var obj = {}

  // fn 作为构造函数 Constructor, 实例的原型 和 实例之间的关系
  // Func.prototype === fun1.__proto__
  // fn 作为构造函数 Constructor。把函数和对象关联起来
  obj.__proto__ = fn.prototype



  /**
   * result为对象是下面这种情况：
   * function Person(name, age) {
  *this.strength = 60;
  *this.age = age;

  *return {
  *  name: name,
  *  habit: 'Games'
  *}
  
*}

*var person = new Person('Kevin', '18');

*console.log(person.name) // Kevin
*console.log(person.habit) // Games
*console.log(person.strength) // undefined
*console.log(person.age) // undefined
*strength 和age都没有了

* result为空，obj也被赋值了。fn.apply(obj, args)
  */

  var result = fn.apply(obj, args)
  return typeof result === 'object' ? result : obj
}

function Person(name,age){
  this.name=name;
  this.age=age
}


var person1=objectFactory(Person,'testkenvin1', 18)

console.log('person1',person1)