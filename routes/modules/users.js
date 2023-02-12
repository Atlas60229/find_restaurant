const express = require('express')
const router = express.Router()
const User = require('../../models/user')
const passport = require('passport')
const bcrypt = require('bcryptjs')

router.get('/register', (req, res) => {
    res.render('register')
})

router.post('/register', (req, res) => {
    const { name, email, password, confirmPassword } = req.body
    const errors = []
    if (!email || !password ) {
        errors.push({ message: '信箱和密碼欄位必需填寫。' })
    }
    if (password !== confirmPassword) {
        errors.push({ message: '密碼與確認密碼不相符！' })
    }
    if (errors.length) {
        return res.render('register', {
            errors,
            name: req.body.name,
            email,
            password,
            confirmPassword
        })
    }
    User.findOne({ email }).then(user => {
        if (user) {
            errors.push({ message: '這個 Email 已經註冊過了。' })
            return res.render('register', {
                errors,
                name,
                email,
                password,
                confirmPassword
            })
        }
        return bcrypt
            .genSalt(10)  //  得到 salt 送入下一個函式
            .then(salt => bcrypt.hash(password,salt))  //  用得到的salt 及原本的密碼產生hash值
            .then(hash => User.create({  
            name: req.body.name | "使用者", 
            email,
            password: hash  //  使用得到的hash值做為密碼創造帳號
        }))
            .then(() => res.redirect('/'))
            .catch(err => console.log(err))
    })
})

router.get('/login', (req, res) => {
    res.render('login')
})

router.post('/login', passport.authenticate('local', {  // 執行passport中的 local strategy認證
    successRedirect: '/',
    failureRedirect: '/users/login'
}))

router.get('/logout', (req, res) => {
    req.logout(err => {
        if (err) {
            return next(err)
        }
        req.flash('success_msg', "已成功登出")
        res.redirect('/users/login')
    })
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