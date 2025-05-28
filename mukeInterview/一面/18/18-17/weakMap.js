/**---------  weakmap              ------------*/
/**
 * js垃圾清理机制，当一个变了没有被应用就会被清理掉
*/

const fn = () => {
  let obj = { name: 'Emily' }
}
fn()

/**
* 强引用
*/
const objnew = {}
const fnWithOutObj = () => {
  // 这个因为被objnew引用到了，所以不能被垃圾回收掉
  let obj = { name: 'Emily' }
  objnew.obj = obj;// 强引用

}
fnWithOutObj()
console.log('objNew==>', objnew)

/**
* weakmap弱引用。在外面打印weakmap看到的内容是空的
* WeakMap的键是弱引用，但值不是。如果值引用了键对象仍然可能导致内存泄漏。
* 但在用户的示例中，值是一个字符串，不涉及对键的引用，因此不存在此问题。
* weakmap没有forEach,size属性，方法也只有set,add,has 等基本方法
*/
const weakmap = new WeakMap();
const fnWithWeakMap = () => {
  const obj = { name: "Emily" }
  weakmap.set(obj, 'name info')
  // console.log('weakmapInside==>', weakmap)
}
fnWithWeakMap()
/**
 * 垃圾回收非实时的，导致不手动触发gc+setTimeout 显示不出来weakmap的效果
 * 原因一：垃圾回收未立即触发
* 垃圾回收是非实时的：JS 引擎不会在对象失去强引用的瞬间立即回收内存，而是根据策略（如内存压力）延迟执行。
* 测试代码运行太快：console.log(weakmap) 可能在 GC 触发前执行，因此条目尚未被清除。
*/
// 手动触发 GC（仅部分浏览器支持）chrome浏览器不存在
if (window.gc) window.gc();

setTimeout(() => {
  console.log("强引用移除后:", weakmap); // 条目应被清除
}, 1000);


/**
 *  场景二：对象直接的关联关系
 * 建立直接的关联关系，而且不影响彼此之间的销毁逻辑。
*/

const userInfo = { name: "Emily" };
const cityInfo = { city: "深圳" };
weakmap.set(userInfo, cityInfo);
weakmap.get(userInfo)

// 这么写当想销毁cityInfo的时候，因为userInfo还在用，所以销毁不了。
userInfo.cityInfo = cityInfo