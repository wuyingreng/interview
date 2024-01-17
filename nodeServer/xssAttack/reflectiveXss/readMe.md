1. 为什么jsdom的引入方式是 const jsdom = require("jsdom");， node-fetch的引入方式是 import("node-fetch") 。都是在node环境下，为什么两者的引入方式不同？
jsdom 和 node-fetch 的引入方式不同是因为它们采用了不同的模块规范。

jsdom 是一个使用 CommonJS 模块规范的模块。在 Node.js 环境中，通常使用 require 关键字来导入 CommonJS 模块。

node-fetch 是一个使用 ECMAScript 模块规范的模块。ECMAScript 模块是一种在现代浏览器和最新版本的 Node.js 中使用的模块系统。在 ECMAScript 模块中，可以使用 import 关键字来导入模块。

尽管 node-fetch 在 Node.js 环境中使用 ECMAScript 模块规范，但是在示例中使用动态 import 是为了解决 fetch 函数未定义的问题。动态 import 允许在运行时异步加载模块，因此可以在 Node.js 环境中加载 node-fetch 模块并使用其中的 fetch 函数。这种方式可以在 Node.js 环境中模拟浏览器环境的 fetch 行为。

总结起来，jsdom 使用了 CommonJS 模块规范，因此使用 require 进行引入；node-fetch 使用了 ECMAScript 模块规范，但在示例中使用动态 import 是为了异步加载模块并解决 fetch 函数未定义的问题。
## 1.1 node-fetch报错
require() of ES Module /Users/xiangpeifang/work/nodeServer/xssAttack/reflectiveXss/node_modules/_node-fetch@3.3.2@node-fetch/src/index.js from /Users/xiangpeifang/work/nodeServer/xssAttack/reflectiveXss/client.js not supported.
# 2. how to run
2.1 node client.js
node server.js
# 3. 相关资料
res.setHeader("Content-Type", "text/html"); 是 Node.js 中设置 HTTP 响应头部的代码。这行代码的作用是告诉客户端，服务器将返回的内容类型是 HTML。

在 Node.js 的文档中，你可以在以下位置找到关于设置响应头部的信息：

在 http 模块的文档中，你可以找到有关 ServerResponse 对象的信息。ServerResponse 对象是 Node.js 中处理 HTTP 响应的对象。你可以在该文档中查找有关 setHeader 方法的详细信息。

参考链接：https://nodejs.org/dist/latest-v14.x/docs/api/http.html#http_class_http_serverresponse

在 http.ServerResponse 对象的文档中，你可以找到有关设置响应头部的更详细的信息。setHeader 方法用于设置 HTTP 响应头部的名称和值。

参考链接：https://nodejs.org/dist/latest-v14.x/docs/api/http.html#http_response_setheader_name_value