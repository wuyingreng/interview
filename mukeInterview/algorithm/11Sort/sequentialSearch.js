Array.prototype.search = function (target) {
  console.log(this)
  for (let i = 0; i < this.length; i++) {
    if (this[i] === target) {
      return i
    }
  }
  return -1
}

console.log([1, 2, 3, 5, 8].search(5))