import { useState, useRef, useEffect } from 'react'

function UseEffectChangeState() {
    const [count, setCount] = useState(0)
    const countRef = useRef(0)

    useEffect(() => {
        setCount(++countRef.current)
        return () => {
            console.log('可以看到componentwillmount不停的执行')
        }
    }, [count,]) // 依赖为 []

    // 依赖为 [] 时： re-render 不会重新执行 effect 函数
    // 没有依赖：re-render 会重新执行 effect 函数和return函数

    return <div>count: {count} </div>
}

export default UseEffectChangeState
