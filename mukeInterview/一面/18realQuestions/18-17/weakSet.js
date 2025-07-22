/**
 * weakset 弱引用,类数组的形式，防止内存泄露。
 * 只能是对象和符号的集合，它不能像 set 那样包含任何类型的任意值,
 * 因为是弱引用，没有forEach,size，只能有add,set,has
 * gc的机制不一定是及时的，需要手动操作。
*/

const weakSet = new WeakSet()

const weakSetFn = () => {
  const obj = { name: 'emily' }
  weakSet.add(obj)
}

weakSetFn()
// weakSet是弱引用，weakSetFn 执行完会清空weakSet
console.log('weakSet==>', weakSet)

const set = new Set();

const setFn = () => {
  const obj = { name: 'emily' }
  set.add(obj)
}

setFn()
// set是强引用，setFn 执行完还能看到有值
console.log('set==>', set)


const weakSet2 = new WeakSet()
const set2 = new Set()

const weakSetFn2 = () => {
  // 如果这个对象被其他强引用的地方用到了，也不清理
  const obj = { name2: 'emily' }
  weakSet2.add(obj)
  set2.add(obj)
}
console.log('weakSet2==>', weakSet2)
weakSetFn2()