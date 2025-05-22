const Koa = require('koa');
const cors = require('koa-cors');

const app = new Koa();

// CORS 设置跨域
app.use(
  cors({
    origin: '*', // 或设置单个 origin
    // 其他配置参考 https://www.npmjs.com/package/koa-cors
  })
);

app.use(async ctx => {
  ctx.body = {
    errno: 0,
    msg: 'CORS koa2'
  }
});

app.listen(8000);