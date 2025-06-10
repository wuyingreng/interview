/**
 * 属性
 * defaults 配置相关
 * interceptors 拦截器相关
 * 方法
 * request,_dispatchRequest
 * 核心要点：
 * interceptor:每次是放2个的
 * chain每次也是放2个
 * 处理也是每次处理2个
 * promise=promise.then(chain.shift(),chain.shift())
*/

class Axios {
  constructor(config) {
    // 默认配置
    this.defaults = {
      timeout: 10000,
      baseUrl: '',
      headers: {}
    }
    // 合并用户实例化的config和默认的config
    Object.assign(this.defaults, config);

    this.interceptors = {
      request: {
        handlers: [],
        use: function (fulfilled, rejected) {
          console.log('this==>', this)
          this.handlers.push(fulfilled, rejected);
          return this.handlers.length - 1
        },
        // 这次写不完了
        eject: function () {

        }
      },
      response: {
        handlers: [],
        use: function (fulfilled, rejected) {
          this.handlers.push(fulfilled, rejected);
          return this.handlers.length - 1
        },
        // 这次写不完了
        eject: function () {

        }
      },
    }
  }

  // 要有参数config,因为get/post是调用request方法
  request(config) {
    // 1. 合并配置
    const mergedConfig = this._mergeConfig(config);
    // 2. 创建拦截器链条
    const chain = [this._dispatchRequest(mergedConfig), undefined];
    // 2.1 添加请求拦截器
    this.interceptors.request.handlers.forEach((handler) => {
      chain.unshift(handler)
    })

    // 2.1 添加返回拦截器
    this.interceptors.response.handlers.forEach((handler) => {
      chain.push(handler)
    })

    // 创建初始的promise。这块忘记了，下次要记住下
    const promise = Promise.resolve(mergedConfig)

    // 3. 循环递归执行拦截器
    while (chain.length) {
      promise = promise.then(chain.shift())
    }
    return promise
  }
  // 私有方法发送实际的请求。这块有空可以多写几遍
  _dispatchRequest(config) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      // 处理取消请求
      if (config.timeout) {
        xhr.timeout = timeout;
        xhr.ontimeout = () => {
          // 超时了要取消请求
          xhr.abort
          reject('超时了');
        };
      }
      // 处理用户手动取消请求
      if (config.signal) {
        signal.addEventListener('abort', () => {
          xhr.abort();
          reject('用户取消了请求')
        })
      }
      const url = config.baseUrl + config.url;
      // 打开请求
      xhr.open(config.method, url);
      // 设置请求头
      Object.keys(config.headers).forEach((key) => {
        xhr.setRequestHeader(key, config.headers[key])
      });
      //处理响应
      xhr.onreadystatechange = () => {
        if (xhr.readyState !== 4) return;
        const response = {
          data: xhr.response,
          status: xhr.status,
          statusText: xhr.statusText,
          headers: this._parseHeaders(xhr.getAllResponseHeaders()),
          config,
          request: xhr
        }
        // 状态码判断。只要readyStateChange进来了，就不算网络错误
        if (xhr.status >= 200 && xhr.status < 300) {
          resolve(response)
        } else {
          reject(response)
        }
      }
      xhr.onerror = () => {
        reject(new Error('Network Error'));
      }
      // 这里的data是上面的resolve response里面来的
      xhr.send(config.data)
    })
  }
  // 解析响应头 待补充
  _parseHeaders(headers) {

  }
  get(url, config) {
    return this.request({ ...config, method: 'get' })
  }
  post(url, config, data) {
    return this.request({ ...config, data, method: 'post', url })
  }

}

const axios = new Axios({ baseUrl: 'https://api.example.com' });

axios.interceptors.request.use((config) => {
  config.headers.Authorization = 'xxx';
  // 这里要用return ,因为then函数链式调用的值来自于上一次返回的
  return config;
})

// 返回的interceptor 要指定错误处理函数。因为要处理结果了。
axios.interceptors.response.use((res) => {
  const transformRes = transFunc(res);
  return transformRes
}, (err) => {
  return err
})

// 取消请求：

const abortController = new AbortController();

axios.get('xxx', { signal: abortController.signal });

abortController.abort('用户取消操作')


class AbortController {
  constructor() {
    this.signal = {
      aborted: false,
      reason: null,
      onabort: null,
      addEventListener: (type, handler) => {
        this.signal.onabort = handler;
      },
      removeEventListener: () => {
        this.signal.onabort = null;
      }
    };
  }
  abort(reason) {
    this.signal.aborted = true;
    this.signal.reason = reason;
    if (this.signal.onabort) this.signal.onabort();
  }
};