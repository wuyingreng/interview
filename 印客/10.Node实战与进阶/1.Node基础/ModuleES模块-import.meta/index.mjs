/**
 * import.meta==> [Object: null prototype] {
  dirname: '/Users/xiangpeifang/Documents/study/interview/印客/10.Node实战与进阶/1.Node基础/ModuleES模 块-import.meta',
  filename: '/Users/xiangpeifang/Documents/study/interview/印客/10.Node实战与进阶/1.Node基础/ModuleES模块-import.meta/index.mjs',
  main: true,
  resolve: [Function: resolve],
  url: 'file:///Users/xiangpeifang/Documents/study/interview/%E5%8D%B0%E5%AE%A2/10.Node%E5%AE%9E%E6%88%98%E4%B8%8E%E8%BF%9B%E9%98%B6/1.Node%E5%9F%BA%E7%A1%80/ModuleES%E6%A8%A1%E5%9D%97-import.meta/index.mjs'
}
 * 
 * 
 * 
 * 
 * */

console.log('import.meta==>',import.meta);

/**
 * import.meta user==> file:///Users/xiangpeifang/Documents/study/interview/%E5%8D%B0%E5%AE%A2/10.Node%E5%AE%9E%E6%88%98%E4%B8%8E%E8%BF%9B%E9%98%B6/1.Node%E5%9F%BA%E7%A1%80/ModuleES%E6%A8%A1%E5%9D%97-import.meta/user.js
 * 返回一个地址
 * */
console.log('import.meta user==>',import.meta.resolve('./user.js'));