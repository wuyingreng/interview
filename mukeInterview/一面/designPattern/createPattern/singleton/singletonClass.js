const Singleton = function () {
  this.instance = null
}
Singleton.getInstance = function () {
  if (!this.instance) {
    this.instance = new Singleton()
  }
  return this.instance;
}
const a = Singleton.getInstance();
const b = Singleton.getInstance();
console.log(a === b)