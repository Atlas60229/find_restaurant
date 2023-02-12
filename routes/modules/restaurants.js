const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')


// 新增新餐廳
router.get('/new', (req, res) => {
  res.render('new')
})

router.post('/new', (req, res) => {
  const userID = req.user._id
  const { name, category, image, location, phone, google_map, rating, description } = req.body //參考Noelle
  return Restaurant.create({
    name, category, image, location, phone, google_map, rating, description, userID
  })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

// 餐廳細節：
router.get('/:id', (req, res) => {
  const userID = req.user._id
  const _id = req.params.id

  return Restaurant.findOne({ _id, userID })
    .lean()
    .then((restaurant) => res.render('detail', { restaurant }))
    .catch(error => console.log(error))
})


// edit
router.get('/:id/edit', (req, res) => {
  const userID = req.user._id
  const _id = req.params._id
  return Restaurant.findOne({ _id, userID })
    .lean()
    .then((restaurant) => res.render('edit', { restaurant }))
    .catch(error => console.log(error))
})

router.put('/:id', (req, res) => {
  const userID = req.user._id
  const _id = req.params._id
  const { name, category, image, location, phone, google_map, rating, description } = req.body 
  return Restaurant.findOne({ _id, userID })
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
    .then(() => res.redirect(`/restaurants/${id}`))
    .catch(error => console.log(error))
})

// delete
router.delete('/:id', (req, res) => {
  const userID = req.user._id
  const _id = req.params._id
  return Restaurant.findOne({ _id, userID })
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

module.exports = router