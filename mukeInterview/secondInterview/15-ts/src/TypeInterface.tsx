const TypeInterface = () => {
  interface UserInterface {
    name: string
    age: number
    getName: () => string
  }
  // type就相当于const 变量声明的意思，interface也是，前面都不需要加constant,let
  type UserType = {
    name: string
    age: number
    getName: () => string
  }

  class UserInterfaceClass implements UserInterface {
    constructor(public name: string, public age: number) { }

    getName() { return this.name; }
  }

  class UserTypeClass implements UserType {
    constructor(public name: string, public age: number) { }

    getName() { return this.name; }
  }

  // type 联合类型 交叉类型，interface 不行
  // 联合类型 逻辑或只能是其中的一个
  type info = string | number
  type TName = { name: string }
  type TAage = { age: number }

  interface T2 {
    age: number
  }
  type TUnion = TAage | TName;

  const a: TUnion = { name: 'xxx' }

  type TCros = TName & TAage
  const b: TCros = { name: 'xxx', age: 20 }

  type T5 = typeof b;

  type K1 = keyof TCros

  const k: K1 = 'age'
  const k2: K1 = 'name'


  return <div>
    Type Interface 相关
  </div>

}
export default TypeInterface

