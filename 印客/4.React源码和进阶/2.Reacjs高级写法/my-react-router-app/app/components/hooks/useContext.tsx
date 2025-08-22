import React from 'react';

const {createContext,useContext,useState} =React;

const ThemeContext=createContext('light');


const ContextUseCom=()=>{

	const theme=useContext(ThemeContext);

	return <div>now theme is {theme}</div>
};

export const ContextProviderCom=()=>{

	const [theme,setTheme]=useState('light');

	const changeTheme=()=>{
		if(theme==='light'){
			setTheme('dark')
		}else{
			setTheme('light')
		}
	};


return <ThemeContext value={theme}>
	<div>
		
		<span>i am test change theme context</span>
		<button onClick={changeTheme}>haha  i can change theme</button>
		<ContextUseCom/>
	</div>
	
</ThemeContext>



}