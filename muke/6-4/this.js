/**-------------  this作为普通函数      -------------*/
function fn1() {
  console.log(this)
}

fn1()// window
fnarrow = () => {
  console.log('fnarrow==>', this)
}

fn1()// window
fnarrow()
/**------------- 使用call,apply,bind      -------------*/
// call用来改变this的指向
fn1.call({ x: 100 })

// bind也是用来改变this的指向，但是bind会返回一个新的函数去执行
const fn2 = fn1.bind({ x: 200 })
fn2()//{x:200}

/**------------- 作为对象方法被调用 -------------*/

const zhangsan = {
  name: "张三",
  sayHi() {
    // this 即当前对象
    console.log('zhangsan 普通函数 sayHi this=>', this)
  },
  wait() {
    setTimeout(function () {
      // this===window
      console.log('zhangsan 普通函数 setTimeout 包裹在wait普通函数下面 this=>', this)

    })
  }
}
console.log(zhangsan.sayHi());
console.log(zhangsan.wait())
const zhangsan2 = {
  name: "张三",
  sayHi: () => {
    // 箭头函数的this是上级作用域的this
    console.log('zhangsan2 箭头函数 sayHi this=>', this)
  },
  wait() {
    setTimeout(() => {
      // 箭头函数的this是上级作用域的this,也就是wait的this，就是zhangsan2
      console.log('zhangsan2 箭头函数 setTimeout 包裹在wait普通函数下面 this=>', this)
    })
  }
}

console.log(zhangsan2.sayHi());
console.log(zhangsan2.wait())

/**------------- 类 -------------*/

class People {
  constructor(name) {
    this.name = name;

  }
  sayHi() {
    console.log('类中的this=>', this)
  }
}

const zhangsanshili = new People('zhangsan');
zhangsanshili.sayHi()