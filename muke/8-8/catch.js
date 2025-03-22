const p3 = Promise.reject('my error').catch((err) => {
  console.log('error==>', err)
})
p3.then(() => {
  console.log('p3 then after catch')
})
console.log('p3==>', p3)// resolved !! 触发then回调

const p4 = Promise.reject('my error').catch((err) => {
  console.log('error==>', err)
  throw new Error('error after catch')
})
p4.then(() => {
  console.log('p4 then after catch')
})
p4.catch(() => {
  console.log('p4 catch after catch and error')
})
console.log('p4==>', p4) //rejected 触发catch回调