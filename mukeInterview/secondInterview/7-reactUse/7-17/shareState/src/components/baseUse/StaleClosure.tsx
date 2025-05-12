import { useEffect, useState } from "react";


export const StaleClosure = () => {
  const [count, setCount] = useState(0);

  /**
 * 事件监听中的闭包陷进
 * 复现步骤：
 * 1. 点点击add按钮
 * 2. 在点击log按钮
 * 3. 再快速点击add按钮
 * 4. 会发现console.log的值和页面显示的count不一样
*/
  const handleClick = () => {
    setTimeout(() => {
      console.log(count); // 捕获的是点击时的 count 值
    }, 3000);
  };

  /**
   * 如果依赖数组（deps）未正确声明，闭包可能捕获旧值。
  */
  useEffect(() => {
    const timer = setInterval(() => {
      console.log(count); // ❌ 始终输出 0（闭包陷阱）
    }, 2000);
    return () => clearInterval(timer);
  }, []); // 空依赖数组，effect 只运行一次

  /**
   * BA Mobile中遇到的 target.includexxx的
   * 待补充
  */



  return (
    <div>
      <p>{count}</p>
      <button onClick={() => setCount(count + 1)}>Add</button>
      <button onClick={handleClick}>Log</button>
      <button onClick={() => setCount(count + 1)}>事件监听中的闭包陷进按钮</button>
    </div>
  );
}