import React from 'react'
// import ContextDemo from './ContextDemo'
// import UncontrolledDemo from './UncontrolledDemo'
// import PortalsDemo from './PortalsDemo'
// import LazyDemo from './LazyDemo'
// import SCUDemo from './SCUDemo'
import SCUDemo2 from './SCUDemo2'
import PrimaryParent from './hooks/Primary'
import ObjectParent from './hooks/Object'
// import PureComponentDemo from './PureComponentDemo'
// import HOCDemo from './HOCDemo'
// import RenderPropDemo from './RenderPropDemo'

class AdvancedUse extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return <div>
            {/* <ContextDemo/> */}
            {/* <UncontrolledDemo/> */}
            {/* <PortalsDemo>Modal 内容</PortalsDemo> */}
            {/* <LazyDemo/> */}
            {/* <SCUDemo/> */}
            {/* <SCUDemo2 /> */}
            {/* <PureComponentDemo/> */}
            {/* <HOCDemo a="100"/> */}
            {/* <RenderPropDemo a="200"/> */}
            {/* 以下代码演示在hooks中父组件渲染了，虽然子组件没有接收父组件这个state作为props也会重新渲染 */}
            {/* <PrimaryParent /> */}
            {/* 以下代码演示在用useMemo,useCallback包裹props，避免子组件跟着更新 */}
            <ObjectParent />
        </div>
    }
}

export default AdvancedUse
