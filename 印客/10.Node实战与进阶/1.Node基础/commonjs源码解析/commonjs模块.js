
// 这些属性是可以直接访问的
console.log('__dirname==>',__dirname);
console.log('__filename==>',__filename);

exports = module.exports = {a : 1, b : 2};
exports.c = 3;

console.log(require.main);

/**
* 这些是内置的：
* 查看当前模块被包裹后的内容
/* 输出：
    function (exports, require, module, __filename, __dirname) {
        module file content
    }
*/
*/
