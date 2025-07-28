Loading.show()
Loading.show();

//全局单实例的loading
let fullScreenLoading;
// duration:
// cb
const loading = (options = {}) => {
  const defaultOptions = {}
  // 如果当前已有实例，返回旧的。
  options = merge({}, defaultOptions, options);
  if (options.fullscreen && fullscreenLoading) {
    return fullScreenLoading;
  }
  // 如果当前没有实例，返回新创建
  const loajingInstance = new LoadingConstructor({
    element: document.createElement('div'),
    data: options
  })
  if (options.fullScreen) {
    fullScreenLoading = loajingInstance;
  }
}

mounted(){
  const loadingA = this.$loading({
    text: 'a',
    fullScreen: true
  });
  const loadingB = this.$loading({
    text: 'b', fullScreen: true
  })
}