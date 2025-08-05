var counter = 3;
var numObj = {
  num: 3
}
function incCounter() {
  counter++;
  numObj.num++;
  return counter
}
// 默认导出一个对象 要加=

module.exports = {
  counter,
  numObj,
  incCounter,

}
