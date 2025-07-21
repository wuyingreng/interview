exports.a = 'a';
module.exports.b = 'b';

// // 生成了一个新的引用地址和前面的就没有关系了。
module.exports = {
  d: 'c'
}

