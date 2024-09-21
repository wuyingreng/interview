import { useState } from 'react';


export const BatchUpdates = () => {
  const [count, setCount] = useState(0)
  const [count1, setCount1] = useState(0)
  const [count2, setCount2] = useState(0)
  const syncClick = () => {
    setCount(count + 1)
    setCount(count + 1)
    setCount(count + 1)
  }

  const asyncClick = () => {
    setTimeout(() => {
      setCount1(count1 + 1)
      setCount1(count1 + 1)
      setCount1(count1 + 1)
    })
  }

  // 在页面上只能看到一次渲染，最后变成了3
  const funcClick = () => {
    setTimeout(() => {
      setCount2((preCount) => preCount + 1)
      setCount2((preCount) => preCount + 1)
      setCount2((preCount) => preCount + 1)
    })
  }
  return <>
    <div onClick={syncClick}>同步任务：batch update for {count} </div>
    <div onClick={asyncClick}>异步任务：batch update for 外层包裹setTimeout {count1} </div>
    <div onClick={funcClick}>函数式更新 {count2} </div>
  </>
}

export default BatchUpdates