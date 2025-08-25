var a = { n: 1 }
var b = a
/**
 * 步骤1. 计算a.x 原地址1：{n:1},{n:1,x:待确定}
 * 步骤2. a = { n: 2 }
 * 给a一个新的地址2：{n:2}
 * 步骤3：a.x={n:2}
 * 
 * 或者
 * var temp = a; 
 * a = { n: 2 }
 * temp.x=a
 * 
 *  * */
a.x = a = { n: 2 } 
console.log('a.x==>',a.x) // undefined
console.log('b.x==>',b.x) // { n: 2 } 