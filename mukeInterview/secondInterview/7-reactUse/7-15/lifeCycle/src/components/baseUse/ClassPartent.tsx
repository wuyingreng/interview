import React from 'react'
import ClassChild from './ClassChild'
class Parent extends React.Component {
  constructor() {
    super();
    console.log("Parent constructor");
    this.state = { showChild: true, count: 0 };
  }

  componentDidMount() {
    console.log("Parent componentDidMount");
  }

  componentDidUpdate() {
    console.log("Parent componentDidUpdate");
  }
  shouldComponentUpdate() {
    console.log("Parent shouldComponentUpdate");
    return true
  }

  componentWillUnmount() {
    console.log("Parent componentWillUnmount");
  }

  render() {
    console.log("Parent render");
    return <>
      <button onClick={() => this.setState({ count: this.state.count + 1 })}>Parent Update</button>
      {this.state.showChild ? <ClassChild /> : null}
    </>

  }
}

export default Parent