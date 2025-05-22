const Sequelize = require('sequelize')

const conf = {
    host: 'localhost',
    dialect: 'mysql',
}

// // 生产环境下，使用连接池（生产环境，会在项目代码中判断）
// conf.pool = {
//     max: 5, // 连接池中最大连接数量
//     min: 0, // 连接池中最小连接数量
//     idle: 10 * 1000 // 如果一个连接 10 秒钟内没有被使用过的话，那么就释放线程
// }

const seq = new Sequelize(
    'myblog_seq', // 数据库名称
    'root', // 用户名
    'Mysql_2019', // 密码
    conf
)

// // 测试连接
// seq.authenticate().then(() => {
//     console.log('sequelize connect success.')
// }).catch(() => {
//     console.log('sequelize connect fail...')
// })

module.exports = seq
