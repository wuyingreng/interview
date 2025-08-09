// 装饰器模式

// scene
// 小程序定义一个也没通过Page 传入配置对象进入
Page({
  data: { logs: [] },
  onLoad: function () {},
});

// 页面加载的时候上报一些自定义数据
// sendPV

// 装饰器模式
// 定义：一种动态的往一个类中添加新的行为的设计模式

// 优化

const Base = (option) => {
  const { onLoad, ...rest } = option;

  return {
    ...rest,
    onLoad(...args) {
      this.reportData(); // 上报数据

      if (typeof onLoad === 'function') {
        onLoad.call(this, ...args);
      }
    },
    reportData() {
      //上报数据
    },
  };
};

Page(
  Base({
    data: { logs: [] },
    onLoad: function () {},
  })
);

Page(
  Base(
    Test({
      data: { logs: [] },
      onLoad: function () {},
    })
  )
);

// Q: 装饰器模式vs代理模式

//

// 总结：
// 把对象和函数各个功能独立出来 降低之间的耦合性
