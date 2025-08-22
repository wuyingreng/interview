import React from 'react';

export const WhithoutMemoChild=()=>{
	console.log('WhithoutMemoChild  render ==>')


	return <div>i am a child be wrapeed with React memo</div>
};


export const Child=()=>{

	console.log('child  render ==>')
	return <div>i am a child </div>
};



export const MemoChild=React.memo(Child);
