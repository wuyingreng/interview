//请按以下要求实现方法 fn ：遇到退格字符就删除前面的字符，遇到两个退格就删除两个字符
// 比较含有退格的字符串，"<-"代表退格键，"<"和"-"均为正常字符
// 输入："a<-b<-", "c<-d<-"，结果：true，解释：都为""
// 输入："<-<-ab<-", "<-<-<-<-a"，结果：true，解释：都为"a"
// 输入："<-<ab<-c", "<<-<a<-<-c"，结果：false，解释："<ac" !== "c"

/**
* 如何做呢。for of 看有几个退格字符
let str=''

*/
function fn(str1, str2) {
	console.log(handleStr(str1), handleStr(str2))
	return handleStr(str1) === handleStr(str2)
}

const handleStr = (str) => {
	let stack = [];

	for (let i = 0;  i < str.length;i++) {
		if (str[i] === '<' && str[i + 1] === '-' ) {
			i++
			if(stack.length>0){
				stack.pop();
			}
		}  else {
			stack.push(str[i])
		}
	}
	console.log('stack==>', stack)
	return stack.join('');
}

console.log('demo1=>', fn("a<-b<-", "c<-d<-"));
console.log('demo22=>', fn("<-<-ab<-", "<-<-<-<-a"));
console.log('demo1=>', fn("<-<ab<-c", "<<-<a<-<-c"));