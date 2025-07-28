// 第一步。fn执行完obj就会被垃圾回收。因为obj是函数作用域的，函数执行完不需要了
const fn = () => {
  let obj = { name: 'Emily' }
}
fn()


