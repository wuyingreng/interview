/**
 * 1. 正常的object,array
 * 2. 循环引用
 * 3. map,set,date,regexp
 * 犯错的点：
 * 1. instanceof 总是会分开
 * 2. 每一个分支得return clone
 * 3. 这里的基本都可以用const 不需要用let
 */

const objA = { name: "A" };
const objB = { name: "B" };
objA.child = objB;  // objA 引用 objB
objB.parent = objA;  // objB 又引用 objA → 形成循环引用


const deepClone = (obj, hash = new WeakMap()) => {
  if (typeof obj === 'function') return obj;
  if (typeof obj !== 'object' || obj == null) return obj;
  if (hash.has(obj)) return hash.get(obj);
  if (obj instanceof Date) return new Date(obj);
  if (obj instanceof RegExp) return new RegExp(obj);
  if (obj instanceof Map) {
    const clone = new Map();
    obj.forEach((value, key) => {
      // 写错的地方
      clone.set(deepClone(key, hash), deepClone(value, hash));
    });
    return clone;
  }
  if (obj instanceof Set) {
    const clone = new Set();
    obj.forEach((value) => {
      clone.add(deepClone(value, hash));
    })
    return clone;
  }
  const clone = Array.isArray(obj) ? [] : {};
  hash.set(obj, clone)
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      clone[key] = deepClone(obj[key], hash)
    }
  }
  return clone;
}

const map = new Map();
map.set('a', 1);
map.set('b', 2);
map.set('c', 3);
const cloneMap = new Map();
map.forEach((value, key) => {
  cloneMap.set(value, key)
})
console.log('cloneMap==>', cloneMap)


const objtest = { a: 1, b: 2 };
const cloneObj = {};
for (let key in objtest) {
  if (objtest.hasOwnProperty(key)) {
    cloneObj[key] = objtest[key]
  }
}
console.log('cloneObj==>', cloneObj);

const dateTest = new Date('2025-07-23');

if (dateTest instanceof Date) {
  console.log(dateTest.getTime() === new Date(dateTest).getTime()) // true);
}



/** ---------------   执行深拷贝循环引用      ---------------*/
const clonedWeakMap = deepClone(objA);

/** ---------------   执行深拷贝特殊对象      ---------------*/
const originalDate = new Date('2023-01-01T00:00:00Z');
// 执行深拷贝
const clonedDate = deepClone(originalDate);
console.assert(clonedDate !== originalDate, "Date 引用地址检查失败");



// 创建原始正则表达式
const originalRegExp = /test/gi;

// 执行深拷贝
const clonedRegExp = deepClone(originalRegExp);

// 验证结果
console.assert(clonedRegExp instanceof RegExp, "RegExp 类型检查失败");
console.assert(clonedRegExp !== originalRegExp, "RegExp 引用地址检查失败");
console.assert(clonedRegExp.source === originalRegExp.source, "RegExp 表达式检查失败");
console.assert(clonedRegExp.flags === originalRegExp.flags, "RegExp 标志检查失败");



// 创建原始 Map（包含对象键和嵌套值）
const originalMap = new Map();
const keyObj = { id: 1 };
originalMap.set(keyObj, new Date());
originalMap.set("nested", new Map([[1, "a"]]));
const clonedMap = deepClone(originalMap);
// 验证结果
console.assert(clonedMap instanceof Map, "Map 类型检查失败");
console.assert(clonedMap !== originalMap, "Map 引用地址检查失败");
console.assert(clonedMap.size === originalMap.size, "Map 大小检查失败");

// 验证键深拷贝
const clonedKey = [...clonedMap.keys()][0];
console.assert(clonedKey !== keyObj, "Map 键深拷贝失败");
console.assert(clonedKey.id === keyObj.id, "Map 键值一致性检查失败");

// 验证嵌套 Map
const clonedNestedMap = clonedMap.get("nested");
console.assert(clonedNestedMap instanceof Map, "嵌套 Map 类型检查失败");
console.assert(clonedNestedMap.get(1) === "a", "嵌套 Map 值检查失败");