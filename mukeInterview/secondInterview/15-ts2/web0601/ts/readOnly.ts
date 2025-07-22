interface Person {
  name: string;
  gender: 'male' | 'female';
  birthday?: Date
}

const p: Readonly<Person> = {
  name: 's'
}
p.name = 'ss'
export { }