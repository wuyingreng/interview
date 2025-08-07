(function (window) {
  let data = 'hello';
  function foo() {
    console.log("foo--", data)
  }
  function bar() {
    console.log("bar--", data)
    otherFn()
  }

  function otherFn() {
    console.log("otherFn--")
  }
  window.myModule = {
    foo,
    bar,
  }
})(window)