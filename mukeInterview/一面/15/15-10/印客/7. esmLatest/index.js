import { basicNum, add, counter, numObj, incCounter } from './math.js';
console.log('basicNum==>', basicNum);
console.log('add==>', add(1, 2));


console.log(counter, numObj); // 3 { num: 3 }
incCounter(); //4
console.log(counter, numObj); // 4 { num: 4 }

console.log(incCounter()); // 5