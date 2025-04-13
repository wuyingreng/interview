/**
 * 深拷贝的例子
*/
const obj1 = {
  age: 20,
  name: 'xxx',
  address: {
    city: 'beijing'
  },
  arr: ['a', 'b', 'c']
}
const objcopy = deepClone(obj1)
objcopy.address.city = 'shanghai';
objcopy.arr[0] = 'a1';
console.log(obj1.address.city)
console.log(obj1.arr[0])

function deepClone(obj = {}) {

  if (typeof obj !== 'object' || obj === null) {
    return obj
  }
  let result;
  if (obj instanceof Array) {
    result = []
  }
  result = {};
  for (let key in obj) {
    console.log('key==>', key)
    if (obj.hasOwnProperty(key)) {
      result[key] = deepClone(obj[key])
    }
  }
  return result
}
/**
* 测试undefined
*/
console.log('undefinedTest==>', deepClone(undefined))

/**
 * obj.hasOwnProperty(key):false的情况
*/

const parent = { parentKey: 'parentValue' };
const child = Object.create(parent)
child.childKey = 'childKey'
for (let key in child) {
  console.log('测试child.hasOwnProperty==>', key); // 输出：childKey, parentKey
  console.log(child.hasOwnProperty(key)); // 输出：true, false
}