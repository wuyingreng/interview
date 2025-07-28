// 第二步。fn执行完obj还需要保存，因为fn执行完后外面的a还是可以获取到的

const a = {}
const fn = () => {
  let obj = { name: 'Emily' }
  a.obj = obj
}
fn()
console.log('a==>', a) // a==> { obj: { name: 'Emily' } }