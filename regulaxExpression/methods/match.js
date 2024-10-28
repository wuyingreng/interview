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