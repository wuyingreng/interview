/**----------   1. 构造函数初始化     ----------*/
function Person() {

}
const person = new Person();
person.name = 'emily'


/**----------   2. 相互的关系     ----------*/

function Person2() {

}
Person2.prototype.name = 'Emily'

const person1 = new Person2();
const person2 = new Person2();
console.log(person1.name);
console.log(person2.name);
console.log(typeof Person2.prototype);// object
console.log(typeof person2);// object
console.log(person2.__proto__ === Person2.prototype);
console.log(Person2.prototype.constructor === Person2);
console.log(Object.getPrototypeOf(person2) === Person2.prototype);


/**----------   3. 实例属性和原型属性的覆盖     ----------*/

function Person3() {

}
Person3.prototype.name = 'Emily'
const person3 = new Person3();

person3.name = 'Emily2';
console.log(person3.name)
delete person3.name;
console.log(person3.name)

console.log(person3.constructor === Person3.prototype.constructor === Person3)

