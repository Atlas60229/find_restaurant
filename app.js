// require
const express = require('express')
const app = express()
const port = 3000
const exphbs = require('express-handlebars')

const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const routes = require('./routes')

require('./config/mongoose')  //執行app.js時會一併執行mongoose.js


//use
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(routes)

// 設定資料庫
    //已轉移到conig/mongoose



// 設定template engine:
app.engine('handlebars', exphbs.engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// 設定路由
    // 已轉移到routes folder

// 啟動server
app.listen(port,()=>{
    console.log('success initiate Server')
})