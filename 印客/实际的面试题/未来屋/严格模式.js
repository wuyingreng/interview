'use strict';
// 1. 严格模式下给未声明的变量赋值是会错
a = 10;

var obj = { x: 1, x: 2 };
console.log('obj==>', obj);


function test(a,a){

}