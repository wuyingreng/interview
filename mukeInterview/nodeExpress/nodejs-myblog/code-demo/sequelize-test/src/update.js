const { Blog } = require('./model')

!(async function () {

    const res = await Blog.update(
        // 要更新的内容
        {
            content: '博客内容111'
        },
        // 条件
        {
            where: {
                id: 2
            }
        }
    )
    console.log('res', res.length)

})()
