function objectFactory(fn, ...args) {
	const obj={};
	obj.__proto__=fn.prototype;
	const result=fn.apply(obj,args);

	return typeof result==='object'?result:obj;

}

function Person(name,age){
	this.name=name;
	this.age=age
}


var person1=objectFactory(Person,'testkenvin1', 18)

console.log('person1',person1)