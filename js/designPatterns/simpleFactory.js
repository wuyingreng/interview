function Factory(career) {
  function User(career, work) {
    this.career = career
    this.work = work
  }
  User.prototype.sayHi = function () {
    console.log('say hi')
  }
  let work;
  /**
   * 把switch语法看成一个函数。接受一个入参。每一个case就是一个if+return
   * 最后default就是一个else
  */
  switch (career) {
    case 'hr':
      work = ['招聘']
      return new User(career, work);
    case 'coder':
      work = ['写代码']
      return new User(career, work);
    default:
      return ''
  }
}

const hr = new Factory('hr');
console.log(hr, typeof hr)
const coder = new Factory('coder');
console.log(coder, typeof coder)