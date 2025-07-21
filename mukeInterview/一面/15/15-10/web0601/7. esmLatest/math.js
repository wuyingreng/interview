var basicNum = 0;

var add = function (a, b) {
  return a + b;
}


var counter = 3;
var numObj = {
  num: 3
}
function incCounter() {
  counter++;
  numObj.num++;
  return counter
}




export {
  basicNum, add, counter,
  numObj,
  incCounter,
};

