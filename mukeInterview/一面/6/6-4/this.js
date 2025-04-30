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
    /**
     * 箭头函数的this是上级作用域的this。zhangsan2是对象字面量，不是块级作用域
     * zhangsan2 定义在全局，所以this是window
    */
    // 
    console.log('zhangsan2 箭头函数 sayHi this=>', this)
  },
  sayHi2: function () {
    /**
     * 普通函数的this是调用方，zhangsan2 调用了sayHi2
    */
    // 
    console.log('zhangsan2 普通函数 sayHi2 this=>', this)
  },
  wait() {
    setTimeout(() => {
      // 箭头函数的this是上级作用域的this,也就是wait的this，就是zhangsan2
      console.log('zhangsan2 箭头函数 setTimeout 包裹在wait普通函数下面 this=>', this)
    })
  }
}

console.log(zhangsan2.sayHi());
console.log(zhangsan2.sayHi2());
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


/** ------------  嵌套箭头函数中的this ------------*/
/**
 * 一层层向上绑定到window对象
*/
const debounce = (fn, delay = 500) => {  // ① 外层箭头函数
  let timer = null;
  return () => {  // ② 返回的箭头函数
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {  // ③ setTimeout 里的箭头函数
      console.log('this==>', this);  // 这里的 this 是谁？
      fn();
    }, delay);
  };
};