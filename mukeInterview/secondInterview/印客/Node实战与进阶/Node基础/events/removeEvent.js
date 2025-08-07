const Events=require('node:events');

class MyEmiter extends Events{

};


const myEmiter=new MyEmiter();


const callbackA=function(){
	console.log('event1 触发了')
	myEmiter.removeListener('event1',callbackA)
}

myEmiter.on('event1',callbackA);

myEmiter.emit('event1','a','b');
myEmiter.emit('event1','c','d');
