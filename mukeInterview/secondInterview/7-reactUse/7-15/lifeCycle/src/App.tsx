import { useState } from 'react'
import ClassPartent from './components/baseUse/ClassPartent';
import HooksParent from './components/baseUse';
import UseLayoutEffectBox from './components/baseUse/useLayoutEffect';
import VDOM from './components/baseUse/VDOM';
import ConcurrentMode from './components/baseUse/ConcurrentMode';
import './App.css'


function App() {
  const [show, setShow] = useState(true)
  return (
    <>
      {/* class父子组件生命周期示例 */}
      {/* <p onClick={() => setShow(false)}>关闭父组件</p>
      {show && < ClassPartent />} */}
      {/* hooks父子组件生命周期示例 */}
      {/* <HooksParent /> */}
      {/* useEffect vs useLayoutEffect */}
      {/* <UseLayoutEffectBox /> */}
      {/* 展示虚拟dom对象 */}
      {/* <VDOM /> */}
      <ConcurrentMode />
    </>
  )
}

export default App
