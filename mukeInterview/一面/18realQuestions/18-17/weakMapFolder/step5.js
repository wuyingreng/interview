
const weakmap = new WeakMap();
const userInfo = { name: '双越' };
const cityInfo = { city: '北京' };
// 建立一种关联关系，两者相互不影响。而且不影响彼此的销毁逻辑
weakmap.set(userInfo, cityInfo)