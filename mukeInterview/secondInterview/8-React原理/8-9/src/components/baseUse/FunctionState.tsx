import { useEffect, useState } from "react"

const FunctionState = () => {
  const [count, setCount] = useState(0)
  useEffect(() => {
    console.log('组件渲染了多少次==》')
    // count 初始值为 0
    /**
     * 1. 首先setCount是异步更新的。
     * 你会发现console.log('FunctionState1', count) console.log('FunctionState2', count)
     * 返回的结果都是0，页面最后渲染为了1。说明先执行了console.log再去触发了setCount
     * 2. 更新前不会被合并：页面最终显示为4很奇怪
     * 类似于Object.assign({},{count:1},{count:1})
    */
    setCount((preCount) => {
      console.log('FunctionStateInside preCount', preCount)
      return preCount + 1
    })
    console.log('FunctionState1', count) // 0
    setCount((preCount) => {
      console.log('FunctionStateInside preCount', preCount)
      return preCount + 1
    })
    console.log('FunctionState2', count) // 0
  },
    [])
  return <p>{count}</p>
}

export default FunctionState
