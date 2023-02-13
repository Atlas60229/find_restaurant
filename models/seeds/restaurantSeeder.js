const Restaurant = require('../restaurant')
const restaurants = require('./fakeRestaurant').results
// 加入這段 code, 僅在非正式環境時, 使用 dotenv
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}
const dataBase = require('../../config/mongoose')
const bcrypt = require('bcryptjs')
const User = require('../user')
const SEED_USER1 = {
    name: "",
    email: "user1@example.com",
    password: "12345678"
}
const SEED_USER2 = {
    name: "",
    email: "user2@example.com",
    password: "12345678"
}


dataBase.once('open', () => {
    console.log('MongoDB connected!')
    //建立種子資料

    // user = User.findOne({ eamil: SEED_USER1.email })
    // if (user) {
    //     console.log('種子使用者已存在!')
    //     return process.exit()
    // }


    bcrypt
        .genSalt(10)
        .then(salt => bcrypt.hash(SEED_USER1.password, salt))
        .then(hash => User.create({
            name: SEED_USER1.name,
            email: SEED_USER1.email,
            password: hash
        }))
        .then(user => {
            const userID = user._id
            return Promise.all(Array.from(
                [0, 1, 2],
                i => Restaurant.create({
                    name: restaurants[i].name,
                    category: restaurants[i].category,
                    image: restaurants[i].image,
                    location: restaurants[i].location,
                    phone: restaurants[i].phone,
                    google_map: restaurants[i].google_map,
                    rating: restaurants[i].rating,
                    description: restaurants[i].description,
                    userID
                })
            ))
        })

    bcrypt
        .genSalt(10)
        .then(salt => bcrypt.hash(SEED_USER2.password, salt))
        .then(hash => User.create({
            name: SEED_USER2.name,
            email: SEED_USER2.email,
            password: hash
        }))
        .then(user => {
            const userID = user._id
            return Promise.all(Array.from(
                [3, 4, 5],
                j => Restaurant.create({
                    name: restaurants[j].name,
                    category: restaurants[j].category,
                    image: restaurants[j].image,
                    location: restaurants[j].location,
                    phone: restaurants[j].phone,
                    google_map: restaurants[j].google_map,
                    rating: restaurants[j].rating,
                    description: restaurants[j].description,
                    userID
                })
            ))
        })

        .then(() => {
            console.log('seed established'),
            process.exit()
        })


})