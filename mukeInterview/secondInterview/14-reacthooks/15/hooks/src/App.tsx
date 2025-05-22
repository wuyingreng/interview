
import UseStateTrap from './components/UseStateTrap';
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
import useMousePosition from './customHooks/useMousePosition'

function App() {
  const [x, y] = useMousePosition()
  return (
    <div>
      <p style={{ height: 500, width: 500, background: '#ccc' }}>鼠标位置：{x} {y}</p>
    </div>
  );
}

export default App;
