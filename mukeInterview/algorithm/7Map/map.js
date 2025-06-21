const map = new Map();

// 增
map.set('a', 'aa')
map.set('b', 'bb')

// 查
map.get('a')

// 删除
// map.delete('a')
// // 全部删除
// map.clear()

// 改
map.set('a', 'a2')

console.log(map.size, Array.from(map))