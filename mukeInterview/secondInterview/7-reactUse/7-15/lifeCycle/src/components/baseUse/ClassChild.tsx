import React from 'react'

class Child extends React.Component {
  constructor() {
    super();
    this.state = { count: 0 };
    console.log("Child constructor");
  }

  componentDidMount() {
    console.log("Child componentDidMount");
  }

  componentDidUpdate() {
    console.log("Child componentDidUpdate");
  }
  shouldComponentUpdate() {
    console.log("Child shouldComponentUpdate");
    return true
  }
  componentWillUnmount() {
    console.log("Child componentWillUnmount");
  }
  render() {
    console.log("Child render");
    return <div>Child

      <p onClick={() => this.setState({ count: this.state.count + 1 })}>测试子组件更新会不会触发父组件更新</p>
    </div>;
  }
}

export default Child