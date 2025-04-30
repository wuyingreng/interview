function fn1(a, b, c) {
  console.log('this', this)
  console.log(a, b, c)
  return 'this is fn1'
}



Function.prototype.bind1 = function () {
  const args = Array.from(arguments);
  const t = args.shift();
  const self = this;
  return function () {
    return self.apply(t, args)
  }
}
fn1.bind1({ x: 300 }, 30, 30, 50)