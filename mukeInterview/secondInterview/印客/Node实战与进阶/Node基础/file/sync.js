

const {writeFileSync,mkdirSync,appendFileSync,readFileSync,readdirSync} =require('fs');

// 创建一个文件夹，相对的是执行脚步的命令所在的位置的。不能重复创建。不然报错EEXIST: file already exists, mkdir './temp'
mkdirSync('./temp');
// 写入文件内容
writeFileSync('./index.txt','青花瓷','utf8');
// 追加文件内容
appendFileSync('./index.txt','烟花易冷','utf8');
// 给出当前目录下的文件列表，相当于ls，返回的是一个数组。得加个参数
console.log(readdirSync('./'))