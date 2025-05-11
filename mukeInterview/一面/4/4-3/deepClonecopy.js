function deepClone(obj = {}) {
  if (typeof obj !== 'object' || obj === null) {
    return obj
  }
  let result;
  if (Array.isArray(obj)) {
    result = []
  } else {
    result = {}
  }
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      result[key] = deepClone(obj[key])
    }
  }
  return result
}

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
