import AsyncUpdateDemo from './DevState';
import FunctionState from './FunctionState';
import StateDemo1 from './StateDemo1';

const BaseUseDemo = () => {
    return <div>
        {/* 非函数的方法更新state */}
        <StateDemo1 />
        <div>我是分割线</div>
        {/* 通过函数更新state */}
        <FunctionState />
        <div>我是分割线</div>
        <AsyncUpdateDemo />
    </div>

}

export default BaseUseDemo

// React 组件生命周期图示
// http://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/
