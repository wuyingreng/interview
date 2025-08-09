
const user1=require('./user.js');

console.log('require_main==>',require.main);
console.log('module==>',module)

// {
//   id: '.',
//   path: '/Users/xiangpeifang/Documents/study/interview/mukeInterview/secondInterview/印客/Node实战与进阶/commonjs学习/commonjs查看模块实例',
//   exports: {}, //这里没有抛出任何东西
//   filename: '/Users/xiangpeifang/Documents/study/interview/mukeInterview/secondInterview/印客/Node实战与进阶/commonjs学习/commonjs查看模块实例/index.js',
//   loaded: false,  //因为在这里访问index.js的时候，index.js并没有执行完，所以访问的时候loaded是false
//   children: [ // 它加载了user这个模块
//     {
//       id: '/Users/xiangpeifang/Documents/study/interview/mukeInterview/secondInterview/印客/Node实战与进阶/commonjs学习/commonjs查看模块实例/user.js',
//       path: '/Users/xiangpeifang/Documents/study/interview/mukeInterview/secondInterview/印客/Node实战与进阶/commonjs学习/commonjs查看模块实例',
//       exports: [Object],
//       filename: '/Users/xiangpeifang/Documents/study/interview/mukeInterview/secondInterview/印 客/Node实战与进阶/commonjs学习/commonjs查看模块实例/user.js',
//       loaded: true,
//       children: [],
//       paths: [Array]
//     }
//   ],
//   paths: [
//     '/Users/xiangpeifang/Documents/study/interview/mukeInterview/secondInterview/印客/Node实战与进阶/commonjs学习/commonjs查看模块实例/node_modules',
//     '/Users/xiangpeifang/Documents/study/interview/mukeInterview/secondInterview/印客/Node实战与进阶/commonjs学习/node_modules',
//     '/Users/xiangpeifang/Documents/study/interview/mukeInterview/secondInterview/印客/Node实战与进阶/node_modules',
//     '/Users/xiangpeifang/Documents/study/interview/mukeInterview/secondInterview/印客/node_modules',
//     '/Users/xiangpeifang/Documents/study/interview/mukeInterview/secondInterview/node_modules',
//     '/Users/xiangpeifang/Documents/study/interview/mukeInterview/node_modules',
//     '/Users/xiangpeifang/Documents/study/interview/node_modules',
//     '/Users/xiangpeifang/Documents/study/node_modules',
//     '/Users/xiangpeifang/Documents/node_modules',
//     '/Users/xiangpeifang/node_modules',
//     '/Users/node_modules',
//     '/node_modules'
//   ]
// }