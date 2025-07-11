import React from 'react'

interface Props { }

interface State { }

class EventDemo extends React.Component<Props, State> {
  private parentRef: React.RefObject<HTMLDivElement | null>;
  private childRef: React.RefObject<HTMLDivElement | null>;

  constructor(props: Props) {
    super(props);
    this.parentRef = React.createRef();
    this.childRef = React.createRef();
  }

  componentDidMount() {
    console.log('React componentDidMount!');
    this.parentRef.current?.addEventListener('click', (e: Event) => {
      console.log('原生事件:父元素 DOM 事件监听!')
      e.stopImmediatePropagation(); // 阻止后续所有事件监听器执行
    })
    this.childRef.current?.addEventListener('click', () => {
      console.log('原生事件:子元素 DOM 事件监听!')
    })
    document?.getElementById('root')?.addEventListener('click', (e: Event) => {
      console.log('原生事件:root DOM 事件监听!')
    })



  }

  parentClickFun = (e: React.MouseEvent<HTMLDivElement>) => {
    console.log('React 事件:父元素事件监听!');
    // 加了这行代码后console.log('原生事件:root DOM 事件监听!') 就不会执行了
    //e.nativeEvent.stopImmediatePropagation()

  }

  childClickFun = (e: React.MouseEvent<HTMLDivElement>) => {
    console.log('React 事件:子元素事件监听!');
    // 加了这行代码后parentClickFun 就不会执行了
    // e.stopPropagation()
  }

  render() {
    return (
      <div ref={this.parentRef} onClick={this.parentClickFun}>
        partent
        <div ref={this.childRef} onClick={this.childClickFun}>
          分析事件执行顺序
        </div>
      </div>
    )
  }
}

export default EventDemo




