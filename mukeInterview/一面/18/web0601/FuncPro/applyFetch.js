


// 1. 请求 基础函数
const req = (url, params, options) => {
  //1.做中间 axios 美截器封装 reqInterceptor resInterceptor
  // 2.进行异常请求的捕获
}

// 2. 划分模块，不完全调用
const myReq = (options) => req(url, params, options);

const freeshipping = myReq({ option: 'freeshipping' });
const voucher = myReq({ option: 'voucher' });

// 3. 具体API的封装
const getBusiness1List = curry(freeshipping, '/api/getList');
const getBusiress1Item = curry(freeshipping, '/api/getItem');
const getBusiness2List = curry(voucher, '/api/getList');
const getBusiness2Item = curry(voucher, '/api/getItem')


// 4.具体请求的输入输出的约束
const checkNull = (fn) => (params) => {
  if (params === null) {
    throw new Error('params is null')
  }
  return fn(params)
}
const checkId = (fn) => (params) => {
  if (params.id === undefined) {
    throw new Error('params.id is undefined')

  }
  return fn(params)
}

//5.业务过程中的逻辑校验
const toGetList = pipe(checkNull, checkId, getBusiness1List);
const toGetItem = pipe(checkId, getBusiress1Item);

/**------------------  你在实际业务中用到的    ------------------*/

const freeLog = (url, params) => {
  log('freeshipping', url, params)
}
freeLog('/btncClick', { type, click });
freeLog('/urlRedirect', { type, redirect })
// 否则的话要写成
log('freeshipping', '/btncClick', { type, click })
log('freeshipping', '/urlRedirect', { type, click })
