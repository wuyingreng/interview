import React from 'react';

const {useRef,useState,useEffect}=React;
export const UseRefVariable=()=>{
	let timer;
	const [count,setCount]=useState(0)


	useEffect(()=>{
		timer=setInterval(()=>{
			console.log('触发了')
		},1000)
	},[])


	const clearIntervalFunc=()=>{
		// 点击增加count计数 按钮之后再点击清除定时器按钮，因为组件重新渲染了，所以timer变为了undefined
		console.log('timer==>',timer)
		clearInterval(timer)
	};

	const addCount=()=>{
		setCount(count+1)
	};



	return <div>
		<span>{count}</span>
		<div onClick={clearIntervalFunc}> 清除定时器</div>
		<button onClick={addCount}> 增加count计数</button>
	</div>

}