// Demonstration of break, continue and return
function demonstrateControlFlow() {
  console.log("Demonstration of break:");
  for (let i = 0; i < 5; i++) {
    if (i === 2) break; // 跳出整个循环
    console.log("Demonstration of break:", i);
  }

  console.log("\nDemonstration of continue:");
  for (let i = 0; i < 5; i++) {
    if (i === 2) continue; // 跳过下面剩余代码，进入下一个循环迭代
    console.log("\nDemonstration of continue:", i);
  }

  console.log("\nDemonstration of return:");
  function demoReturn() {
    for (let i = 0; i < 5; i++) {
      if (i === 2) return; // 退出整个函数
      console.log("\nDemonstration of return:", i);
    }
  }
  demoReturn();
  console.log("This will not be printed if return is executed before.");
}

demonstrateControlFlow();
