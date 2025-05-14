import { memo } from 'react';

const ChildComponent = memo(({ data }: any) => {
  console.log('子组件渲染');
  return <div>{data.value}</div>;
});

export default ChildComponent