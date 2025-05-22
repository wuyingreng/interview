import React, { useState } from 'react';
// import ClickCounter from './components/ClickCounter'
// import LifeCycles from './components/LifeCycles'
// import FriendStatus from './components/FriendStatus'
// import UseRefDemo from './components/UseRefDemo'
// import UseContextDemo from './components/UseContextDemo'
// import UseReducerDemo from './components/UseReducerDemo'
// import UseMemoDemo from './components/UseMemoDemo'
// import UseCallbackDemo from './components/UseCallbackDemo'
// import CustomHookUsage from './components/CustomHookUsage'
// import Teach from './components/Teach'
// import UseStateTrap from './components/UseStateTrap'
// import UseEffectChangeState from './components/UseEffectChangeState';
import { useAxios } from './customHooks/useAxiosCopy'

function App() {
  const [flag, setFlag] = useState(true)
  const [id, setId] = useState(1)
  /***
   * 这里写成其他地址就可以模拟报错了比如http://localhost:5174
   */
  const [data, loading, error] = useAxios('http://localhost:5174');
  if (loading) return <div>loading</div>;


  return (
    <div>
      {/* <p>React Hooks 示例（双越老师）</p>
      <div>
        <button onClick={() => setFlag(false)}>flag = false</button>
        <button onClick={() => setId(id + 1)}>id++</button>
      </div> */}

      <hr></hr>
      {/* <ClickCounter/> */}
      {/* {flag && <LifeCycles/>} */}
      {/* {flag && <FriendStatus friendId={id}/>} */}
      {/* <UseRefDemo/> */}
      {/* <UseContextDemo/> */}
      {/* <UseReducerDemo/> */}
      {/* <UseMemoDemo/> */}
      {/* <UseCallbackDemo/> */}
      {/* {flag && <CustomHookUsage/>} */}
      {/* <Teach couseName="《前端框架面试课3》"/> */}
      {/* <UseStateTrap/> */}
      {/* <UseEffectChangeState/> */}
      {/* 
      * Uncaught Error: Objects are not valid as a React child (found: object with keys {data, status, statusText, headers, config, request}). 
      * If you meant to render a collection of children, use an array instead.
       */}
      {error ? JSON.stringify(error) : JSON.stringify(data)}
    </div>
  );
}

export default App;
