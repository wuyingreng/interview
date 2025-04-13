// 值类型
let a = 100;
let b = a;

a = 200

console.log('valueb=>', b)


// 引用类型
let importA = { age: 200 }
let importB = importA;
importA.age = 100;
console.log('importB==>', importB)

importB.age = 20;
console.log('importA==>', importA)

// 常见值类型
let valueA;// undefined
const valueS = 'abc';
const valueN = 100;
const valueB = true;
const valueSmy = Symbol('s') // ？？？这个用来做什么的，感觉很少用到啊


// 常见引用类型

const importobj = { x: 100 }
const importarr = ['a', 'b', 'c']
const n = null // 这个存在争议
// 特殊引用类型，但不用于存储数据，所以没有“拷贝、复制函数“这一说
function fn() { }
// 深拷贝到底是在做什么