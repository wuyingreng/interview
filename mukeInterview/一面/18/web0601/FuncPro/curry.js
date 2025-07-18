const add = (a, b, c) => { return a + b + c };

const fn2 = (a) => b => a + b;

// 学习curry化的过程中，先不要把this加进去。一个个理解
/**
 * 1. 接收一个函数，返回一个函数
*/
const curry = (fn) => {
  const argsLength = fn.length;
  const params = []
  const partial = (...args) => {
    params.push(...args);
    if (params.length >= argsLength) {
      return fn(...params)
    } else {
      return partial
    }
  }
  return partial
}

const curriedAdd = curry(add);
console.log(typeof curriedAdd)
console.log(curriedAdd(1)(2, 3), add(1, 2, 3))

/**----------------  curry化运用在请求中   ---------------- */
// //http.js
// export default (url, params) => fetch(url, params)
// // apis.js
// import http from './http'

// const curryHttp = (fn, presetParams) => {
//   return (nextParams) => {
//     return fn(presetParams, nextParams)
//   }
// }

// export const fetchList = curryHttp(http, '/api/getList')
// export const fetchItem = curryHttp(http, '/api/getItem')
// // 业务代码
// fetchList({ page: 1 }).then(res => { console.log(res) })

// // 不curry如果做fetchList
// const fetchListNoCurry = (url, params) => {
//   fetch(url, params)
// }


// 普通函数
const log = (level, message) => console.log(`[${level}] ${message}`);

// 柯里化后
// const curryLog = level => message => console.log(`[${level}] ${message}`);

const curryLog = (level) => {
  return (msg) => {
    log(level, msg)
  }
}
const logInfo = curryLog('Info');
const logError = curryLog('Error');
console.log('logInfo 1', logInfo('第一次logInfo'));
console.log('logInfo 2', logInfo('第二次logInfo'));

console.log('logInError 1', logError('第一次logError'));
console.log('logInError 2', logError('第二次logError'));
// const infoLog = curryLog("INFO"); // 固定 level 参数
// infoLog("User logged in"); // [INFO] User logged in
// infoLog("Data saved");     // [INFO] Data saved

/**----------------  curry化 point free   ---------------- */
const strNum = ['01', '10', '110'];
strNum.map((value) => parseInt(value, 2)).map((value) => value.toString(16));

const toBinary = (value) => parseInt(value, 2);
const toString16 = (value) => value.toString(16);
const toHex = strNum.map(toBinary).map(toString16);


const pipe = (...fns) => {
  return (x) => {
    console.log('x==>', x)
    // x是要处理的元素。先让第一个函数处理再把值给第二个函数处理
    return fns.reduce((acc, cur) => {
      console.log('acc==>', acc, 'cur(acc)', cur(acc))
      return cur(acc)
    }, x)
  }
};


strNum.map(pipe(toBinary, toString16))