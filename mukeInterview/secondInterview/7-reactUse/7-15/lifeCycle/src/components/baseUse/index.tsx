
import { useEffect, useState } from 'react';
import Child from './Child';

const Parent = () => {
    const [count, setCount] = useState(0);
    const [showChild, setShowChild] = useState(true);

    useEffect(() => {
        console.log('Parent: componentDidMount');
        return () => console.log('Parent: componentWillUnmount');
    }, []);

    useEffect(() => {
        console.log('Parent: componentDidUpdate');
    });

    return (
        <div>
            <button onClick={() => setCount(c => c + 1)}>Parent Update</button>
            <button onClick={() => setShowChild(s => !s)}>Toggle Child</button>
            {showChild && <Child count={count} />}
        </div>
    );
};
export default Parent

// React 组件生命周期图示
// http://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/
