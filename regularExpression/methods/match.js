// match 处理|
const str = '2023%7C2024';
// | 是特殊字符要转义成字面量，否则会匹配%7C
const matchResult = str.match(/|/);
// [ '', index: 0, input: '2023%7C2024', groups: undefined ]
console.log('matchResult==>', matchResult);

const matchResultWithParser = str.match(/\|/);
// null
console.log('matchResultWithParser==>', matchResultWithParser);


const matchResultWithString = str.match(/"|"/);
// null
console.log('matchResultWithString==>', matchResultWithString); 