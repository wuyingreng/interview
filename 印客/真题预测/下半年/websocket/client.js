const Websocket = require('ws');

const ws = new Websocket('ws://localhost:8000');


ws.on('open', () => {
  console.log('连接服务器成功');
  ws.send('Hello server');
});

ws.on('message', (message) => {
  console.log(`收到服务器消息: ${message}`);
});

ws.on('error', (error) => {
  console.log('连接错误:', error);
});

ws.on('close', () => {
  console.log('连接已关闭');
});


// ? https是全双工的吗？感觉不是吧


const path = [];
let times = 0
const a = () => {
  times++;
  if (times < 2) {
    path.push(1);
    console.log('path before==>', path, times)
    a();
    path.pop();
    console.log('path after==>', path, times)
  }

}