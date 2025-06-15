import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    // 设置基准字体大小
    const setRootFontSize = () => {
      const designWidth = 750; // 设计稿宽度
      const htmlWidth = document.documentElement.clientWidth; // 实际设备宽度
      console.log('htmlWidth==>', htmlWidth, 'designWidth==>', designWidth)
      const fontSize = (htmlWidth / designWidth) * 100; // 计算基准字体大小
      console.log('fontSize==>', fontSize)
      document.documentElement.style.fontSize = fontSize + 'px';
    };

    // 初始化
    setRootFontSize();
    // 监听窗口变化
    window.addEventListener('resize', setRootFontSize);

    return () => {
      window.removeEventListener('resize', setRootFontSize);
    };
  }, []);

  return (
    <>
      <div>
        <div className="test">
          99999
        </div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
