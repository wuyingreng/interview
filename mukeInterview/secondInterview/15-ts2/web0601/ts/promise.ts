interface Person {
  name: string;
}
const reqInfoFunc = async function reqInfo(name: string): Promise<Person> {
  const res = await fetch('/api/test?name=' + name);
  const p: Person = await res.json();
  return p

}