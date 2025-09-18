/**
 * 参考答案：
 *我们都知道 jQuery 可以链式调用，比如：
 *$("div").eq(0).css("width", "200px").show();
*链式调用的核心就在于调用完的方法将自身实例返回。
*实现一个简单的链式调用
 
 * 
 * */



---
// 定义一个对象
class listFunc {
 // 初始化
  constructor(val) {
    this.arr = [...val];
    return this;
  }
  // 打印这个数组
  get() {
    console.log(this.arr);
    return this;
  }
  // 向数组尾部添加数据
  push(val) {
    console.log(this.arr);
    this.arr.push(val);
    return this;
  }
  // 删除尾部数据
  pop() {
    console.log(this.arr);
    this.arr.pop();
    return this;
  }
}
const list = new listFunc([1, 2, 3]);
list.get().pop().push('ldq')