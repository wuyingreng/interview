// 今日题目：
// 封装一个能够统计重复的字符的函数，例如 aaabbbdddddfff 转化为 3a3b5d3f
// const str = 'aaabbbdddddfff';
// const calDepulicatedStr = (str) => {
// 	const map = new Map();
// 	for (let i of str) {
// 		if (!map.has(i)) {
// 			map.set(i, 1);
// 		} else {
// 			const count = map.get(i);
// 			map.set(i, count + 1);
// 		}
// 	};
// 	let result = '';

// 	for (let [key, val] of map.entries()) {
// 		result += `${val}${key}`
// 	}
// 	return result;
// }

// console.log('result==>', calDepulicatedStr(str))


// 参考答案：
// function compression(str) {
//   if (str.length == 0) {
//     return 0;
//   }
//   var len = str.length;
//   var str2 = '';
//   var i = 0;
//   var num = 1;
//   while (i < len) {// 要i<len 最后一个元素也是要处理的
//   	console.log('i',i,str[i+1])
//     if (str.charAt(i) == str.charAt(i + 1)) {
//       num++;
//     } else {
//       str2 += num;
//       str2 += str.charAt(i);
//       num = 1;
//     }
//     i++;
//   }
//   return str2;
// }
// // 测试：
// console.log(compression('aaabbbdddddfff')); // 3a3b5d3f

function compression(str){
	let str2='';
	let i=0;
	let num=1;
	const len=str.length;
	while(i<len){
		if(str.charAt(i)===str.charAt(i+1)){
			num++
		}else{
			str2+=num;
			str2+=str[i];
			num=1;
		};
		i++
	}
	return str2;
}

console.log(compression('aaabbbdddddfff'));