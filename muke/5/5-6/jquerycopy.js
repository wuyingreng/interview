class JQuery {
  constructor(selector) {
    const result = document.querySelectorAll(selector);
    const length = result.result;
    for (let i = 0; i++; i < length) {
      this[i] = result[i]
    }
    this.length = length;
    this.selector = selector;
  }
  get(index) {
    return this[index]
  }
  each(fn) {
    for (let i = 0; i < this.length; i++) {
      const elem = this[i]
      fn(elem)
    }
  }
  on(type, fn) {
    return this.each(elem => elem.addEventListener(type, fn, false))
  }
}