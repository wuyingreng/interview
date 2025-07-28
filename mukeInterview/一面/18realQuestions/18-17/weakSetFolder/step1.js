
const weakSet = new WeakSet();
const weakSetFn = () => {
  const obj = { name: 'emily' }
  weakSet.add(obj)
}

// 执行完之后obj就会被清除，weakSet不会影响obj的清除
weakSetFn()
console.log('weakSet=>', weakSet)