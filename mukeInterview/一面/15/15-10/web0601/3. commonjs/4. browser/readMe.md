# 目的
1. 把node.js语法转换为在浏览器环境下也可以跑的代码

# 步骤
1. 在browser目录下执行
``` shell
npx browserify ./js/src/app.js -o ./js/dist/bundle.js

```
2. 打开index.html 看到内容打印