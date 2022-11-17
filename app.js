// require
const express = require('express')
const app = express()
const port = 3000
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const Restaurant = require('./models/restaurant')
const restaurant = require('./models/restaurant')

//use
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))


// 設定資料庫
// 在非正式環境時, 使用 dotenv
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

// 設定template engine:
app.engine('handlebars', exphbs.engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// 設定路由
    // 首頁：
app.get('/',(req,res)=>{

    Restaurant.find()
        .lean()
        .then(restaurants => res.render('index', {restaurants}))
        .catch(error => console.error(error))
    
        
})

    // 新增新餐廳
    app.get('/restaurants/new',(req,res)=>{
        res.render('new')
    })
    
    app.post('/restaurants/new', (req, res) => {
        const { name, category, image, location, phone, google_map, rating, description } = req.body //參考Noelle
        return Restaurant.create({
          name, category, image, location, phone, google_map, rating, description
        })
          .then(() => res.redirect('/'))
          .catch(error => console.log(error))
      })

    // 餐廳細節：
app.get('/restaurants/:id',(req,res)=>{
    const id = req.params.id

    return Restaurant.findById(id)
      .lean()
      .then((restaurant) => res.render('detail', { restaurant }))
      .catch(error => console.log(error))
})



    // 搜尋：
app.get('/search',(req,res)=>{
    Restaurant.find()
    .lean()
    .then(restaurants => {
        const foundRestaurants = restaurants.filter((restaurant)=>{
            const inputKeyword = req.query.keyword.toLowerCase().trim()
            return restaurant.name.toLowerCase().includes(inputKeyword) || restaurant.category.includes(inputKeyword)
        })
        res.render('index', {restaurants: foundRestaurants, keyword: req.query.keyword})})
    .catch(error => console.error(error))
})



    // edit
app.get('/restaurants/:id/edit',(req,res)=>{
    const id = req.params.id
    return Restaurant.findById(id)
        .lean()
        .then((restaurant) => res.render('edit', { restaurant }))
        .catch(error => console.log(error))
})

app.post('/restaurants/:id/edit', (req, res) => {
    const id = req.params.id
    const { name, category, image, location, phone, google_map, rating, description } = req.body //參考Noelle
    return Restaurant.findById(id)
      .then(restaurant => {
        restaurant.name = name
        restaurant.category = category
        restaurant.image = image
        restaurant.location = location
        restaurant.phone = phone
        restaurant.google_map = google_map
        restaurant.rating = rating
        restaurant.description = description
        return restaurant.save()
      })
      .then(()=> res.redirect(`/restaurants/${id}`))
      .catch(error => console.log(error))
  })

    // delete
app.get('/restaurants/:id/delete', (req, res) => {
    const id = req.params.id

    return Restaurant.findById(id)
      .then(restaurant => restaurant.remove())
      .then(() => res.redirect('/'))
      .catch(error => console.log(error))
  })

// 啟動server
app.listen(port,()=>{
    console.log('success initiate Server')
})