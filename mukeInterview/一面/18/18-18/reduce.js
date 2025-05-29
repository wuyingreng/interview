
// 简单易理解，需要新定义一个变量
const sum = (arr) => {
  let res = 0;
  arr.forEach((item) => {
    res += item;
  })
  return res
}

const arr = [100, 20, 40]
sum(arr)
console.log('sum==>', sum(arr))