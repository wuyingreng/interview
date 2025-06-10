/**
 * 1. 把断点打在func1()
 * 2. 使用step into发现按照func1,func2,func3的顺序入栈
 * 3. 使用step out发现按照func3,func2,func1的顺序出栈
 * 4. 外层包裹着最大的匿名函数表示运行环境的感觉
*/
const func1 = () => {
  func2()
}
const func2 = () => {
  func3(3)
}
const func3 = () => { }

func1()