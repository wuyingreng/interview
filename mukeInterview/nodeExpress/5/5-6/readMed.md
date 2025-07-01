# 执行步骤
## 拆分思路
bin/www.js:基本的server相关的技术
app.js:业务层面的，业务代码



## 进阶下
1. 用淘宝镜像下载包nodemon cross-env
npm i nodemon cross-env --save-dev --registry https://registry.npmmirror.com

2. 通过npm run dev 运行
nodemon 只是会自动重启node，可以看到terminal变化如下
``` shell
[nodemon] 3.1.10
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): *.*
[nodemon] watching extensions: js,mjs,cjs,json
[nodemon] starting `node ./bin/www.js`
[nodemon] restarting due to changes...
[nodemon] starting `node ./bin/www.js`
[nodemon] restarting due to changes...
[nodemon] starting `node ./bin/www.js`
[nodemon] restarting due to changes...
[nodemon] starting `node ./bin/www.js`
[nodemon] restarting due to changes...
[nodemon] starting `node ./bin/www.js`
[nodemon] restarting due to changes...
[nodemon] starting `node ./bin/www.js`

```
但是为了看到效果，浏览器还是需要重新刷新。
这个和自动刷新机制和热更新机制是分开的

3. 在localhost:8000/url
可以看到不同的返回
4. postman
账号：414615448@qq.com
访问路径：
http://localhost:8000/api/blog/list