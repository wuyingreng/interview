import { useEffect, useState } from "react"

const ListDemo = () => {
    const [count, setCount] = useState(0)

    useEffect(() => {
        // count 初始值为 0
        /**
         * 同步状态下
         * 1. 首先setCount是异步更新的。
         * 你会发现console.log('1', count) console.log('2', count)
         * 返回的结果都是0，页面最后渲染为了1。说明先执行了console.log再去触发了setCount
         * 2. 更新前会被合并：两次setCount会被合并成为一次，页面的count最终会显示为1
         * 类似于Object.assign({},{count:1},{count:1})
        */
        // setCount(count + 1)
        // 这里要用个同步的代码，异步的比如fetch 这些看不出来效果的
        // console.log('1', count) // 0
        // setCount(count + 1)
        // console.log('2', count) // 0

        /**
         * 异步状态下：
         * 1. 首先setCount是异步更新的。和宏任务微任务联系起来
         * 你会发现console.log('3', count) console.log('4', count)
         * 返回的结果都是0，页面最后渲染为了1。说明先执行了console.log再去触发了setCount
         * 2. 更新前会被合并：两次setCount会被合并成为一次，页面的count最终会显示为1
         * 类似于Object.assign({},{count:1},{count:1})
        */

        setTimeout(() => {
            setCount(count + 1)
            console.log('3', count) // 2
        })
        setTimeout(() => {
            setCount(count + 1)
            console.log('4', count) // 3
        })
    }, [])
    return <p>{count}</p>
}

export default ListDemo
