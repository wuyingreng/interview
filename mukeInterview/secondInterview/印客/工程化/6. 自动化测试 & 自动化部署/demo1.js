// 演示1：exports 和 module.exports 的关系
console.log('=== 演示1：初始状态 ===');
console.log('module.exports === exports:', module.exports === exports);
console.log('module.exports:', module.exports);
console.log('exports:', exports);

// 修改 exports
exports.name = 'Alice';
console.log('\n=== 修改 exports 后 ===');
console.log('module.exports:', module.exports);
console.log('exports:', exports);

// 重新赋值 module.exports
module.exports = { age: 25 };
console.log('\n=== 重新赋值 module.exports 后 ===');
console.log('module.exports === exports:', module.exports === exports);
console.log('module.exports:', module.exports);
console.log('exports:', exports);

// 再次修改 exports
exports.height = 170;
console.log('\n=== 再次修改 exports 后 ===');
console.log('module.exports:', module.exports);
console.log('exports:', exports); 