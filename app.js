// require
const express = require('express')
const app = express()
const session = require('express-session')
const port = 3000
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const routes = require('./routes')
const usePassport = require('./config/passport')   //  在config/passport中設定passport使用細節
const flash = require('connect-flash')

// 加入這段 code, 僅在非正式環境時, 使用 dotenv
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

require('./config/mongoose')  //執行app.js時會一併執行mongoose.js



//use
app.use(session({               
    secret: process.env.SESSION_SECRET,
    resave: false,              //  每次使用者發出request時，是否即使 Session 沒做變動，強制重新儲存進 Store。
    saveUninitialized: true     //  是否強制將未初始化的 Session 儲存至 Store。（新產生的 Session）
}))
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(flash())
usePassport(app)  //  app 使用passport


//  global middleware
app.use((req, res, next) => {       //  擺在use(routes)之前，以確定每次發出request給路由時均會通過此函式，看是否有認證過並找到user，若無則res.locals.isAuthenticated及res.locals.user均為undefined
    res.locals.isAuthenticated = req.isAuthenticated()
    res.locals.user = req.user
    res.locals.success_msg = req.flash("success_msg")
    res.locals.warning_msg = req.flash("warning_msg")
    // console.log(res.locals) 
    next()
})
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

