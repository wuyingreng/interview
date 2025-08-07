

const {Buffer}=require('node:buffer');

// allocate /ˈæləkeɪt/
// <Buffer 00 00 00 00 00>
console.log(Buffer.alloc(5));
// <Buffer 61 61 61 61 61>
console.log(Buffer.alloc(5,'a'));

// <Buffer 68 65 6c 6c 6f 20 77 6f 72 6c 64>
console.log(Buffer.alloc(11, 'aGVsbG8gd29ybGQ=', 'base64'));


// toString 把buffer对象转变为字符串
console.log(Buffer.alloc(11, 'aGVsbG8gd29ybGQ=', 'base64').toString());