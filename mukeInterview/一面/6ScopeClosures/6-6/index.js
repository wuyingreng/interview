/**
 * 闭包隐藏数据，只提供api
 * data只能通过set去更改，get去访问，不能直接更改
 */

function creatCache() {
  // 闭包中的数据，被隐藏，不被外界访问
  const data = {};
  return {
    set: function (key, val) {
      data[key] = val
    },
    get: function (key) {
      return data[key]
    },
  }

}

const c = creatCache();
c.set('a', 100)
console.log("c.get('a')==>"), c.get('a', 100);

console.log('data.b==>', data.b)

