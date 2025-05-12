import { useState, useEffect, useLayoutEffect, useRef } from "react";

const UseLayoutEffectBox = () => {
  const [width, setWidth] = useState(100);
  const boxRef = useRef();

  // 使用 useEffect（异步）
  // useEffect(() => {
  //   console.log("useEffect 执行");
  //   if (width === 100) {
  //     // 异步修改宽度
  //     setWidth(200);
  //   }
  // }, [width]);

  // 使用 useLayoutEffect（同步）
  useLayoutEffect(() => {
    console.log("useLayoutEffect 执行");
    if (boxRef.current) {
      // 直接修改 DOM 宽度
      boxRef.current.style.width = "200px";
    }
  }, []);

  return (
    <div>
      <div
        ref={boxRef}
        style={{ width: `${width}px`, height: "100px", background: "red" }}
      >
        盒子
      </div>
    </div >
  );
};

export default UseLayoutEffectBox