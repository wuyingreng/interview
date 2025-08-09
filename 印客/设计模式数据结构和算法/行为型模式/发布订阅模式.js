// 发布订阅模式
const observers = [];

// 注册观察者
observers.push(A.update);
observers.push(B.next);
observers.push(C.change);
observers.push(D.init);
observers.push(E.buy);

getAddress().then((res) => {
  const address = res.address;
  observers.forEach((observer) => observer(address));
});

// 优化

// eventbus 事件总线

import { EventBus } from './event.js';

getAddress().then((res) => {
  const address = res.address;
  EventBus.emit('ADDRESS', address);
});

// A模块
import { EventBus } from './event.js';
const update = (address) => {
  //
};
EventBus.on('ADDRESS', update);

// B模块
import { EventBus } from './event.js';
const next = (address) => {
  //
};
EventBus.on('ADDRESS', next);

// C模块
import { EventBus } from './event.js';
const change = (address) => {
  //
};
EventBus.on('ADDRESS', change);

// D 模块
import { EventBus } from './event.js';
const init = (address) => {
  //
};

EventBus.on('ADDRESS', init);
