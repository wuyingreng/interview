import React, { useState, useRef, useEffect } from 'react'

function UseEffectChangeState() {
    const [count, setCount] = useState(0)

    /**
     * useRef方案
     * const countRef = useRef(0)
     * setCount(++countRef.current)
    */
    // 模拟 DidMount
    const countRef = useRef(0)
    console.log('countRef==>', countRef)
    useEffect(() => {
        console.log('useEffect...', count)

        // 定时任务
        const timer = setInterval(() => {
            console.log('setInterval...', count)
            // setCount((preC) => preC + 1)
            setCount(++countRef.current)
        }, 1000)

        // 清除定时任务
        return () => clearTimeout(timer)
    }, []) // 依赖为 []

    // 依赖为 [] 时： re-render 不会重新执行 effect 函数
    // 没有依赖：re-render 会重新执行 effect 函数

    return <div>count: {count} </div>
}

export default UseEffectChangeState
