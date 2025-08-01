// 输出filelist.md 包含生成的资源 文件名 文件数量
class FileListPlugin {
  constructor(options = {}) {
    this.options = options
    this.filename = this.options.filename || 'filelist.md'
  }
  apply(compiler) {
    compiler.hooks.emit.tap('FileListPlugin', (compilation) => {
      const { filename: fileName } = this

      const { assets } = compilation

      const fileCount = Object.keys(assets).length

      let content = `# 本次打包共生成${fileCount}个文件 \n \n`

      for (let filename in assets) {
        content += `- ${filename} \n`
      }

      compilation.assets[fileName] = {
        source: function () {
          return content
        },
        size: function () {
          return content.length
        },
      }
    })
  }
}

exports = module.exports = FileListPlugin
