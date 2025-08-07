const Events=require('node:events');

class MyEmitter extends Events{

}

const myEmiter=new MyEmitter();


/**
 *  监听事件
 * function(...rest){ 这里就和事件监听器addEventListener里面的一样。写普通函数就是调用方。
 * 写箭头函数就是全局的window,或者空对象，或者undefined
 * */
myEmiter.on('event1',function(...rest){
	console.log('event1 触发了',rest,this===myEmiter,this)
})

myEmiter.once('event1',function(...rest){
	console.log('event1 once 触发了',rest,this===myEmiter,this)
})


// 触发事件。只需要触发事件和传递参数，不需要写回调了。回调写在监听的事件里面
myEmiter.emit('event1','a','b');
myEmiter.emit('event1','c','d');





