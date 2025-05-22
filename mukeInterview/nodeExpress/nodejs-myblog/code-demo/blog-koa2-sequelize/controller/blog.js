const Sequelize = require('sequelize')
const xss = require('xss')
const Blog = require('../db/model/Blog')

async function getList(author = '', keyword = '') {
    // 拼接查询条件
    const whereOpt = {}
    if (author) whereOpt.author = author
    if (keyword) whereOpt.title = {
        [Sequelize.Op.like]: `%${keyword}%` // 模糊查询
    }

    // 执行查询
    const list = await Blog.findAll({
        where: whereOpt,
        order: [
            ['id', 'desc'] // 排序
        ]
    })

    return list.map(item => item.dataValues)
}

async function getDetail(id) {
    const blog = await Blog.findOne({
        where: {
            id,
        }
    })
    if (blog == null) return null
    return blog.dataValues
}

async function newBlog(blogData = {}) {
    // blogData 是一个博客对象，包含 title content author 属性
    const title = xss(blogData.title)
    // console.log('title is', title)
    const content = xss(blogData.content)
    const author = blogData.author

    const res = await Blog.create({
        title,
        content,
        author,
    })

    return {
        id: res.dataValues.id
    }
}

async function updateBlog(id, blogData = {}) {
    // id 就是要更新博客的 id
    // blogData 是一个博客对象，包含 title content 属性

    const title = xss(blogData.title)
    const content = xss(blogData.content)

    const res = await Blog.update(
        // 要更新的内容
        {
            title,
            content,
        },
        // 条件
        {
            where: {
                id,
            }
        }
    )

    if (res[0] >= 1) return true
    return false
}

async function delBlog(id, author) {
    const res = await Blog.destroy({
        where: {
            id,
            author,
        }
    })
    if (res >= 1) return true
    return false
}

module.exports = {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    delBlog,
}
