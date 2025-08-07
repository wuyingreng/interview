// 演示2：正确的导出方式

// 方式1：只使用 module.exports
const user1 = {
  name: 'Emily',
  age: 25,
  height: 150
};
module.exports = user1;

// 方式2：只使用 exports（不重新赋值 module.exports）
// exports.name = 'Emily';
// exports.age = 25;
// exports.height = 150;

// 方式3：混合使用（推荐）
// module.exports = {
//     name: 'Emily',
//     age: 25
// };
// module.exports.height = 150; 