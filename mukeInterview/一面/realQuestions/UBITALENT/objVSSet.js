
const set = new Set([1, 2, 3])
console.log(set.hasOwnProperty(1));
console.log(set.hasOwnProperty('1'));
/**
 * set.size 调用的是原型链上的getter方法
 */
console.log(Object.getOwnPropertyNames(set)) // []

const obj = { 1: 'a', 2: 'b' };

// 所有这些都是 true，因为都会转换为字符串 '1'
console.log(obj.hasOwnProperty('1'));  // true
console.log(obj.hasOwnProperty(1));    // true
console.log(obj.hasOwnProperty(1.0));  // true

// 访问属性也是一样的
console.log(obj[1]);     // 'a'
console.log(obj['1']);   // 'a' 
console.log(obj[1.0]);   // 'a'

// 证明内部存储的键确实是字符串
console.log('1' in obj);  // true
console.log(1 in obj);    // true (1 被转换为 '1')

// 什么时候会返回 false


console.log(obj.hasOwnProperty(3));    // false
console.log(obj.hasOwnProperty('3'));  // false
console.log(obj.hasOwnProperty('x'));  // false

const sym = Symbol('test');
const obj2 = {
  1: 'a',
  [sym]: 'symbol value'
};

console.log(obj2.hasOwnProperty(1));       // true (转换为 '1')
console.log(obj2.hasOwnProperty(sym));     // true (Symbol 不转换)
console.log(obj2.hasOwnProperty('Symbol')); // false