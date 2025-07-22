interface Person {
  name: string;
  gender: 'male' | 'female';
  birthday?: Date
}

const p: Pick<Person, 'name'> = {
  name: 's'
}

export { }