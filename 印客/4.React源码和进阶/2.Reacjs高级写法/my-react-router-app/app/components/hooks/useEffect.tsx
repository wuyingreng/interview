import React from 'react';
const {useState,useEffect,useLayoutEffect} =React;


export const TestUseEffect=()=>{
  const [count,setCount]=useState(()=>100);
  useEffect(()=>{
    document.title=`title${count}`
  })

// 出现问题的原因：一直新增定时器，没有清除旧的定时器
useEffect(()=>{
	const timer=setInterval(()=>{
		setCount(count+1)
	},1000);
	console.log('timer==>',timer)
	return ()=>{
		clearInterval(timer)
	}
});
useEffect(()=>{
	console.log('useEffect')
},[]);


useLayoutEffect(()=>{
	console.log('useLayoutEffect')
},[]);


	return <div>
		 <div>{count}</div>
      <button onClick={()=>setCount(count+1)}>增加计数</button>
	</div>
}