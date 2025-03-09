// 作用域
let a = 0
function fn1() {
  let a1 = 100
  function fn2() {
    let a2 = 200
    function fn3() {
      let a3 = 300;
      return a + a1 + a2 + a3
    }
    fn3()
    console.log('a3=>', a3)// 报错a3 is not defined
  }
  fn2();
  console.log('a2=>', a2)// 报错a2 is not defined
}
fn1()