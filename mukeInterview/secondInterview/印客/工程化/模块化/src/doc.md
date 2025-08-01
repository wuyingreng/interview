# 模块化开发&webpack

Q:

- 从 0-1 使用 webpack 进行工程搭建 vue react ！！！
- 对 webpack 执行过程
- 常用的 plugins 自定义自己的插件 tapable 事件机制
- 常用的 loaders 自定义自己的 loader 原理 babel-loader ast
- 优化
  - 体积：
  - 速度：

## 执行过程

- entry 入口
- module 模块 一个模块对应一个文件
- chunk 代码块 由多个模块组成 如果有异步模块的化 会单独拆出 chunk
- loader 模块转换器
- plugin 扩展插件

### 流程概括

- 初始化参数 合并参数 options
- 开始编译 options Compiler 对象 加载所有插件（事件注册）执行对象 run 方法 开始执行编译
- 确定入口 entry
- 编译模块 moduleGraph
- chunkGraph main (moduleGraph) => import ('asymcmodule')
- 输出资源 把 chunk 输出到文件列表中 done emit

## webpack 配置

- entry
  string './src/index.js'
- array ['./src/index.js', '']
- object {a:'./src/index.js', b: ''} key 为 chunk name => js main
  =》多入口
- output 输出文件配置
  filename

  - id,
  - name,
  - hash '[name][hash].js' 基于整体项目构建过程生成唯一的哈希值
  - chunkhash '[name][chunkhash].js' 每个代码块维度生成哈希

    - publicPath 线上资源的 url 前缀
      基础包 antd

    - library 导出库的名称 antd
    - libraryTarget 以何种的方式导出库 commonjs module umd

- module 如何处理模块

  - rules 配置模块的读取和解析规则
    - test
    - use 默认从右往左 执行 enforce
    - 可以传入参数 options

- resolve
  - 如何寻找模块所对应的文件

```js
resolve: {
    alias: {
        '@': './src'
    }
    extensions:[".js", ".json"] // require('./data')
}
```

#### 总结

- entry
- output
- resolve
- module
- plugin 配置插件

Q: 为什么对文件进行打包？

- 转换文件 更好地兼容性 babel core-js polyfill
- 产物进行优化 代码压缩 代码丑化 减少文件体积 源码安全问题
- 不同文件资源

### 如何实现自定义 loader

职责单一 需要多步转换 通过多个 loader 转换
