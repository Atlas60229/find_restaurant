const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')

//首頁
router.get('/',(req,res)=>{
    const userID = req.user._id
    Restaurant.find({userID}) //取得資料庫資料
        .lean() //內建整理資料function
        .then( restaurants => res.render('index', {restaurants}))
        .catch(error => console.error(error))      
})

// 搜尋：
router.get('/search',(req,res)=>{
    const userID = req.user._id
    Restaurant.find({userID})
              .lean()
              .then(restaurants => {
                const foundRestaurants = restaurants.filter((restaurant)=>{
                const inputKeyword = req.query.keyword.toLowerCase().trim()
                return restaurant.name.toLowerCase().includes(inputKeyword) || restaurant.category.includes(inputKeyword)
                })
                res.render('index', {restaurants: foundRestaurants, keyword: req.query.keyword})})
              .catch(error => console.error(error))
  })

// 排序：
router.get('/asc',(req,res)=>{
    const userID = req.user._id
    Restaurant.find({userID}) //取得資料庫資料
        .lean() //內建整理資料function
        .sort({name: 'asc'}) //反序：desc
        .then( restaurants => res.render('index', {restaurants}))
        .catch(error => console.error(error))      
})
  
router.get('/desc',(req,res)=>{
    const userID = req.user._id
    Restaurant.find({userID})
        .lean() //內建整理資料function
        .sort({name: 'desc'}) //反序：desc
        .then( restaurants => res.render('index', {restaurants}))
        .catch(error => console.error(error))      
})

router.get('/location',(req,res)=>{
    const userID = req.user._id
    Restaurant.find({userID})
        .lean() //內建整理資料function
        .sort({location: 'asc'}) //反序：desc
        .then( restaurants => res.render('index', {restaurants}))
        .catch(error => console.error(error))      
})
  
router.get('/catogory',(req,res)=>{
    const userID = req.user._id
    Restaurant.find({userID})
        .lean() //內建整理資料function
        .sort({category: 'asc'}) //反序：desc
        .then( restaurants => res.render('index', {restaurants}))
        .catch(error => console.error(error))      
})
  
  

module.exports = router 