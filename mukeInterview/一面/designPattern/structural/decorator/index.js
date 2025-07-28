//根据场景，动态的往一个类/模块中新加内容的设计模式。主要用在小程序中
Page({
  data: {
    logs: []
  },
  onLoad: function () { }
});


// sendPv()
const SendPvPage = options => {
  const { onLoad, ...rest } = options;
  return {
    ...rest,
    onLoad(...args) {
      this.sendPvData();
      if (typeof onLoad === 'function') {
        onLoad.call(this, ...args)
        this.sendOnloadCompleted();
      }
    }
  }
}


Page(SendPvPage({
  data: {
    logs: []
  },
  Load: function () { }
}))