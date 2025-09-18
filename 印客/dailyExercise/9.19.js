

// 定义一个对象
class ListFunc {
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
const list = new ListFunc([1, 2, 3]);
list.get().pop().push('ldq')