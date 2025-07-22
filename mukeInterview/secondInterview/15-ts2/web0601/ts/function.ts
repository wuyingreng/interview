type FUNC = (str: string) => void;
const f: FUNC = (str: string) => {
  console.log(str);
  return str.length;
}

// 提取参数
type Func = (name: string, birthday: Date) => Person;

type P = Parameters<Func>;// type P = [name: string, birthday: Date]


type RFunc = ReturnType<Func> // type RFunc = Person


const result: Person[] = [];

const func: Func = (name: string, birthday: Date) => {
  return { name, gender: 'male', birthday }
}

for (let i = 1; i <= 3; i++) {
  const args: P = [String(i), new Date()];
  result.push(func(...args))
};

