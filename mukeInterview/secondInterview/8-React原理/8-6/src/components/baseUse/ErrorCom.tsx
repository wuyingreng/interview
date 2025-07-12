import React from 'react'

interface Props { }

interface State { }

class ErrorCom extends React.Component<Props, State> {


  constructor(props: Props) {
    super(props);

  }

  componentDidMount() {



    window.addEventListener('error', (error) => {
      console.log('error==>', error)
    })

  }

  clickFun = (e: React.MouseEvent<HTMLDivElement>) => {
    try {
      throw new Error()
    } catch (error) {
      console.log('error==>', error)
      this.setState({ error })
    }
  }



  render() {
    return (
      <div onClick={this.clickFun}>
        事件抛出错误

      </div>
    )
  }
}

export default ErrorCom;