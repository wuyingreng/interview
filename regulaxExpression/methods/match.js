/** -------- 数组只返回一个元素      -------- ***/
const regex = /formatMessage\(\s*{\s*id:\s*['"]([^'"]+)['"],?\s*}\s*\)/gm;
const formatMessageStr = `
formatMessage({
      id: 'bae.admin.sellerType.SuperMart_Retail',
    })
`;

// 返回值是一个数组。打印了一个完全匹配
const formatMessageStrMatches = formatMessageStr.match(regex);
console.log(formatMessageStrMatches);


const abcStr = "Hi, do you know your abc's?"
const abcStrMatches = abcStr.match(/abc/)
console.log(abcStrMatches);


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