const p1 = new Promise((resolve, reject) => {

})

console.log('p1==>', p1)

const p2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve()
  })
})

// 这里是同步任务，一开始打印的p2 是pending,后面才是resolved
console.log('p2==>', p2)

setTimeout(() => {
  console.log('setTimeout p2==>', p2) // resolved
})


const p3 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject()
  })
})

// 这里是同步任务，一开始打印的p2 是pending,后面才是rejected
console.log('p3==>', p3)

setTimeout(() => {
  console.log('setTimeout p3==>', p3) // rejected
})