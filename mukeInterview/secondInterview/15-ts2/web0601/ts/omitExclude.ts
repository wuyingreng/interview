interface Person {
  name: string;
  gender: 'male' | 'female';
  birthday?: Date
}

const p: Omit<Person, 'name'> = {
  gender: 'male',
  birthday: new Date()
}


type TU = 1 | 2 | 3 | 4;
const t1: Exclude<TU, 3 | 4> = 1
export { }