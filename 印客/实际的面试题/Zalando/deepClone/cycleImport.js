// 示例1：对象互相引用
const objA = { name: "A" };
const objB = { name: "B" };
objA.child = objB;  // objA 引用 objB
objB.parent = objA;  // objB 又引用 objA → 形成循环引用

// 示例2：对象引用自身
const objSelf = { name: "Self" };
objSelf.self = objSelf; // 自身循环引用




function naiveDeepClone(obj) {
  if (typeof obj !== "object" || obj === null) return obj;
  const clone = Array.isArray(obj) ? [] : {};
  for (const key in obj) {
    clone[key] = naiveDeepClone(obj[key]);
  }
  return clone;
}
/**
 * Uncaught RangeError: Maximum call stack size exceeded
  *  at Array.isArray (<anonymous>)
*/
// const cloned = naiveDeepClone(objA);

function deepClone(obj, hash = new WeakMap()) {
  if (obj === null || typeof obj !== "object") return obj;

  // 如果已记录过该对象，直接返回已拷贝的副本
  if (hash.has(obj)) return hash.get(obj);

  // 初始化拷贝对象
  const clone = Array.isArray(obj) ? [] : {};
  hash.set(obj, clone); // 记录原对象和拷贝的映射

  // 递归拷贝所有属性
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      clone[key] = deepClone(obj[key], hash);
    }
  }

  return clone;
}

const clonedWeakMap = deepClone(objA); // 正常完成拷贝
console.log(clonedWeakMap.child.parent === clonedWeakMap); // true（保持引用关系）