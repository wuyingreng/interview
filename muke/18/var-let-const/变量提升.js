/** -----------  var 变量提升   -----------  */
// 1. var变量声明提升，变量赋值不提升
console.log('vara===>', vara)
var vara = 100;

// 相当于
var vara;
console.log('vara===>', vara)
vara = 100;

console.log('leta===>', leta)
/**
 * var-let-const.js:7 Uncaught ReferenceError: Cannot access 'leta' before initialization
 * at var-let-const.js:7:25
*/
let leta = 100;

