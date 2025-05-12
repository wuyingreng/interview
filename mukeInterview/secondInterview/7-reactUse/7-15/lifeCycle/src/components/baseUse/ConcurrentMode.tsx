import { useState, useTransition } from 'react';

const HeavyComponent = () => {
  // 模拟一个耗时的渲染（生成 10000 个元素）
  const items = [];
  for (let i = 0; i < 10000; i++) {
    items.push(<div key={i}>Item {i}</div>);
  }
  return <div>{items}</div>;
};

const ConcurrentMode = () => {
  const [showHeavy, setShowHeavy] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleClick = () => {
    // 使用 startTransition 标记低优先级更新
    // setShowHeavy(true);
    startTransition(() => {
      setShowHeavy(true);
    });
  };
  console.log('isPending==>', isPending)
  return (
    <div>
      <input />
      <button onClick={handleClick}>
        {isPending ? 'Loading...' : 'Show Heavy Component'}
      </button>
      {showHeavy && <HeavyComponent />}

    </div>
  );
};

export default ConcurrentMode