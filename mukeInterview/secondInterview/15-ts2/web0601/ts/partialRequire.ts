interface Person {
  name: string;
  gender: 'male' | 'female';
  birthday?: Date
}

const p: Partial<Person> = {
  name: 's'
}
const p1: Required<Person> = {
  name: 's',
  gender: 'male',
  birthday: new Date()
}

p.birthday.toLocaleString();
p1.birthday.toLocaleString();