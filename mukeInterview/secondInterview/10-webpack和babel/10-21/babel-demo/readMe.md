1. npm init
2. 安装babel插件
 必备基础插件：npm i @babel/cli @babel/core @babel/preset-env --save-dev
3. 新建 .babelrc 不用.js 或者.json后缀
配置
```
{
    "presets": [
        "@babel/preset-env"
    ],
    "plugins": []
}

```
4. 直接执行npx babel src/index.js
编译后的结果如下
``` javascript
(base) xiangpeifang@XIANGPEIFANGDEMACBOOK-PRO babel-demo % npx babel src/index.js
"use strict";

var sum = function sum(a, b) {
  return a + b;
};


```