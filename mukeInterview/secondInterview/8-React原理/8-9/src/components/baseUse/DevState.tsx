import { useState, useEffect } from 'react';

const AsyncUpdateDemo = () => {
  const [count, setCount] = useState(0);

  const [countMax, setCountMax] = useState(0);

  // useEffect(() => {
  //   // 定时器中尝试连续增加计数
  //   const timer = setInterval(() => {
  //     // ❌ 错误写法：闭包陷阱，永远基于初始 count=0
  //     // setCount(count + 1);

  //     // ✅ 正确写法：函数式更新获取最新值
  //     setCount(prev => prev + 1);
  //   }, 1000);

  //   return () => clearInterval(timer);
  // }, []); // 空依赖数组，effect 只运行一次

  const increment = () => {
    // ✅ 基于前一个值判断是否允许更新
    setCountMax(countMax + 1);
    console.log('if befor ==>', countMax);
    // 发现家了if函数就不会一直为0的情况
    if (countMax > 5) {
      console.log('if after==>', countMax);
    }
  };

  return (
    <div>
      <p>场景一计数器:Count: {count}</p>
      <p>（错误写法会卡在 1，正确写法正常递增）</p>
      <p>场景二基于前一个判断是否要停止</p>
      <p>{countMax}</p>
      <button onClick={increment}>Add (Max: 5)</button>
    </div>
  );
};

export default AsyncUpdateDemo