/**
 * 思路：
 * 特殊情况汇总
 * 1. Todo: 函数
 * 2. 循环引用
 * 3. 其他数据类型
 * 
 * 普通情况
*/


const deepClone = (obj, hash = new WeakMap(), context) => {

  /***
   * 处理基本类型和函数类型
   * 函数类型直接返回原有的应用
   * 适用场景：函数无状态依赖、不需要隔离使用
   * 优点：零开销，保持完全一致性
   * 缺点：克隆后的函数与原函数共享引用
   * obj.bind({})这个也不好。直接改变了this的执行
   */

  // 这块再看吧
  if (typeof obj === 'function') {
    return obj.bind(context)
  }
  // 普通对象 或者数组
  if (typeof obj !== 'object' || obj === null) {
    return obj
  }
  /**
   * 循环引用:如果已记录过该对象，直接返回已拷贝的副本
  */
  // 

  if (hash.has(obj)) {
    return hash.get(obj)
  }
  // 初始化拷贝对象
  const clone = Array.isArray ? [] : {}
  hash.set(obj, clone) // 记录原对象和拷贝的映射

  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      clone[key] = deepClone(obj[key], hash)
    }
  }

  return clone

}

