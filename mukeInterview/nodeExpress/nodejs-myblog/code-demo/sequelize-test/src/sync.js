const seq = require('./db.js')

// 需要同步的模型
require('./model.js')

seq.authenticate().then(() => {
    console.log('sequelize connect success.')
}).catch(() => {
    console.log('sequelize connect fail...')
})

// 同步数据
seq.sync({ force: true }).then(() => {
    process.exit()
})
