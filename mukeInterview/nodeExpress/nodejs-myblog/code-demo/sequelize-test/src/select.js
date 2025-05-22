const Sequelize = require('sequelize')
const { User, Blog } = require('./model')

!(async function () {

    // // 查询一条数据 findOne （登录）
    // const zhangsan = await User.findOne({
    //     where: {
    //         username: 'zhangsan',
    //         // password: '123'
    //         password: 'xxx'
    //     }
    // })
    // console.log('zhangsan', zhangsan && zhangsan.dataValues)

    // 查询多条数据 findAll
    const blogList = await Blog.findAll({
        where: {
            author: 'zhangsan',
            title: {
                [Sequelize.Op.like]: '%标题1%' // 模糊查询，对比 sql 语句
            }
        },
        order: [
            ['id', 'desc'] // 排序，对比 sql 语句
        ]
    })
    console.log('blogList', blogList.map(item => item.dataValues))

})()