/**
 * title: 基础用法
 * desc: ThrottledValue 每隔 500ms 变化一次。这个不行的。放到线上就是个bug
 */

import React, { useState } from 'react';
import { useThrottle2 } from 'encodeHooks';

export default () => {
  const [value, setValue] = useState<string>();
 const [throttleValue, setThrottleValue] = useState<string>();

  useThrottle2(()=>setThrottleValue(value),{wait:1000},[value]);

  console.log('throttleValue==>',throttleValue);
  console.log('value==>',value)
  return (
    <div>
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Typed value"
        style={{ width: 280 }}
      />
      <p style={{ marginTop: 16 }}>throttleValue:{throttleValue}</p>
    </div>
  );
};
