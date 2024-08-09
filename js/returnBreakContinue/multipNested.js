// Demonstrating break and continue in nested loops
function nestedLoopDemo() {
  console.log("Demonstration of break in nested loops:");
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (j === 1) break; // Exits the inner loop only
      console.log(`break in nested loops: i: ${i}, j: ${j}`);
    }
    console.log(`break in nested loops: i: ${i}`);
  }

  console.log("\nDemonstration of continue in nested loops:");
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (j === 1) continue; // Skips to the next iteration of the inner loop
      console.log(`i: ${i}, j: ${j}`);
    }
    console.log(`continue in nested loops:i ${i}`);
  }
}

nestedLoopDemo();

// Demonstrating return in nested functions
function outerFunction() {
  console.log("Start of outerFunction");

  function innerFunction() {
    console.log("Start of innerFunction");
    return; // Exits innerFunction only
    console.log("This will not be printed in innerFunction");
  }

  innerFunction();
  console.log("End of outerFunction");
}

outerFunction();
