
async function asyncFunc(num) {
  return await new Promise((resolve, reject) => {
    setTimeout(() => resolve(num))
  })

}


function* generator() {
  yield asyncFunc(1);
  yield asyncFunc(2)
  yield asyncFunc(3)
}
const g = generator()
const next1 = g.next();
next1.value.then((res) => console.log(res, next1));

const next2 = g.next();
next2.value.then((res) => console.log(res, next2))