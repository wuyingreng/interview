const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    // mode 可选 development 或 production ，默认为后者
    // production 会默认压缩代码并进行其他优化（如 tree shaking）
    mode: 'production',
	// entry,output是打包相关的
    entry: path.join(__dirname, 'src', 'index'),
    output: {
        // 根据代码的内容算出一个hash的值
        filename: 'bundle.[contenthash].js',
        path: path.join(__dirname, 'dist')
    },
    // 提供给babel用来降级语法用的
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
    // 打包出一个线上的代码，没有必要用服务了。
    // devServer: {
    //     port: 3000,
    //     open: true,  // 自动打开浏览器
    // }
}

