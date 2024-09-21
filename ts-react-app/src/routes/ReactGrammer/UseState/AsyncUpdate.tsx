import React, { useState } from 'react';

// 当用户快速点击按钮的时候才会体现区别
const App = () => {
  const [count, setCount] = useState(0);

  // 这个函数将模拟一个异步操作
  const simulateAsyncOperation = () => {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        console.log('simulateAsyncOperation set timeout==>')
        resolve();
      }, 1000); // 模拟 1 秒的延迟
    });
  };

  // 使用异步操作增加计数
  const incrementCount = async () => {
    console.log('Incrementing count...');

    // 这里会遇到闭包问题
    setTimeout(() => {
      // 直接使用 count，可能会导致问题
      console.log('enter count')
      setCount(count + 1); // 这里的 count 不是最新的
    }, 500);

    // 如果未解决闭包问题，考虑添加模仿异步操作
    await simulateAsyncOperation(); // 模拟异步操作
    console.log('Finished async operation. Current count:', count);
  };

  // 使用函数形式避免闭包问题
  const incrementCountCorrect = async () => {
    console.log('Incrementing count correctly...');

    setTimeout(() => {
      // 使用函数形式确保使用最新的 count
      setCount(prevCount => prevCount + 1); // 正确使用
    }, 500);

    await simulateAsyncOperation(); // 模拟异步操作
    console.log('Finished async operation. Current count:', count);
  };

  return (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={incrementCount}>Increment (Potential Closure Issue)</button>
      <button onClick={incrementCountCorrect}>Increment Correctly</button>
    </div>
  );
};

export default App;
