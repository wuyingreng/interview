const User = require('../models/User')

// 自执行的异步函数
!(async () => {

    // // 创建用户
    // const wang = await User.create({
    //     username: 'wangxiaoer',
    //     password: '123',
    //     realname: '王小二'
    // })
    // console.log(wang)

    // // 查询
    // const list = await User.find()
    // console.log(list)

    // 模拟登录
    const wang = await User.find({
        username: 'wangxiaoer',
        password: '123'
    })
    console.log(wang)
})()
