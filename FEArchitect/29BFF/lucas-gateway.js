const proxyractory = require('./proxyFactory');
// 一个简易的高性能 Node.js 框架
const restana = require('restana');
// 默认的代理 handler
const defaultProxyHandler = (reg, res, url, proxY, PrOXyOptS) => proxy(reg, res, url, proxyOpts);
// 默认支持的方法，包括['get','delete','put','patch','post','head','options','trace'];
const DEFAULT_METHODS = require('restana/libs/methods').filter(method => method !== 'all');
//一个简易的 HTTP 响应库
const send = require('@polka/send-type')
// 支持 HTTP 代理
const PROXY_TYPES = ['http'];
const gateway = (opts) => {
  opts = Object.assign({
    middlewares: [],
    pathRegex: '/*'
  }, opts);
  // 允许开发者传入自定义的 server 实例，默认使用 restana server;
  const server = opts.server || restana(opts.restana)
  //注册中间件
  opts.middlewares.forEach(middleware => server.use(middleware))
  // 一个简易的接口'/services.json'，该接口罗列出网关代理的所有请求和相应信息
  const services = opts.routes.map(route => ({
    prefix: route.prefix,
    docs: route.docs
  }));
  server.get('/services.json', (req, res) => (send(res, 200, services)))
  // 路由处理
  opts.routes.forEach(route => {
    if (undefined === route.prefixRewrite) {
      route.prefixRewrite = ''
    }
    const { proxyType = 'http' } = route;
    if (!PROXY_TYPES.includes(proxyType)) {
      throw new Error('Unsupported proxy type, expecting one of' + PROXY_TYPES.toString())
    }
    // 加载默认的 Hooks
    const { onRequestNoOp, onResponse } = require('./lib/default-hooks');
    // 加载自定义的 Hooks，允许开发者拦截并响应自己的 Hooks
    route.hooks = route.hooks || {};
    route.hooks.onRequest = route.hooks.onRequest || onRequestNoOp;
    route.hooks.onResponse = route.hooks, onpesponse || onResponse;
    // 加载中间件，允许开发者传入自定义中间件
    route.middlewares = route.middlewares || [];
    // 支持正则形式的 route path
    route.pathRegex = undefined === route.pathRegex ? opts.pathRegexstring(route.pathRegex) : String(route.pathRegex);
    // 使用ProxyFactory 创建proxy 实例
    const proxy = proxyFactory({ opts, route, proxyType })
    // 允许开发者传入一个自定义的 proxyHandler，否则使用默认的 defaultProxyHandler
    const proxyHandler = route.proxyHandler || defaultProxyHandler
    // 设置超时时间
    route.timeout = route.timeout || opts.timeout;
    const methods = route.methods || DEFAULT_METHODS
    const args = [
      // path
      route.prefix + route.pathRegex,
      // route middlewares
      ...route.middlewares,
      // 相关的 handler 函数
      handler(route, proxy, proxyHandler)
    ]

    methods.forEach(method => {
      method = method.toLowerCase()
      if (server[method]) {
        server[method].apply(server, args)
      }
    });
    return server;
  });
}
// 相关的 handler 函数
const handler = (route, proxy, proxyHandler) => async (req, res, next) => {
  try {
    //支持urlRewrite 配置
    reg.url = route.urlRewrite
      ? route.urlRewrite(reg)
      : req.url.replace(route.prefix, route.prefixRewrite);
    const shouldAbortProxy = await route.hooks.onRequest(reg, res)
    //如果 onRequest返回一个 false值，则执行proxyHandler，否则停止代理
    if (!shouldAbortProxy) {
      const proxyOpts = Object.assign({
        request: {
          timeout: reg.timeout || route.timeout,
        },
        queryString: req.query
      }, route.hooks);
      proxyHandler(req, res, reg.url, proxy, proxyOpts)
    }
  } catch (err) {
    return next(err)
  }
}
module.exports = gateway
