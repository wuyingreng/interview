import { useState } from 'react'
// import JSXBaseDemo from './JSXBaseDemo'
// import ConditionDemo from './ConditionDemo'
// import ListDemo from './ListDemo'
import EventDemo from './EventDemo';
import { NotControlledInput } from './NotControlledInput';
import { ControlledInput } from './ControlledInput';
// import FormDemo from './FormDemo'
// import PropsDemo from './PropsDemo'
// import StateDemo from './StateDemo'
// import StateDemo1 from './StateDemo1'

const BaseUseDemo = () => {
    const [text, setText] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setText(e.target.value);
    }

    return <div>
        {/* <JSXBaseDemo /> */}
        {/* <ConditionDemo />
            <ListDemo /> */}
        <EventDemo />
        {/* <FormDemo/> */}
        {/* <PropsDemo /> */}
        {/* <StateDemo/> */}
        {/* <StateDemo1/> */}
        <div>
            <NotControlledInput label="第一个输入框" />
        </div>
        <div>
            <ControlledInput label="第二个输入框" text={text} handleChange={handleChange} />
        </div>

    </div>

}

export default BaseUseDemo

// React 组件生命周期图示
// http://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/
