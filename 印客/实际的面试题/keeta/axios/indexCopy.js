class Axios {
  constructor(config) {
    // 默认配置
    this.defaults = {
      baseURL: '',
      timeout: 10000,
      headers: {}
    }
    /**
     * 合并配置。这个会改变this.defaults的值
     * this.defaults+用户自定义的
    */
    Object.assign(this.defaults, config);

    // 拦截器
    this.interceptors = {
      request: {
        handlers: [],  // 存储拦截器
        use: function (fulfilled, rejected) {
          this.handlers.push(fulfilled, rejected);
          // 返回当前索引
          return this.handlers.length - 1;
        }
      },
      response: {
        handlers: [],  // 存储拦截器
        use: function (fulfilled, rejected) {  // 添加官方API方法
          this.handlers.push({ fulfilled, rejected });
          return this.handlers.length - 1;
        }
      }
    }
  }
  /**
   * 核心请求方法
   * @param {Object} config 请求配置
   */

  request(config) {
    // 1. 合并配置
    const mergedConfig = this._mergeConfig;
    // 2. 创建拦截器
    const chain = [this._dispatchRequest, undefined] // 初始链：[发送请求, undefined]
    // 3. 添加请求拦截器 （因为发送请求后面不需要错误处理，错误会传递到响应拦截器）
    this.interceptors.request.handlers.forEach((interceptor) => {
      // 每个拦截器对象拆成两个函数（成功处理函数和错误处理函数）放入链的前端
      chain.unshift(interceptor.fulfilled, interceptor.rejected)
    })
    // 4. 添加相应拦截器。每个拦截器对象拆成两个函数放入链的后端
    this.interceptors.response.handlers.forEach((interceptor) => {
      chain.push(interceptor.fulfilled, interceptor.rejected)
    })

    // 5. 创建初始Promise（携带配置）
    let promise = Promise.resolve(mergedConfig);

    // 6. 执行链式调用
    while (chain.length) {
      /**
       * then 接受2个参数，一个成功的回调，一个失败的回调。
       * shift 删除数组头部的元素，返回值是被删除的元素
      */
      promise = promise.then(chain.shift(), chain.shift())
    }
    return promise;
  }

  // 私有方法实际发送请求。不应该被外部直接调用
  _dispatchRequest(config) {
    return new Promise((resolve, reject) => {
      // 创建XHR对象
      const xhr = new XMLHttpRequest();

      // 处理超时
      if (config.timeout) {
        xhr.timeout = config.timeout;
        xhr.ontimeout = () => {
          xhr.abort();
          reject(new Error(`Timeout of ${config.timeout}ms exceeded`));
        };
      }

      // 新增：绑定 abort 事件监听 处理取消
      if (config.signal) {
        config.signal.addEventListener('abort', () => {
          xhr.abort();
          reject(new Error(config.signal.reason || 'Request canceled'));
        });
      }

      // 组装URL
      const url = config.baseURL + config.url;

      // 打开连接
      xhr.open(config.method || 'get', url, true);

      // 设置请求头
      Object.keys(config.headers).forEach(key => {
        xhr.setRequestHeader(key, config.headers[key]);
      });

      // 处理响应
      xhr.onreadystatechange = () => {
        if (xhr.readyState !== 4) return;

        const response = {
          data: xhr.response,
          status: xhr.status,
          statusText: xhr.statusText,
          headers: this._parseHeaders(xhr.getAllResponseHeaders()),
          config,
          request: xhr
        };

        // 状态码判断
        (xhr.status >= 200 && xhr.status < 300)
          ? resolve(response)
          : reject(response);
      };

      // 错误处理
      xhr.onerror = () => {
        reject(new Error('Network Error'));
      };

      // 发送请求
      xhr.send(config.data);
    });
  }
  // 解析响应头
  _parseHeaders(headers) {
    const result = {};
    headers.split('\n').forEach(line => {
      const [key, val] = line.split(':');
      if (key) result[key.trim()] = val.trim();
    });
    return result;
  }

  // 合并配置
  _mergeConfig(config) {
    return { ...this.defaults, ...config };
  }
  // 其他方法同理...
  //快捷方法
  get(url, config) {
    return this.request({ ...config, method: 'get', url })
  }
  post(url, data, config) {
    return this.request({ ...config, data, method: 'post', url })
  }
}

// 使用示例 ================================
const axios = new Axios({ baseURL: 'https://api.example.com', });

axios.interceptors.request.use((config) => {
  config.headers.Authorization = 'Before token123';
  return config;
})

axios.interceptors.response.use((response) => {
  // 自定义formData函数
  return formData(response)
}, (err) => {
  // 自定义错误
  return formData(err)
})


// 创建 AbortController
const controller = new AbortController();

axios.get('/data', {
  signal: controller.signal // 传递 signal
}).catch(err => {
  if (err.message.includes('canceled')) {
    console.log('请求已取消');
  }
});

// 取消请求
controller.abort('用户手动取消');

class AbortController {
  constructor() {
    // 这里要加this
    this.signal = {
      aborted: false,
      reason: undefined,
      onabort: null,
      addEventListenerL: (handler) => {
        this.signal.onabort = handler;
      },
      removeEventListener: () => {
        this.signal.onabort = null;
      }
    }
  }
  // 调用这个abort方法一定会强制再取消一次。改改reason
  abort(reason) {
    this.signal.aborted = true;
    this.signal.reason = reason;
    if (!this.signal.onabort) {
      this.signal.onabort();
    }
  }
}