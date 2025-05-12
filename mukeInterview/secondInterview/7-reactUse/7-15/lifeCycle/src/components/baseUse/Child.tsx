import { useEffect } from 'react';

const Child = ({ count }: { count: number }) => {
  useEffect(() => {
    console.log('Child: componentDidMount');
    return () => console.log('Child: componentWillUnmount');
  }, []);

  useEffect(() => {
    console.log('Child: componentDidUpdate');
  });

  return <div>Child Count: {count}</div>;
};

export default Child