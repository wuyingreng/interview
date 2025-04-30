
/*-----   字符串拼接      -----*/
const a = 100 + 10
console.log('a=>', a)
// 数字+数字字符串 拼接
const b = 100 + '10' // '10010'
console.log('b=>', b)
// true+数字字符串 拼接
const c = true + '10' //'true10'
console.log('c=>', c)


/*-----   ==运算符      -----*/
console.log("100=='100'", 100 == '100')

console.log("0==''", 0 == '')

console.log("0 == false", 0 == false)

console.log("false == '' ", false == '')

console.log("null == undefined", null == undefined)


const obj = { x: 100 }
if (obj.a == null) { }
// 相当于：
if (obj.a === null || obj.a === undefined) { }


/*-----   if语句和逻辑运算      -----*/

const n = 100;
console.log('!n==>', !n)
console.log('!!n==>', !!n)

// falsely变量
console.log(!!0 === false)
console.log(!!NaN === false)
console.log(!!'' === false)
console.log(!!null === false)
console.log(!!undefined === false)
console.log(!!false === false)


// 逻辑判断
console.log(10 && 0)
console.log('' || 'abc')
// 这个直接跑node index.js命令是不行的，node里面没有window
console.log(!globalThis.abc)
// console.log (!window.abc)
