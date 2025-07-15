function* generator() {
  yield 1;
  yield 2;
  yield 3;
  // 这个保证done:true的时候，value还有值
  return 4
}
const testg = generator();
testg.next();
testg.next();
testg.next();
testg.next(); // {value:4,done:true}
testg.next();// {value:undefined,done:true}