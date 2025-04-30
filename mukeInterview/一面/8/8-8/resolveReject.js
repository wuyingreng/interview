const p1 = Promise.resolve().then(() => {
  return 100
});

console.log('p1==>', p1) // resolve 会触发后续then


const p2 = Promise.resolve().then(() => {
  throw new Error('then error')
}).then(() => {
  console.log('p2 then after throw error==>', p2)
}).catch(() => {
  console.log('p2 then catch throw error==>', p2)
})


console.log('p2==>', p2) // reject 会触发后续catch回调