import React from 'react';

const {useState,useMemo}=React;
export const UseMemoComp=()=>{
	const [count,setCount]=useState(0);
	const [count2,setCount2]=useState(0);


	const square=useMemo(()=>{
		console.log(count);
		return count*count;
	},[count])

	return <div>

		<div>test useMemo</div>
		<div>{square}</div>
		<div>{count}</div>
		<div>{count2}</div>
		<button onClick={()=>setCount2(count+1)}>点击增加count2</button>
		<button onClick={()=>setCount(count+1)}>点击增加count</button>
	</div>
}