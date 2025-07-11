import { useEffect, useState } from "react"

const ListDemo = () => {
    const [count, setCount] = useState(0)

    useEffect(() => {
        console.log('进入子组件')
        /**
         * count 初始值为 0
         * 四个count+1会被合并成一个。只执行一次count+1,所以count:1
         * setState是异步的，所有的console.log都会在count改变前执行
         * Todo:发现一个很奇怪的问题，每次点击保存这个文件，这个count会加1。
         * useEffect搭配空数组不是进入这个组件才执行一次吗
         * */
        console.log('进入子组件');
        setCount(count + 1);
        setCount(count + 1);

        // 保存定时器 ID
        const timer1 = setTimeout(() => {
            setCount(count + 1);
            console.log('3', count);
        }, 500);

        const timer2 = setTimeout(() => {
            setCount(count + 1);
            console.log('4', count);
        }, 500);

        // 清理函数：组件卸载时清除定时器
        return () => {
            clearTimeout(timer1);
            clearTimeout(timer2);
        };
    }, [])
    return <p>{count}</p>
}

export default ListDemo
