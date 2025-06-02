const p1 = Promise.resolve(100)
console.log('p1', p1)
p1.then((data) => {
  console.log('data==>', data)
}).catch((err) => {
  // catch不会执行
  console.log('err==>', err)
})

const p2 = Promise.reject('err')
console.log('p2', p2)
p2.then((data) => {
  console.log('data2==>', data)
}).catch((err) => {
  // catch不会执行
  console.log('err2==>', err)
})

const p = (outP) => {
  return new Promise((resolve, reject) => {
    outP().then(resolve, reject)
  })
}

const outPromose = () => {
  return new Promise((resolve, reject) => {
    resolve(100)
  })
}
p(outPromose).then((res) => {
  console.log('p res==>', res)
})