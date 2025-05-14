import { useEffect, memo } from 'react';

/** 
 * 未使用memo,外层的countP改变了，Child也会进入Child: componentDidUpdate
*/
// const Child = ({ count }: { count: number }) => {
//   useEffect(() => {
//     console.log('Child: componentDidMount');
//     return () => console.log('Child: componentWillUnmount');
//   }, []);

//   useEffect(() => {
//     console.log('Child: componentDidUpdate');
//   });

//   return <div>Child Count: {count}</div>;
// };

// export default Child

/** 
 * 使用memo,外层的countP改变了，Child不会进入Child: componentDidUpdate
*/
const Child = memo(({ count }: { count: number }) => {
  useEffect(() => {
    console.log('Child: componentDidMount');
    return () => console.log('Child: componentWillUnmount');
  }, []);

  useEffect(() => {
    console.log('Child: componentDidUpdate');
  });

  return <div>Child Count: {count}</div>;
  // 自定义比较函数，返回 true 表示不重新渲染
}, (prevProps, nextProps) => prevProps.count === nextProps.count);

export default Child