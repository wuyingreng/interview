
// 这里全部小写
const queryString=require('node:querystring');

// 反序列化
console.log(queryString.parse('a=1&b=2'));


// 与urlSearchParams的不同.
console.log('queryString.parse==>',queryString.parse('?a=1&b=2'));

// 返回了一个new URLSearchParams('?a=1&b=2') 遍历器对象，也是个对象。typeof new URLSearchParams('?a=1&b=2')==='object'
console.log('new URLSearchParams==>',new URLSearchParams('?a=1&b=2'),typeof new URLSearchParams('?a=1&b=2'));


// 序列化 string+ify
console.log(queryString.stringify({a:1,b:2}));