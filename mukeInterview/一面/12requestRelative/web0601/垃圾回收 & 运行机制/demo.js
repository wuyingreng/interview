// 1. 闭包

function fn() {
  const test = new Array(10000000).fill(1);
  return function () {
    console.log(test.length);

    return test.length; // marked！
  };
}

const fn2 = fn();

fn2();

fn2 = null;

// 2. 全局变量
function fn3() {
  test = new Array(10000000).fill(1);
}

test = null

// 3. 定时器

const intervalId = setInterval(() => {
  const test = new Array(10000000).fill(1);
  console.log('test')
}, 1000)

clearInterval(intervalId)

// 4. 事件监听器
mounted() {
  window.addEventListener('scroll', this.handleScroll)
}

beforeDestroy() {
  window.removeEventListener('scroll', this.handleScroll)
}

useEffect(() => {
  window.addEventListener('scroll', this.handleScroll)

  return () => {
    window.removeEventListener('scroll', this.handleScroll)
  }
}, [])

// 5. Map Set Object

const map = new Map()

const set = new Set()

const obj = {}

WeakMap()
WeakSet()


let setTimeoutCallBack = function () {
  console.log('我是定时器回调');
};
let httpCallback = function () {
  console.log('我是http请求回调');
}

// 同步任务
console.log('我是同步任务1');

// 异步定时任务
setTimeout(setTimeoutCallBack, 1000);

// 异步http请求任务
ajax.get('/info', httpCallback);

// 同步任务
console.log('我是同步任务2');

function test() {
  console.log(1)
  setTimeout(function () { 	// timer1
    console.log(2)
  }, 1000)
}

test();

setTimeout(function () { 		// timer2
  console.log(3)
})

new Promise(function (resolve) {
  console.log(4)
  setTimeout(function () { 	// timer3
    console.log(5)
  }, 100)
  resolve()
}).then(function () {
  setTimeout(function () { 	// timer4
    console.log(6)
  }, 0)
  console.log(7)
})

console.log(8)

  - 宏任务
  - 同步
  - 定时器
  - setTimout 1000ms
    - setTimeout 0ms
      - setTimeout 100ms
        - setTimeout 0ms
          - 事件触发线程
          - 微任务

1 4 8 7 3 6 5 2




console.log('stack[1]');
setTimeout(() => console.log("macro[2]"), 0);
setTimeout(() => console.log("macro [3]"), 1);
const p = Promise.resolve();
for (let i = 0; i < 3; i++) {
  p.then(() => {
    setTimeout(() => {
      console.log('stack [4]');
      setTimeout(() => console.log("macro[5]"), 0);
      p.then(() => console.log('micro [6]'));
    }, 0);
    console.log("stack [7]")
  });
}

console.log("macro [8]");