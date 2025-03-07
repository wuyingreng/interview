/**
 * 1. 作为对象的第一层方法
 */

var name = '我是全局的name'
var people = {
  name: 'elaine',
  age: 28,
  sayName: function () {
    console.log('普通函数==>', this.name);
  },
  sayNameArrow: () => {
    console.log('箭头函数==>', this.name);
  },
};

people.sayName()
people.sayNameArrow()

/**
 * 1. 作为对象的第一层方法
 */