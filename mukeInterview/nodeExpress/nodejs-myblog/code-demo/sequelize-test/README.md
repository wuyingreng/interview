# sequelize test

- 初始化环境 `npm init -y`
- 安装插件 `npm install mysql2 sequelize -d`

- 创建并测试连接 `src/db.js` （生产环境下使用**连接池**，参考微博项目 ppt ）
- 创建模型 `src/model.js`
- 同步模型到数据库 `src/sync.js`

- 新建数据 `src/create.js` （完成后执行 sql 语句来查询验证）
- 更新数据 `src/update.js`
- 查询数据 `src/select.js`
- 删除数据 `src/delete.js`
