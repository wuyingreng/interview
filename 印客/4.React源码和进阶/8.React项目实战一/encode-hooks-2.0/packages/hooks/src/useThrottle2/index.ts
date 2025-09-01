import { useRef, useEffect, useCallback, useState } from 'react';
import type { ThrottleOptions } from './throttleOptions.ts'


// const useThrottle = (fn: Function, options: ThrottleOptions, deps: Array<string>) => {
//   let previousTime = useRef(0);

//   useEffect(() => {
//     let nowTime = Date.now();
//     if (nowTime - previousTime.current >= options.wait) {
//       fn();
//       previousTime.current = nowTime;
//     };
//   }, deps);


// }

const useThrottle=(fn:Function,options:{wait:number},deps:Array[string])=>{
  let previousTime=useRef(Date.now());

  useEffect(()=>{
    const now=Date.now();
    if(now-previousTime.current>=options.wait){
      fn();// 函数执行需要时间。用now更准确。避免函数执行时间过长，
      previousTime.current=now;
    }



  },deps)
}

export default useThrottle;