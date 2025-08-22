
// 这里得起个名字，不然报错
function* generator() {
  yield 1;
  yield 2;
  yield 3;
  // 这个保证done:true的时候，value还有值
  return 4
}
const testg = generator();
testg.next(); // next是由const testg=generator() 调用的
testg.next();
testg.next();
testg.next(); // {value:4,done:true}
testg.next();// {value:undefined,done:true}