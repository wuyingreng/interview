const Blog = require('../models/Blog')

!(async () => {

    // // 新建博客
    // const blog1 = await Blog.create({
    //     title: '标题3',
    //     content: '内容3',
    //     author: 'shuangyue'
    // })
    // console.log(blog1)

    // // 获取列表
    // const list = await Blog.find({
    //     // author: 'zhangsan'
    //     title: /A/ // 正则表达式，模糊查询
    // }).sort({ _id: -1 })
    // console.log(list)

    // // 根据 id 获取单个博客
    // const blog3 = await Blog.findById('5f4cc1824e9b73583b69b404')
    // console.log(blog3)

    // // 修改博客
    // const res = await Blog.findOneAndUpdate(
    //     { _id: '5f4cc1824e9b73583b69b404' }, // 条件
    //     { content: '内容3内容3内容3' },
    //     {
    //         new: true // 返回修改之后的最新的内容，默认为 false
    //     }
    // )
    // console.log(res)

    // // 删除
    // const res = await Blog.findOneAndDelete({
    //     _id: '5f4cc1824e9b73583b69b404',
    //     author: 'shuangyue' // 验证一下作者，增加安全性，防止误删
    // })
    // console.log(res)
})()
