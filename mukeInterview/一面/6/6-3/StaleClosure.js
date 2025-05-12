// 闭包陷进
/**-------------  for+var+延迟执行      -------------*/
// 情况一：for+var+延迟执行的函数
const funcs = [];

for (var i = 0; i < 3; i++) {
  /**
   * 闭包首先是函数，funcs是数组，所以funcs[i]还是0,1,2
   * funcs[i]中的i是不是还不算自由变量。function(){console.log(i)}中的i才会自由变量
  */

  funcs[i] = function () {
    console.log(i);
  };
}

funcs[0](); // 输出 3
funcs[1](); // 输出 3
funcs[2](); // 输出 3

// 情况一：for+var+setTimeout/setInterval
for (var i = 0; i < 3; i++) {
  setTimeout(function () {
    console.log(i);
  }, 100);
}

