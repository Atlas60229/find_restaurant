const mongoose = require('mongoose')


// 資料庫設定
// 加入這段 code, 僅在非正式環境時, 使用 dotenv
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true }) // 設定連線到 mongoDB
const dataBase = mongoose.connection 


dataBase.on('error',()=>{
    console.log("mongoDB error")
})
dataBase.once('open',()=>{
    console.log('MongoDB connected!')
})

module.exports = dataBase