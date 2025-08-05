// 观察者模式 - 外卖网站场景

// 1. 定义观察者对象（被观察的对象）
const A = {
  name: '地址组件',
  update(address) {
    console.log(`${this.name}: 更新地址具体位置 - ${address}`);
  }
};

const B = {
  name: '商家页面',
  next(address) {
    console.log(`${this.name}: 渲染商家页面 - ${address}`);
  }
};

// 5. 完整的发布订阅模式实现
console.log('\n=== 完整的发布订阅模式实现 ===');

class EventBus {
  constructor() {
    this.events = {};  // 存储所有事件和对应的观察者
  }

  // 订阅事件
  on(eventName, callback) {
    if (!this.events[eventName]) {
      this.events[eventName] = [];  // 如果事件不存在，创建空数组
    }
    this.events[eventName].push(callback);  // 添加观察者
    console.log(`订阅事件: ${eventName}`);
  }

  // 发布事件
  emit(eventName, data) {
    if (this.events[eventName]) {
      console.log(`发布事件: ${eventName}, 数据: ${data}`);
      this.events[eventName].forEach((callback, index) => {
        console.log(`执行观察者 ${index + 1}:`);
        callback(data);  // 执行每个观察者
      });
    }
  }

  // 取消订阅
  off(eventName, callback) {
    if (this.events[eventName]) {
      const index = this.events[eventName].indexOf(callback);
      if (index > -1) {
        this.events[eventName].splice(index, 1);  // 移除观察者
        console.log(`取消订阅: ${eventName}`);
      }
    }
  }
}

// 使用完整的发布订阅模式
const eventBus = new EventBus();

// 订阅地址更新事件
eventBus.on('addressUpdate', (address) => A.update(address));
eventBus.on('addressUpdate', (address) => B.next(address));

// 测试完整模式
setTimeout(() => {
  console.log('\n测试完整的发布订阅模式...');
  const testAddress2 = '广州市天河区珠江新城';
  eventBus.emit('addressUpdate', testAddress2);
}, 3000); 