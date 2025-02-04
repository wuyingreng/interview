const fastProxy = require('fast-proxy');
module.exports = ({ proxyType, opts, route }) => {
  let proxy = fastProxy({
    base: opts.targetOverride || route.target,
    http2: !!route.http2,
    ...(route.fastProxy)
  }).proxy
  return proxy;
}