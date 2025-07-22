// Symbol 基本类型的值，相当于独一无二的字符串
let s = Symbol();
typeof s;
let foo = Symbol('foo');
foo.toString()