/**
 * 需求是什么：
 * const obj = {
  foo: {
    bar: {
      baz: 'Hello, World!'
    }
  }
}
  set(obj, 'foo.bar.baz', 'New Value');
  运用到的知识点，对象引用地址传递
  没有要设置
*/

// 对象的引用地址传递。
const set = (obj, path, val) => {

  const keys = path.split('.');
  // 很像链表了，obj 是链表，current是指针
  let current = obj;
  // 要少一位


  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i];
    if (!current[key]) {
      current[key] = {}
    }
    current = current[key];
  }
  current[keys[keys.length - 1]] = val
}
const obj = {
  foo: {
    bar: {
      baz: 'Hello, World!'
    }
  }
}
set(obj, 'foo.bar.baz', 'New Value');
console.log('obj==>', obj)

/**
 * 短路的话，怎么办？？？用默认值
*/

const get = (obj, path, defaultValue) => {
  let current = obj;
  const keys = path.split('.');
  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i]
    if (!current[key]) {
      return defaultValue
    }
    current = current[key]
  }
  return current[keys[keys.length - 1]]
}
console.log(get(obj, 'foo.bar.baz', 33))

