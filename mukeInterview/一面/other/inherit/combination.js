function Animal(name) {
  console.log('构造函数呗调用')
  this.name = name;
  this.colors = ['blue', 'black']
}
Animal.prototype.getName = function () {
  return this.name;
};

function Dog(name, breed) {
  Animal.call(this, name);  // 继承属性。每一次实例化new Dog就会调用构造函数一次
  this.breed = breed;
}
Dog.prototype = new Animal(); // 继承方法 第二次调用父类的构造函数
Dog.prototype.constructor = Dog;

const dog1 = new Dog('Max');
const dog2 = new Dog('Buddy');
dog1.colors.push('green');

console.log(dog1.colors);
console.log(dog2.colors);

console.log(dog1.getName());
console.log('Dog1.prototype的属性:', Object.getOwnPropertyNames(Dog.prototype));