// 判断所有的值类型
let undefineA;
console.log('undefineA==>', undefineA)
const str = 'abc';
console.log('str==>', typeof str)

const n = 100;
console.log('n==>', typeof n)
const booleanb = true;
console.log('booleanb==>', typeof booleanb)
const symbols = Symbol('s')
console.log('Symbol==>', typeof symbols)


//能判断函数
console.log('console.log', typeof console.log)
console.log('function', typeof function () { })

//能识别引用类型(不能再继续识别)
console.log('null', typeof null)// 'object'
console.log("['a', 'b']", typeof ['a', 'b'])// 'object'
console.log('{ x: 100 }', typeof { x: 100 })// 'object'
