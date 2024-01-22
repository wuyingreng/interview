import React, { useRef, useState, useEffect } from 'react';


const usePreviousCount = (count?: number) => {
  const prevCountRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    console.log('useEffectCount==>', count);
    prevCountRef.current = count;
    console.log('useEffectprevCountRef==>', prevCountRef.current);
  }, [count]);

  const prevCount = prevCountRef.current;
  return prevCount;
};





const CounterUseHooks = () => {
  const [count, setCount] = useState(0);

  const prevCount = usePreviousCount(count);

  return (
    <h1>
      <button
        onClick={() => {
          setCount(count + 1);
        }}
        type="button"
      >
        设置count的值
      </button>
      {count}
      before:
      <>{prevCount}</>
    </h1>
  );
};

export default CounterUseHooks;