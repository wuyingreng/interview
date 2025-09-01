// 就是构造函数，new后面的函数。 args 剩余参数是一个数组
const myNew = function (fn, ...args) {
	// obj是实例
	let obj = {};
	// fn是构造函数
	obj.__proto__ = fn.prototype;

	// 相当于 myNew执行了。
	let result =  fn.apply(obj, args);

	return typeof result === 'object' ? result : obj;

};


const Person1 = function (name, age) {
	this.name = name;
	this.age = age;
};


const Person2 = function (name, age) {

	return {
		name: 'Emily'
	}
};

console.log('person1==>', myNew(Person1, 'Keven', 18));
console.log('person2==>', myNew(Person2, 'Keven', 18))