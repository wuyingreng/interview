function logitContructor() {
  console.log('logit');
  // 类装饰器只能接收一个参数
  return function (target: any) {
    console.log('in logit');
  }
}
function logitProperty() {
  console.log('logit2');
  // 属性装饰器只能接收两个参数
  return function (target: any, propertyKey: string) {
    console.log('in logit2 target', target, 'propertyKey', propertyKey, 'descriptor', descriptor);
  }
}
function logitFunc() {
  console.log('logit2');
  // 普通方法装饰器只能接收三个参数
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    console.log('in logit2 target', target, 'propertyKey', propertyKey, 'descriptor', descriptor);
  }
}

@logitContructor()
class ClassA {
  @logitProperty()
  name: string;
  constructor(name: string) {
    this.name = name;
  }
  @logitFunc()
  router() {
    console.log('in router');
  }
}

const c = new ClassA('Emily');
c.router();