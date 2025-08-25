import React from 'react';

const {useReducer}=React;

const reducer=(state,action)=>{

	const {payload,name}=action;
	// 这个和while差不多的，就是case xxx:
	switch(name){
		case 'increasement':
			return state+payload
		case'decreasement':
			return state+payload
		default:
			return state
	}
}

export const UseReducerCom = () => {

const [count,dispatch]=useReducer(reducer,0)

  return (<div>

  	<span>{count}</span>
  	<button onClick={()=>dispatch({payload:10,name:'increasement'})}>使用useReducer增加state</button>
<button onClick={()=>dispatch({payload:10,name:'decreasement'})}>使用useReducer减少state</button>
  	i am use Reducer com
  </div>);
}