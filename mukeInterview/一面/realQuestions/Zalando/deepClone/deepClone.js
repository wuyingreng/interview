const objA = { name: "A" };
const objB = { name: "B" };
objA.child = objB;  // objA 引用 objB
objB.parent = objA;  // objB 又引用 objA → 形成循环引用


const deepClone = (obj, hash = new WeakMap()) => {
  /***
   * 对函数的处理。返回原对象适合90%的场景
   */
  if (typeof obj === 'function') return obj;



  // 循环引用1. 是判断是不是object,不是直接返回
  if (typeof obj !== 'object' || obj === null) return obj;

  // 循环引用2. hash是object，这个卸载后面
  if (hash.has(obj)) return hash.get(obj);


  // 处理特殊对象类型1:处理日期对象
  if (obj instanceof Date) {
    return new Date(obj);
  }
  // 处理特殊对象类型2:处理正则表达式对象
  if (obj instanceof RegExp) {
    return new RegExp(obj);
  }

  if (obj instanceof Map) {
    const clone = new Map();
    /**
     * 将原始Map对象和对应的克隆Map存入WeakMap中，用于解决循环引用问题
     * hash.set(obj, clone);这个不能写在玩，因为clone的类型不一样
    */
    hash.set(obj, clone);
    obj.forEach((value, key) => {
      /**
       * 对每个值进行递归深拷贝，并放入克隆Map中
       *  */
      clone.set(
        deepClone(key, hash),
        deepClone(value, hash)
      );
    });
    return clone;
  }

  if (obj instanceof Set) {
    const clone = new Set();
    hash.set(obj, clone);
    obj.forEach((value) => {
      clone.add(deepClone(value, hash))
    })
    return clone
  }


  const clone = Array.isArray(obj) ? [] : {}

  // 循环引用3. set要写在判断的后面
  hash.set(obj, clone);

  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      // 循环引用4. 复用的是一个hash weakMap，是增加了key
      clone[key] = deepClone(obj[key], hash)
    }
  }
  return clone
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