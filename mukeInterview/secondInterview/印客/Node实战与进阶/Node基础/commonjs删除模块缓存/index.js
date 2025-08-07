

// 源码里面是有缓存这个机制的
const user1=require('./user.js');
console.log(user1.height)

// 删除了缓存
delete require.cache[require.resolve('./user.js')]
const user2=require('./user.js');
console.log(user2.height)
// 这里可以看到两次打印的结果是不一样的了