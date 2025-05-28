/**---------     基本的API      ---------*/

const map = new Map([
  ['key1', 'hello'],
  ['key3', { x: 100 }],
  ['key2', 100],
]);

map.set('name', 'Emily')

map.set('key1', 'hello world');

map.delete('key3')

map.forEach((value, key) => {
  console.log('key==>', key, 'value==>', value)
})
console.log('map.size==>', map.size)

/**---------      map的key可以为任意值     ---------*/

const obj = { name: 'Emily' }
map.set(obj, 'object keys');


const fun = () => { console.log('i am function') }
map.set(fun, 'function keys');
console.log('map==>', map)

/**
 * 用于对象之间建立管理
 * 这么写是有引用关系的
 * const obj1 = { name: 'Emily' }
* const obj2 = { city: '深圳' }
* obj1.cityInfo = obj2;
*/

const obj1 = { name: 'Emily' };
const obj2 = { city: '深圳' }

// 关联但是没有引用关系，保持独立
map.set(obj1, obj2);


/**---------      map是有序的还很快     ---------*/

// object能有多快
const speedObj = {}
for (let i = 0; i < 100 * 10000; i++) {
  speedObj[i] = i
}

// object能有多快
const speedMap = new Map()
for (let i = 0; i < 100 * 10000; i++) {
  map.set(i, i)
}
/**
 * console.time和console.endTime对应的string要是一样的，这样才能打印中间的时间，否则会报错
 * 下面直接写数字，不要写50*1000这种。因为50*1000的计算时间量比较大，导致object和map的
 * 区别就不大了
*/

console.time('obj find start')
speedObj[50000]
console.timeEnd('obj find start')

console.time('map find start')
map.get(50000)
console.timeEnd('map find start')

console.time('obj  delete')
speedObj[51000]
console.timeEnd('obj  delete')

console.time('map  delete')
map.delete(51000)
console.timeEnd('map  delete')