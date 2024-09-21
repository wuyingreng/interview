async function async1() {
  console.log('2');
  await async2();
  console.log('await1');
}

async function async2() {
    console.log('async2 end')
    return Promise.resolve().then(()=>{
        console.log('async2 end1')
    })
}



async1()
console.log(22)
console.log(33)
console.log(44)
console.log(55)

function sayHello () { console.log ('hello') }
function test () {
	setTimeout (sayHello, 0);
	for (let i = 0; i < 5; i++) {  // 修正为 i < 50
		console. log (i);
	}
}

new Promise(function(resolve) {
    console.log('promise 主体');  	//new Promise函数立即执行
    resolve();						//必须resolve执行才能执行then
}).then(function() {
    console.log('promise 的then');  		  //then函数分发到微任务Event Queue
})


test ()

