


function App() {
  // 类型断言

  const n1 = 188

  //数组，单一类型的

  const arr1: number[] = [1, 2, 3]
  const arr2: Array<number> = [10, 20, 30]//泛型
  // 元组，多个类型的
  const x: [string, number] = ['x', 18];

  enum Color {
    Red,
    Green,
    Blue,
  }
  const c: Color = Color.Red


  type VoidFunc = () => void;

  function example(): void {
    return "hello";  // 这里会报错！
  }

  const myFunc: VoidFunc = () => {
    return "hello";  // 这里不会报错！
  };

  // any 任意类型。和 JS 一样，不进行类型检查，比较危险”// 
  const a: any = 188 //1l a.x
  // void 和 any 相反，没有类型,
  function f1(): void { }
  // never 永远不存在的类型
  function f2(): never {
    while (true) { }
  }
  function err(message: string): never {
    throw new Error(message)
  }
  return (
    <div>
      <div>{arr1}</div>
      <div>{arr2}</div>
      <div>{x}</div>
      <div>c:{c}</div>
    </div>
  );
}

export default App;
