const { Compilation } = require("webpack");

class FileListPlugin {
  constructor(options) {
    this.options = options;
    this.fileName = this.options.fileName
  }
  apply(compiler) {
    compiler.hooks.emit.tap('FileListPlugin', (compilation) => {
      const { fileName } = this;
    })
  }
}