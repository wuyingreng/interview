
const obj1 = { 1: 11, 22: 22, 3: 33 }
console.log('obj1.keys==>', Object.keys(obj1)) // [ '1', '3', '22' ]
const obj2 = { 2: 11, 1: 22, 3: 33 }
console.log('obj2.keys==>', Object.keys(obj2)) //[ '1', '2', '3' ]

const map1 = new Map();
map1.set(1, 11);
map1.set(22, 22);
map1.set(3, 33);
console.log('map1.keys==>', map1.keys()) // [Map Iterator] { 1, 22, 3 }
const map2 = new Map();
map2.set(22, 11);
map2.set(1, 22);
map2.set(3, 33);

console.log('map2.keys==>', map2.keys()) 
