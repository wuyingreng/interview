var x = 5;
var addX = function (value) {
  return value + x;
};

// 写法一：命名导出
// 这里exports===module.exports
// 问题，为什么不能写成exports={
// }会无效
/**
 * exports={
// } 会无效。
* 因为export是module.export的引用
* export={}等于给export重新赋值。断开了和
* module.export的引用
*/

exports.x = x;
exports.addX = addX


// 写法二：默认导出一个对象
module.exports = {
  x, addX
}

//写法三：命名导出。这种写法其实是不规范的
module.exports.x = x;
module.exports.addX = addX;