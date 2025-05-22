
function add(a, b) {
  return a + b
}

function mul(a, b) {
  return a * b
}

/***
 * 导出单个
 * 对应的引入单个：const add = require('./a');
 */
// module.exports = add;

/***
 * 导出多个
 * 对应的引入多个：const {add,mul} = require('./a');
 */
module.exports = {
  add,
  mul
};

