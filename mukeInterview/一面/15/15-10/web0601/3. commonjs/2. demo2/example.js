var counter = require('./lib').counter;
var numObj = require('./lib').numObj;
var incCounter = require('./lib').incCounter;

console.log(counter, numObj); // 3 { num: 3 }
incCounter(); //4
console.log(counter, numObj); // 3 { num: 4 }

console.log(incCounter()); // 5
