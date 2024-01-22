import React, { useMemo } from 'react';


const ReactChildren = ({
  children,
  top = 0,
}: any) => {
  const { width = 70, height = 60 } = useMemo(() => {
    return {
      width: 80,
      height: 90
    }
  }, []);

  console.log(
    'react children==>',
    typeof children,
    children,
    React.Children.toArray(children),
  );
  // legacy API
  // 把 react.children变成一个数组，并且给每一个加上一个key. React.children是每一个直接children
  return (
    <div>
      <div>{React.Children.toArray(children)?.length}</div>
      {React.Children.map(children, (child) => {
        return React.cloneElement(
          child,
          {
            style: {
              position: 'fixed',
              top,
              width,
              height,
              zIndex: 900,
            },
          },
          null,
        );
      })}
    </div>

  );
};

const ReactParent = () => {
  return <ReactChildren>
    <div>element 1</div>
    <>99</>
  </ReactChildren>
}
export default ReactParent;