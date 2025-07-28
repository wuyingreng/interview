
const set = new Set();
const setFn = () => {
  const obj = { name: 'emily' }
  set.add(obj)
}

// 执行完之后obj就会被清除，weakSet不会影响obj的清除
weakSetFn()
console.log('weakSet=>', weakSet)