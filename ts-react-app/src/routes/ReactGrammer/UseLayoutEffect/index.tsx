import React, { useLayoutEffect, useRef, useState } from 'react';

const AdjustHeightAndStyle = () => {
  const [, setElementHeight] = useState(0);
  const elementRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const { current: element } = elementRef;

    if (element) {
      // 获取元素高度
      const height = element ? element && element.getBoundingClientRect().height : 0;
      setElementHeight(height);

      // 根据高度执行某些操作，例如设置样式
      if (height > 200) {
        element.style.backgroundColor = 'lightgreen';
      } else {
        element.style.backgroundColor = 'lightcoral';
      }
    }
  }, []); // 依赖为空数组，表示只在组件挂载时执行

  return (
    <div ref={elementRef}>
      {/* Content goes here */}
      Adjust my style based on height!
    </div>
  );
};

export default AdjustHeightAndStyle;
