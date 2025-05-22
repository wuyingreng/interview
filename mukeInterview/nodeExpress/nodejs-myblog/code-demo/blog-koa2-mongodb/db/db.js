const mongoose = require('mongoose')

const url = 'mongodb://localhost:27017'
const dbName = 'myblog'

// mongoose.set('useFindAndModify', false) // 升级 mongoose 版本之后，不再需要（2022.08）

mongoose.connect(`${url}/${dbName}`, {
    // useNewUrlParser: true, // 升级 mongoose 版本之后，不再需要（2022.08）
    // useUnifiedTopology: true // 升级 mongoose 版本之后，不再需要（2022.08）
})

const db = mongoose.connection

// 发生错误
db.on('error', err => {
    console.error(err)
})

// // 连接成功
// db.once('open', () => {
//     console.log('mongoose connect success…')
// })

module.exports = mongoose
