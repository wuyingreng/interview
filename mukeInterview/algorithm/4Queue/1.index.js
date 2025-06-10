// 队列方法一 push+shift

const queueP = [];
queueP.push(1);
queueP.push(2);
queueP.push(3);
const itemP1 = queueP.shift()
const itemP2 = queueP.shift()
const itemP3 = queueP.shift()

// 队列方法一 unshift+pop

const queueS = [];
queueS.unshift(1);
queueS.unshift(2);
queueS.unshift(3);
const itemS1 = queueS.pop()
const itemS2 = queueS.pop()
const itemS3 = queueS.pop()