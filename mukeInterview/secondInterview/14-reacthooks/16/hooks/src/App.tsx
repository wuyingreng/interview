
import UseEffectChangeState from './components/UseEffectChangeState';
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
import { useAxios } from './customHooks/useAxios'

function App() {
  const [data, loading] = useAxios('http://localhost:5174');
  if (loading) return <div>loading</div>;

  return (
    <div>
      <UseStateTrap />
      <UseEffectChangeState />
    </div>
  );
}

export default App;
