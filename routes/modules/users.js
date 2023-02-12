const express = require('express')
const router = express.Router()
const User = require('../../models/user')
const passport = require('passport')
const bcrypt = require('bcryptjs')

router.get('/register', (req, res) => {
    res.render('register')
})

router.get('/login', (req, res) => {
    res.render('login')
})

router.get('/logout', (req, res) => {
    req.logout(err => {
        if (err) {
            return next(err)
        }
        req.flash('success_msg', "已成功登出")
        res.redirect('/users/login')
    })
})

module.exports = router