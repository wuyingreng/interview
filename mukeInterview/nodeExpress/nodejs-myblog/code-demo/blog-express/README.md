# blog express

## 升级 redis 4.x

- 数据库连接 `db/redis.js`
    - 增加 `legacyMode: true`
    - 注意 `url` 的格式
    - 使用 `connect()` 连接
- 中间件配置 `app.js` ，增加 `resave` 和 `saveUninitialized` （文档里没有这俩的作用，但不写控制台会提示）
