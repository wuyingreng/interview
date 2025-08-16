const obj = {
  nestedObj: {
    foo: 'bar'
  }
};


const handler = {
  get(target, prop, receiver) {
    const value = Reflect.get(target, prop, receiver)
    if (typeof value === 'object' && value !== null) {
      return new Proxy(value, handler)
    }
    console.log('get', prop, target[prop])
    return value
  },
  set(target, property, value) {
    console.log('setter')
    target[property] = value
    console.log(`Setting property '${property}' to '${value}'`)
    return true
  }
}
const proxyObj = new Proxy(obj, handler);
proxyObj.nestedObj.foo = 'test';