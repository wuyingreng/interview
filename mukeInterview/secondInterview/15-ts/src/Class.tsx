function Class() {
  class Person {
    public name: string
    protected age: number
    // 只读属性：一旦初始化后就不能再修改
    readonly id: string
    readonly createTime: Date
    private girlfriend: string = '小丽'
    // 修饰属性，也可以修饰方法
    // girlfriend: string 是私有属性就不需要写在这里了。
    constructor(name: string, age: number,) {
      this.name = name
      this.age = age
      this.id = Math.random().toString(36).substr(2, 9) // 生成随机ID
      this.createTime = new Date() // 创建时间
    }
  }

  class Person2 {
    // 在构造函数参数中使用 readonly，会自动创建只读属性
    constructor(
      public name: string,
      protected age: number,
      private girlfriend = '小丽',
      readonly id: string = Math.random().toString(36).substr(2, 9)
    ) {
      this.name = name
      this.age = age;
      this.girlfriend = girlfriend
      // id 会自动赋值，不需要手动赋值
    }
    print() {
      console.log(this.girlfriend)
    }
  }

  class Employee extends Person {
    constructor(name: string, age: number) {
      super(name, age)

    }
    getInfo() {
      console.log(this.name)
      console.log(this.age)

    }
  }
  const x = new Employee('x', 20)
  x.name;
  x.age
  // x.employeeId = 'new-id' // ❌ 错误：只读属性不能修改

  class Person3 {
    #salary: number;
    readonly #secretKey: string; // 私有只读属性
    constructor(private name: string, salary: number) {
      this.#salary = salary;
      this.name = name
      this.#secretKey = 'super-secret-key-' + Math.random().toString(36).substr(2, 8)
    }
    getName() {
      console.log(this.name)
    }
    getSalary() {
      console.log(this.#salary)
    }
    getSecretKey() {
      return this.#secretKey // 只读，但可以通过方法获取
    }
  }
  const p3 = new Person3('zhangsan', 500);
  console.log(p3.name)
  console.log((p3 as any).name)
  console.log(p3.#salary) // ❌ 私有属性不能直接访问
  console.log(p3.getName());     // ✅ 通过方法访问
  console.log(p3.getSalary());   // ✅ 通过方法访问
  return (
    <div>
      class 相关
    </div >
  );
}

export default Class;

// 只读属性的特点演示
class ReadOnlyDemo {
  readonly constant: string = '这是常量'
  readonly computed: number

  constructor() {
    this.computed = Math.random() * 100 // 可以在构造函数中赋值
  }

  // 错误示例：不能在方法中修改只读属性
  // updateConstant() {
  //   this.constant = '新值' // ❌ 编译错误
  // }
}

const demo = new ReadOnlyDemo()
console.log(demo.constant) // ✅ 可以读取
// demo.constant = '新值' // ❌ 编译错误：不能修改只读属性
