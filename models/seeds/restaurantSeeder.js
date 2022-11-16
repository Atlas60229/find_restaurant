const mongoose = require('mongoose')
const Restaurant = require('../restaurant')
const restaurants = require('./restaurant').results


if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
  }
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true }) // 設定連線到 mongoDB

const dataBase = mongoose.connection

dataBase.on('error',()=>{
    console.log("mongoDB error")
})

dataBase.once('open',()=> {
    console.log('MongoDB connected!')

    //建立種子資料
    restaurants.forEach(restaurant => {
        Restaurant.create({
            id: restaurant.id,
            name: restaurant.name,
            category: restaurant.category,
            image: restaurant.image,
            location: restaurant.location,
            phone: restaurant.phone,
            google_map: restaurant.google_map,
            rating: restaurant.rating,
            description: restaurant.description
          })
    
    });
    console.log('seed created!')
})