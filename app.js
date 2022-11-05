// require
const express = require('express')
const app = express()
const port = 3000
const exphbs = require('express-handlebars')
const restaurantList = require('./restaurant.json').results

app.use(express.static('public'))

//設定template engine:
app.engine('handlebars', exphbs.engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

//設定路由
app.get('/',(req,res)=>{
    res.render('index', {restaurant: restaurantList})
})

app.get('/restaurants/:id',(req,res)=>{
    const restaurant = restaurantList.filter((restaurant)=>{
        return String(restaurant.id) === req.params.id
    })
    res.render('show', {restaurant: restaurant[0]})
})

app.get('/search',(req,res)=>{
    const restaurants = restaurantList.filter((restaurant)=>{
        return restaurant.name.toLowerCase().includes(req.query.keyword.toLowerCase().trim())
    })
    
    res.render('index', {restaurant: restaurants, keyword: req.query.keyword})
})

//啟動server
app.listen(port,()=>{
    console.log('success initiate Server')
})