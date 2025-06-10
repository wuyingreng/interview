class Queue {
  items = [];

  push(element) {
    this.items.push(element);
  }

  shift() {
    return this.items.shift();
  }

  peek() {
    return this.items[this.items.length - 1];
  }
}