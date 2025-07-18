var a = true;
foo();
function foo() {
  if (a) {
    var a = 20
    console.log(a);
  }
}


var str = "hello world";
(function () { console.log(str); var str = "hello vue" })();