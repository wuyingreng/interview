// 客户端发送HTTP请求到服务端，传递参数
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

// 创建一个虚拟的DOM环境
const dom = new JSDOM(`<!DOCTYPE html><body></body>`);
global.document = dom.window.document;



const parameter = "example";
import("node-fetch")
  .then(fetch => fetch.default(`http://localhost:3000?param=<script>alert(111)</script>`))
  .then(response => response.text())
  .then(html => {
    console.log('html==>', html)
    // 将返回的HTML插入到页面中
    document.body.innerHTML = html;
  })
  .catch(error => console.error(error));
