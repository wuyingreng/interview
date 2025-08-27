const Websocket = require('ws');

const wss = new Websocket.Server({ port: 8000, host: 'localhost' });
function broadcastMessage(message) {
  // 遍历所有已连接的客户端
  wss.clients.forEach((wsConnection) => {
    // 检查连接是否处于开放状态
    if (wsConnection.readyState === wsConnection.OPEN) {
      // 向这个客户端发送消息
      wsConnection.send(message);
    }
  });
}

/**
 * 5. 客户端会自动发送pong事件，如果服务端监听到了就会把this.alive=true.
 * 如果没有就是this.alive=false. 下次检查的时候，服务端就会关闭连接
*/

function heartbeat() {
  this.alive = true;
}

wss.on('connection', (ws) => {
  console.log('客户端连接成功');
  // 1. 一开始建立连接，alive状态为true
  ws.alive = true;
  ws.on('pong', heartbeat);

  // 定时检查客户端连接状态
  const interval = setInterval(() => {
    // 2. 每30秒检查下客户端还活不活跃。不活跃就断开连接。
    if (ws.alive === false) {
      console.log('客户端心跳超时，断开连接');
      clearInterval(interval);
      ws.terminate();
      return;
    }
    // 3. 如果当前还活跃就先把它置为不活跃
    ws.alive = false;
    // 4.  向客户端发送ping
    ws.ping();
  }, 30000); // 30秒检查一次

  // 连接关闭时清理定时器
  ws.on('close', () => {
    clearInterval(interval);
  });
  ws.on('message', (message) => {
    console.log(`收到消息: ${message}`);
    ws.send(`server ${message}`);
    broadcastMessage(`server 广播的消息 ${message}`);
  });
  ws.on('error', (message) => {
    console.log('客户端报错了');
  });
  ws.on('close', (message) => {
    console.log('客户端关闭了链接');
  });
});


