// 第三步。fn执行完weakmap 里面的内容是空了，obj被销毁了
const weakmap = new WeakMap()
const fn = () => {
  let obj = { name: 'Emily' }
  weakmap.set(obj, 'emily')
}
fn()
console.log('weakmap==>', weakmap) // {} 有时候不是空，因为垃圾清理不是及时的