const Koa = require('koa')
const Router = require('koa-router') // 导入 Router 类
const app = new Koa()
const router = new Router() // 使用 new 实例化



router.get('/string', async (ctx) => {
  ctx.body = 'koa2 string'
})

router.get('/json', async (ctx) => {
  ctx.body = {
    title: 'koa2 json'
  }
})

// 挂载路由中间件
app.use(router.routes())
app.use(router.allowedMethods()) // 自动处理 OPTIONS 请求
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
module.exports = app