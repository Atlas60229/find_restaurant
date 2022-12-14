const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')


// 新增新餐廳
router.get('/new',(req,res)=>{
    res.render('new')
})

router.post('/new', (req, res) => {
    const { name, category, image, location, phone, google_map, rating, description } = req.body //參考Noelle
    return Restaurant.create({
      name, category, image, location, phone, google_map, rating, description
    })
      .then(() => res.redirect('/'))
      .catch(error => console.log(error))
  })

// 餐廳細節：
router.get('/:id',(req,res)=>{
const id = req.params.id

return Restaurant.findById(id)
  .lean()
  .then((restaurant) => res.render('detail', { restaurant }))
  .catch(error => console.log(error))
})


// edit
router.get('/:id/edit',(req,res)=>{
const id = req.params.id
return Restaurant.findById(id)
    .lean()
    .then((restaurant) => res.render('edit', { restaurant }))
    .catch(error => console.log(error))
})

router.put('/:id', (req, res) => {
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
router.delete('/:id', (req, res) => {
const id = req.params.id

return Restaurant.findById(id)
  .then(restaurant => restaurant.remove())
  .then(() => res.redirect('/'))
  .catch(error => console.log(error))
})

module.exports = router