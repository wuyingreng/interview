import { useState } from 'react'
import ClassPartent from './components/baseUse/ClassPartent'

import './App.css'


function App() {
  const [show, setShow] = useState(true)
  return (
    <>
      <p onClick={() => setShow(false)}>关闭父组件</p>
      {show && < ClassPartent />}
    </>
  )
}

export default App
