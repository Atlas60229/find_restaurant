const dataBase = require('../../config/mongoose')
const Restaurant = require('../restaurant')
const restaurants = require('./fakeRestaurant').results


dataBase.once('open',()=> {
    console.log('MongoDB connected!')

    //建立種子資料
    restaurants.forEach(restaurant => {
        Restaurant.create({
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