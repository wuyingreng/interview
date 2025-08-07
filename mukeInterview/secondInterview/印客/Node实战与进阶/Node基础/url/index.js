const {URL}=require('url');

;


const url=new URL('https://user:pass@sub.example.com:8080/p/a/t/h?query=string&shouldDelete=true#hash');

console.log('URL===>',url);

console.log('URL===>',url.pathname='abc');


console.log('after URL===>',url,url.toString());


// 对searchParams进行增删改查
// ? 可以对set方法再研究下
console.log('URL searchparams set===>',url.searchParams.set('query','stringEmily'));
console.log('URL searchparams set===>',url.searchParams.set('hello','world'));
console.log('URL searchparams get===>',url.searchParams.get('query'));
console.log('URL searchparams append===>',url.searchParams.append('name','Emily'));
console.log('URL searchparams delete===>',url.searchParams.delete('shouldDelete'));

console.log('after URL===>',url,url.toString());