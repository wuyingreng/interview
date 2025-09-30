import { useState, useEffect, useRef, useCallback } from 'react'

function useMousePosition() {
  const [x, setX] = useState(0)
  const [y, setY] = useState(0)
  
  // 使用 useRef 来保存最新的值，避免闭包问题
  // const positionRef = useRef({ x, y })
  
  // // 每次渲染时更新 ref 的值
  // useEffect(() => {
  //   positionRef.current = { x, y }
  // })
const positionRef=useRef({x:0,y:0})
useEffect(()=>{
  positionRef.current={...positionRef.current,x,y}
},[x,y])
  // 事件回调里面用useRef拿到最新的值。避免事件回调频繁的创建
  const mouseMoveHandler = useCallback((event:MouseEvent) => {
    // 现在通过 ref 访问最新的 x, y 值
    console.log('event==>', event, positionRef.current.x, positionRef.current.y)
    setX(event.clientX)
    setY(event.clientY)
  }, []) // 依赖数组为空，因为不再直接依赖 x, y

  useEffect(() => {
    // 绑定事件
    document.body.addEventListener('mousemove', mouseMoveHandler)

    // 解绑事件
    return () => document.body.removeEventListener('mousemove', mouseMoveHandler)
  }, [mouseMoveHandler]) // 现在依赖是稳定的 mouseMoveHandler

  return [x, y]
}

export default useMousePosition

