# 如何跑
1. 在terminal执行node server.js
2. 用另外一个terminal执行node client.js

# 心跳包的代码解释
1. 初始状态，刚建立连接 alivet=true
``` javascript
  // 1. 一开始建立连接，alive状态为true
  ws.alive = true;

```
2. 每30秒检查一次

``` javascript

  // 定时检查客户端连接状态
  const interval = setInterval(() => {
    // 2. 30秒之前的客户端还没有返回pong事件的话，服务端断开连接。后面的代码就不执行了
    if (ws.alive === false) {
      console.log('客户端心跳超时，断开连接');
      clearInterval(interval);
      ws.terminate();
      return;
    }
    // 3. 如果当前还活跃就先把它置 false。
    ws.alive = false;
    // 4.  向客户端发送ping
    ws.ping();
  }, 30000); // 30秒检查一次


```
3. 如果客户端还活跃的话
``` javascript
function heartbeat() {
  this.alive = true;
}
ws.on('pong', heartbeat);

```
heartbeat 代码就会执行，ws.alive就会为true
是ws调用的heartbeat,所以this 是ws

4. 如果客户端不活跃的话
``` javascript
  // 定时检查客户端连接状态
  const interval = setInterval(() => {
    // 2. 30秒之前的客户端还没有返回pong事件的话，服务端断开连接。后面的代码就不执行了
    if (ws.alive === false) {
      console.log('客户端心跳超时，断开连接');
      clearInterval(interval);
      ws.terminate();
      return;
    }
    // 3. 如果当前还活跃就先把它置 false。
    ws.alive = false;
    // 4.  向客户端发送ping
    ws.ping();
  }, 30000); // 30秒检查一次

```
又会进入到这个interval中，直接断开连接不会再检测心跳了

# 语法
1. server.js是外层包裹了一层wss 里面和client.js一样
2. on是监听事件，
ping(),
send 是发送事件

# 广播事件的理解
``` javascript
function broadcastMessage(message) {
  // 遍历所有已连接的客户端的线
  wss.clients.forEach((wsConnection) => {
    // 检查连接是否处于开放状态
    if (wsConnection.readyState === wsConnection.OPEN) {
      // 向这个客户端发送消息
      wsConnection.send(message);
    }
  });
}

```
wss：服务端总机
wss.clients：所有的连向客户端的连接线
wsConnection：通过这个链接线向这个客户端发送消息
