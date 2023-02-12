// const
const express = require('express')
const router = express.Router()
const home = require('./modules/home')
const restaurants = require('./modules/restaurants')
const users = require('./modules/users')
// const { authenticator } = require('../middleware/auth')
// const auth = require('./modules/auth')

//use
router.use('/users', users)  // 將網址結構符合 /users 字串的 request 導向 todos 模組 
router.use('/restaurants', restaurants) // 將網址結構符合 /restaurants 字串的 request 導向 restaurants 模組 
// router.use('/auth', auth)
router.use('/', home) // 將網址結構符合 / 字串的 request 導向 home 模組 

module.exports = router