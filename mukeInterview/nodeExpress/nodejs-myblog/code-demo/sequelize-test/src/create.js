const { User, Blog } = require('./model')

// 内部使用 await ，所以必须用 async 函数包裹（注意 ! 的作用）
!(async function() {
    // 创建用户
    // const zhangsan = await User.create({
    //     username: 'zhangsan',
    //     password: '123',
    //     realname: '张三',
    // })
    // console.log('zhangsan', zhangsan.dataValues)

    // 创建博客
    const blog1 = await Blog.create({
        title: '博客标题1',
        content: '博客内容1',
        author: 'zhangsan',
    })
    console.log('blog1', blog1.dataValues)

})()
