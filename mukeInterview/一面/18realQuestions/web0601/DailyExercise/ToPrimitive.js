/**-----------    字符串拼接    -----------*/
let obj = { a: 1 };
console.log(obj + '');

/**-----------    数学运算    -----------*/

console.log(obj * 2);


/**-----------    显式类型转换    -----------*/

console.log(String(obj), Number(obj));


/**-----------   当对象有自定义方法时   -----------*/


let obj2 = {
  [Symbol.toPrimitive](hint) {
    if (hint === 'string') return 'str';
    if (hint === 'number') return 123;
    return 'default';
  },
  toString() { return 'hello'; },
  valueOf() { return 42; }
};
console.log(String(obj2)); // 'str'
console.log(+obj2);        // 123

let obj3 = {
  toString() { return 'hello'; },
  valueOf() { return 42; }
};
console.log(String(obj3)); // 'hello'
console.log(+obj3);        // 42