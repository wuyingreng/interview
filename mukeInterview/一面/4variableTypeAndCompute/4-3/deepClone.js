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

/**
 * 
 * @param {Object} obj 
 * @returns 
 */
function deepClone(obj = {}) {
  // 判断obj是不是对象或者数组。要排除null,因为typeof null === 'object'
  /**
     * typeof obj 不是对象，或者是Null直接返回
     * typeof null === 'object';
     * typeof ['a','b']==='object';
     * typeof {object:11}==='object';
     * typeof undefined==='undefined';
    */
  if (typeof obj !== 'object' || obj == null) {
    return obj
  }
  // 初始化返回结果
  let result;
  if (obj instanceof Array) {
    result = []
  } else {
    result = {}
  }

  // 无论是对象还是数组都可以用for in 进行遍历
  for (let key in obj) {
    // 保证key不是原型的属性。这里的obj是个具体的对象 has own property.都是自己没有调用构造函数的写法
    if (obj.hasOwnProperty(key)) {
      // 递归调用
      result[key] = deepClone(obj[key])
    }
  }
  return result

}
