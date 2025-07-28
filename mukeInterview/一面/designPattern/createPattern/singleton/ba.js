class Request {
  constructor() {
    this.request = 'test'
  }
}


class BARequest {
  constructor() {
    this.request = new Request();
    this.defaultBasePath = 'abc';
  }
  init(options, defaultBasePath) {
    this.request = new Request(options);
    this.defaultBasePath = defaultBasePath;
  }
}

const baRequest = new BARequest();
console.log('baRequest', baRequest)
baRequest.init({}, 'cde');
console.log('baRequest', baRequest)
// 结果就是把整个baRequest改掉了