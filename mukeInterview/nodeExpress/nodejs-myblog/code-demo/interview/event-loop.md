# nodejs event loop

6 个阶段

- **timers** - 执行 `setTimeout` 以及 `setInterval` 的回调
- **I/O callbacks** - 处理网络、流、TCP 的错误回调
- **idle, prepare** - 闲置阶段，node 内部使用
- **poll** - 执行 poll 中的 I/O 队列，检查定时器是否到时间
- **check** - 存放 `setImmediate` 回调
- **close callbacks** - 关闭回调，例如 `Socket.on('close')`

执行宏任务之前，都要先执行完当前的微任务
