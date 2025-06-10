const obj = {};

const fun = () => { };

const arr = []
Function.prototype.y = 'y';
Object.prototype.x = 'x'

console.log('fun.x==>', fun.x, 'fun.y==>', fun.y)


// 和遍历链表差不多
const myInstanceof = (left, right) => {
  let p = left;
  while (p) {
    if (p === right.prototype) {
      return true;
    }
    p = p.__proto__
  }
  return false
}