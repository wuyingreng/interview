const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    // mode 可选 development 或 production ，默认为后者
    // production 会默认压缩代码并进行其他优化（如 tree shaking）
    mode: 'development',
	// entry,output是打包相关的
    entry: path.join(__dirname, 'src', 'index'),
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include:  path.join(__dirname, 'src'),
                exclude: /node_modules/
            },
        ]
    },
	// 插件相关
    plugins: [
        new HtmlWebpackPlugin({
			// 找到已有的index.html
            template: path.join(__dirname, 'src', 'index.html'),
			// 产出的index.html,会output中的其他放置在一起
            filename: 'index.html'
        })
    ],
    devServer: {
        port: 3000,
        open: true,  // 自动打开浏览器
    }
}

