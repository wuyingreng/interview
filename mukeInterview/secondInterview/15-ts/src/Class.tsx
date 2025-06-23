function Class() {
  class Person {
    public name: string
    protected age: number
    private girlfriend: string = '小丽'
    // 修饰属性，也可以修饰方法
    // girlfriend: string 是私有属性就不需要写在这里了。
    constructor(name: string, age: number,) {
      this.name = name
      this.age = age

    }
  }

  class Person2 {
    constructor(public name: string, protected age: number, private girlfriend = '小丽') {
      this.name = name
      this.age = age;
      this.girlfriend = girlfriend
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


  class Person3 {
    #salary: number;
    constructor(private name: string, salary: number) {
      this.#salary = salary;
      this.name = name

    }
    getName() {
      console.log(this.name)
    }
    getSalary() {
      console.log(this.#salary)
    }
  }
  const p3 = new Person3('zhangsan', 500);
  console.log(p3.name)
  console.log((p3 as any).name)
  console.log(p3.#salary)
  console.log(p3.getName());     // ✅ 通过方法访问
  console.log(p3.getSalary());   // ✅ 通过方法访问
  return (
    <div>
      class 相关
    </div >
  );
}

export default Class;
