let myModule = {
  data: 'hello',
  foo() {
    console.log(this.data)
  },
  bar() {
    console.log('bar', this.data)
  }
}

myModule.data = 'yinkemy'
myModule.foo()