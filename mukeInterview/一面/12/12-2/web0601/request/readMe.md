# 如何用
1. 去找对应的ajax/fetch/axios等文件夹下面的
data 目录下执行
``` shell
npx json-server  

```
相关的json数据就会被托管到服务器上
Index:
http://localhost:3000/

Static files:
Serving ./public directory if it exists

Endpoints:
http://localhost:3000/posts
http://localhost:3000/comments
http://localhost:3000/profile


2. 在浏览器上复制请求相关的代码
``` javascript


fetch('http://localhost:3000/posts')
  .then(res => res.json())
  .then(data => {
    console.log(data);
  })
  .catch(err => {
    console.log(err);
  });

```

可以看到打印的数据

## 3. axios 文件夹下的代码如何跑
1. axios目录下执行npm run request
2. 在node环境下跑
node test.js
返回了数据
 data: [ { id: '1', title: 'json-server', author: 'chenghuai' } ]
