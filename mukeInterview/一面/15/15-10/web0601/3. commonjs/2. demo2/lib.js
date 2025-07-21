var counter = 3;
var numObj = {
  num: 3
}
function incCounter() {
  counter++;
  numObj.num++;
  return counter
}
module.exports = {
  counter: counter,
  numObj,
  incCounter: incCounter,
};
