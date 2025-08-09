从定白工
// scene
// 外卖网站
getAddress().then((res) => {

  const address = res.address;
  A.update(address);  //更新地址具体位置
  B.next(address);//渲染商家页面
  C.change(address);// 修改订单
  D.init(address);
  // 优化
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
})