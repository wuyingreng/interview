// 引入方式1：
/**
 * import语句可以导入commonjs规范的代码
 * import语句只能写在esm中
 * 
 * */
// import user  from './user.js';

// // 引入方式2：
/**
 * 
 * 导入CommonJS模块时，module.exports对象作为default导出。
 * 
 * */

import {default as user}from './user.js';
// // 引入方式3：

// import * as  user from './user.js';
console.log('user ==>',user)
