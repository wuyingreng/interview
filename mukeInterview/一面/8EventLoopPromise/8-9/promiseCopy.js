Promise.resolve().then((res) => {
  console.log('题目1==>1')
}).catch(() => {
  console.log('题目1==>2')
}).then(() => {
  console.log('题目1==>3')
})

Promise.resolve().then((res) => {
  console.log('题目2==>1');
  throw new Error('error1')
}).catch((err) => {
  console.log('题目2==>2');

}).then((res) => {
  console.log('题目2==>3');
})

Promise.resolve().then(() => {
  console.log('题目3=>1')
  throw new Error('frro1')
}).catch(() => {
  console.log('题目3=>2')
}).catch(() => {
  console.log('题目3=>3')
})