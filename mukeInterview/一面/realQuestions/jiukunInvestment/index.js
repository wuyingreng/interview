const obj = { 1: 'a', true: 'b', null: 'c', undefined: 'd' };
// 数字 → 字符串
console.log(obj[1]);         // 'a'，等价于 obj['1']
console.log(obj['1']);       // 'a'


// 布尔值 → 字符串
console.log(obj[true]);      // 'b'，等价于 obj['true']
console.log(obj['true']);    // 'b'

// null/undefined → 字符串
console.log(obj[null]);      // 'c'，等价于 obj['null']
console.log(obj[undefined]); // 'd'，等价于 obj['undefined']

const obj2 = {};
obj2[{}] = 'hello';
console.log(obj2['[object Object]']); // 'hello'

const s = Symbol('x');
const obj3 = { [s]: 'symbol value' };
console.log(obj3[s]);        // 'symbol value'
console.log(obj3['s']);      // undefined