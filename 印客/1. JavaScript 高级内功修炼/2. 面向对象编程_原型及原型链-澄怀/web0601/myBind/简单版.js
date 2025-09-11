/**---------------------- bind简单版 ----------------------*/
const foo = {
	val: 1
}

function bar(name, age) {
	this.age = age;
	this.name = name;
	console.log(this, 'test', this.val, this.age, this.name)
}


var value = 2;

Function.prototype.myBind = function (ctx = window, ...args) {
	_this = this;
	return function (...nextArgs) {
		_this.call(ctx, ...args, nextArgs)
	}
}

const barBind = bar.myBind(foo, 'Emily2');

const barObj = barBind(18);
