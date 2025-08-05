// 单例模式
// 让你能够保证一个类只有一个实例，并且提供一个访问该实例的全局的节点

const Singleton = function () {
  this.instance = null;
};

Singleton.getInstance = function () {
  if (!this.instance) {
    this.instance = new Singleton();
  }
  return this.instance;
};

const a = Singleton.getInstance();
const b = Singleton.getInstance();

console.log(a === b); // true

// scene
// 实现全局loading
let fullscreenLoading;
const Loading = (options = {}) => {
  options = merge({}, defaults, options);

  if (options.fullscreen && fullscreenLoading) {
    return fullscreenLoading;
  }

  let parent = options.body ? document.body : options.target;

  let instance = new LoadingConstructor({
    el: document.createElement('div'),
    data: options,
  });

  if (options.fullscreen) {
    fullscreenLoading = instance;
  }

  return instalce;
};

// Loading({
//   target: document.getElementById('#root'),
// });

// vue

mounted() {
    const firstLoading = this.$loading({
        text: 'first loading'
    })

    const secondLoading = this.$loading({
        text: 'secondLoading '
    })

    console.log(firstLoading === secondLoading)
}

// 总结
// 保证全局对象的唯一
// 底层包 utils 提供单例实例  v1.1 v1.2 内容 CR 