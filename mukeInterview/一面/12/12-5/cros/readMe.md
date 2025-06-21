1. 要用http://localhost:8011/client.html 去访问客户端代码
在cros folder下执行http-server -p 8011 
注意不是127.0.0.1这种。因为server.js里面的代码是
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8011')

2. node server.js 服务端代码被托管在端口3000下