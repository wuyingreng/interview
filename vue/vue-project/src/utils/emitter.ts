// 引入mitt
import mitt from 'mitt'

// 定义事件类型
type Events = {
  'send-toy': string
 
}

// 创建类型化的 emitter
const emitter = mitt<Events>()

// 暴露emitter
export default emitter

/* // 绑定事件
emitter.on('test1',()=>{
  console.log('test1被调用了')
})
emitter.on('test2',()=>{
  console.log('test2被调用了')
})

// 触发事件
setInterval(() => {
  emitter.emit('test1')
  emitter.emit('test2')
}, 1000);

setTimeout(() => {
  // emitter.off('test1')
  // emitter.off('test2')
  emitter.all.clear()
}, 3000); */



