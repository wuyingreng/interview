// webpack 插件调用机制演示

// 模拟 webpack 内部的插件系统
class MockCompiler {
  constructor() {
    this.hooks = {
      emit: {
        tap: (name, callback) => {
          this.emitCallback = callback;
        }
      }
    };
    this.assets = {};
  }

  // 模拟触发 emit 事件
  triggerEmit() {
    console.log('Compiler: 触发 emit 事件');
    if (this.emitCallback) {
      this.emitCallback({
        assets: this.assets
      });
    }
  }
}

// 模拟 webpack 主类
class MockWebpack {
  constructor(config) {
    this.config = config;
    this.plugins = config.plugins || [];
  }

  run() {
    console.log('=== Webpack 启动 ===');

    // 1. 创建 compiler 实例
    const compiler = new MockCompiler();
    console.log('1. 创建 Compiler 实例');

    // 2. 调用所有插件的 apply 方法
    console.log('2. 调用插件的 apply 方法');
    this.plugins.forEach((plugin, index) => {
      console.log(`   调用插件 ${index + 1}: ${plugin.constructor.name}`);
      plugin.apply(compiler);  // 这里调用 apply 方法！
    });

    // 3. 模拟编译过程
    console.log('3. 开始编译过程');
    compiler.triggerEmit();

    console.log('4. 编译完成');
  }
}

// 您的 FileListPlugin
class FileListPlugin {
  constructor(options = {}) {
    this.options = options;
    this.filename = this.options.filename || 'filelist.md';
    console.log(`FileListPlugin: 构造函数被调用，filename = ${this.filename}`);
  }

  apply(compiler) {
    console.log('FileListPlugin: apply 方法被 webpack 调用');

    compiler.hooks.emit.tap('FileListPlugin', (compilation) => {
      console.log('FileListPlugin: emit 事件被触发');

      const { filename: fileName } = this;
      const { assets } = compilation;
      const fileCount = Object.keys(assets).length;

      let content = `# 本次打包共生成${fileCount}个文件 \n \n`;

      for (let filename in assets) {
        content += `- ${filename} \n`;
      }

      compilation.assets[fileName] = {
        source: function () {
          return content;
        },
        size: function () {
          return content.length;
        },
      };

      console.log(`FileListPlugin: 生成了 ${fileName} 文件`);
    });
  }
}

// 模拟 webpack 配置
const config = {
  plugins: [
    new FileListPlugin({ filename: 'custom-filelist.md' })
  ]
};

// 运行演示
console.log('=== 插件调用机制演示 ===\n');
const webpack = new MockWebpack(config);
webpack.run();

console.log('\n=== 总结 ===');
console.log('1. webpack 在启动时会遍历所有插件');
console.log('2. 对每个插件调用 apply(compiler) 方法');
console.log('3. 插件在 apply 方法中注册事件监听器');
console.log('4. 当相应事件触发时，插件的回调函数被执行');
console.log('5. 整个过程由 webpack 内部管理，开发者不需要手动调用'); 