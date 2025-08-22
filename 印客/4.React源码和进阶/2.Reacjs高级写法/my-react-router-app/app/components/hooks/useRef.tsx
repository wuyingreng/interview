import React from 'react';

const { useState, useRef, createRef } = React;

export const UseRef = () => {
	const [count, setCount] = useState<string | number>(0);
	const inputRef1 = useRef<HTMLInputElement>();
	const inputRef2 = createRef();


	console.log('useRef out', inputRef1);
	console.log('createRef out', inputRef2);
	const addCount = () => {
		setCount(inputRef1.current && inputRef1.current.value)
		console.log('useRef', inputRef1);
		console.log('createRef', inputRef2);
	}

	return <div >
		<div>
			<input ref={inputRef1} type='text' className='input' />
		</div>
		<div>
			<input ref={inputRef2} type='text' className='input' />
		</div>

		<button onClick={addCount}>点击更改count</button>

	</div>


}