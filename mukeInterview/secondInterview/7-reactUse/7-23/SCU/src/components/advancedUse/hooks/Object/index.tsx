import { useCallback, useMemo, useState } from "react";
import ChildComponent from "./Child";

const ParentComponent = () => {
    const [count, setCount] = useState(0);

    // 缓存对象
    const data = useMemo(() => ({ value: '固定值' }), []);

    // 缓存函数
    const handleClick = useCallback(() => {
        console.log('点击事件');
    }, []);

    return (
        <div>
            <button onClick={() => setCount(c => c + 1)}>点击次数：{count}</button>
            <ChildComponent data={data} onClick={handleClick} />
        </div>
    );
};

export default ParentComponent