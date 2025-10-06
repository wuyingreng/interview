/**-------------  this作为普通函数      -------------*/
function fn1() {
  console.log(this)
}

fn1()// window
fnarrow = () => {
  console.log('fnarrow==>', this)
}
/**
 * 在全局对象中不能简单的声明匿名函数，要不就要函数自执行
 * 这个自执行函数就要多包一层
 *  ((function(){
 *  console.log('对象方法中普通函数的this',this);   
  *})())
*/

fn1()// window
fnarrow()
/**------------- 使用call,apply,bind      -------------*/
// call用来改变this的指向
fn1.call({ x: 100 })

// bind也是用来改变this的指向，但是bind会返回一个新的函数去执行
const fn2 = fn1.bind({ x: 200 })
fn2()//{x:200}

/**------------- 作为对象方法被调用 -------------*/
/**
 * setTimeout里面放普通函数的话，是window执行setTimeout，this是window
 * setTimeout里面箭头函数的话，继承外层最近的非箭头函数的this
*/
const zhangsan = {
  name: "张三",
  sayHi() {
    // 普通函数的this是调用方，zhangsan 调用了sayHi
    console.log('zhangsan 普通函数 sayHi this=>', this)
  },
  sayHi2: () => {
    /**
     * 箭头函数的this是上级作用域的this。zhangsan是对象字面量，不是块级作用域
     * zhangsan 定义在全局，所以this是window
    */
    // 
    console.log('zhangsan 箭头函数 sayHi this=>', this)
  },
  wait() {
    setTimeout(function () {
      // this===window
      console.log('zhangsan 普通函数 setTimeout 包裹在wait普通函数下面 this=>', this)

    })
  },
  wait2() {
    setTimeout(() => {
      // 箭头函数的this是上级作用域的this,也就是wait的this，就是zhangsan
      console.log('zhangsan 箭头函数 setTimeout 包裹在wait普通函数下面 this=>', this)
    })
  }
}
console.log(zhangsan.sayHi());
console.log(zhangsan.wait())
console.log(zhangsan.sayHi2());
console.log(zhangsan.wait2())

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