
import React from 'react';

const { useState } = React;

export const ErroryBoundaryChild = () => {
	const [count, setCount] = useState(0);


	return <div>111{count.data.date}</div>
}

export class ErroryBoundary extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			error: false
		};
	}

	static getDerivedStateFromError(err) {
		console.log('err==>', err)
		// 返回一个对象，react会自动的更新state
		return {
			error: true
		}
	}
	componentDidCatch(err, info) {
		// 这个是晚于getDerivedStateFromError触发的
		console.log('componentDidCatch - err==>', err)
	}

	render() {
		return <>{this.state.error ? <div>loading</div> : this.props.children}</>

	}
}


