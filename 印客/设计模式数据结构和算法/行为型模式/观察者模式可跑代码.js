class Subject {
  constructor() {
    this.observers = [];
  }
  addObserver(observer) {
    this.observers.push(observer)
  }
  removeObserver(observerId) {
    this.observers = this.observers.filter((v) => v !== observerId)
  }
  notify(data) {
    this.observers.forEach((observer) => observer.update(data))
  }
}

class Observer {
  constructor() {
    this.list = [];
    this.data = null;
  }
  update(data) {
    this.data = data
  }
}
const subject = new Subject();
const observer1 = new Observer();
const observer2 = new Observer();
subject.addObserver(observer1);
subject.addObserver(observer2);
subject.notify('testdata');
console.log('observer1==>', observer1.data)