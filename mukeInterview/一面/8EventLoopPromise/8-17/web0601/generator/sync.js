function fn(num) {
  console.log(num);
  return num;
}

function* generator() {
  yield fn(1);
  yield fn(2);
  yield fn(2);

  return fn(4)
}
const testg = generator();
console.log(testg.next());
console.log(testg.next());
console.log(testg.next());
console.log(testg.next());
console.log(testg.next());




function* generator2() {
  const num1 = yield fn(1);
  console.log('num1', num1) // undefined
  const num2 = yield fn(2);
  console.log('num2', num2) // undefined
  yield fn(3);

  return fn(4)
}
const testg2 = generator2();
console.log(testg2.next());
console.log(testg2.next());
console.log(testg2.next());


function* generator3() {
  const num1 = yield fn(1);
  console.log('num1', num1) // 456
  const num2 = yield fn(2);
  console.log('num2', num2) // 789
  yield fn(3);

  return fn(4)
}
const testg3 = generator3();

/***
 * 结论：
 * 1. next传参第一次是没有用的。就是对应这个例子中123是打印不出来的
 * 2. 456作为第一次yield的执行结果，1是后续接收的值。就是{value:1,done:false}
*/
// ?? 123是没有的
console.log(testg3.next(123)); // {value:1,done:false}
console.log(testg3.next(456));
console.log(testg3.next(789));