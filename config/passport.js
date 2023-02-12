const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const FacebookStrategy = require('passport-facebook').Strategy
const User = require('../models/user')
const bcrypt = require('bcryptjs')
const user = require('../models/user')
const flash = require('connect-flash')

module.exports = app => {
    app.use(passport.initialize());
    app.use(passport.session());

    passport.use(new LocalStrategy({ usernameField: "email", passReqToCallback: true }, (req, email, password, done) => {
        User.findOne({ email })
            .then(user => {
                if (!user) {
                    return done(null, false, req.flash("warning_msg", "The E-mail is not exist.") )
                }
                return bcrypt.compare(password, user.password).then(isMatch => {  //  透過 compare 比較輸入的密碼及加密過的密碼看有無match
                    if (!isMatch) {           //  可用其他方式驗證密碼  
                        return done(null, false, req.flash("warning_msg", "Password or Email incorrect"))
                    }
                    return done(null, user)   //  伺服器端session會存取使用者資料
                })

            })
            .catch(err => done(err, false))
    }))

    passport.use(new FacebookStrategy({
        clientID: process.env.FACEBOOK_APP_ID,
        clientSecret: process.env.FACEBOOK_APP_SECRET,
        callbackURL: process.env.FACEBOOK_callbackURL,
        profileFields: ["email", "displayName"]
    },
        (accessToken, refreshToken, profile, done) => {
            const { name, email } = profile._json
            User.findOne({ email })
                .then(user => {
                    if (user){
                        
                        return done(null, user) 

                    } else {
                        const randomPassword = Math.random().toString(36).slice(-8)

                        bcrypt
                            .genSalt(10)  //  得到 salt 送入下一個函式
                            .then(salt => bcrypt.hash(randomPassword, salt))  //  用得到的salt 及原本的密碼產生hash值
                            .then(hash => {
                                    User.create({                               
                                        name,
                                        email,
                                        password: hash  //  使用得到的hash值做為密碼創造帳號
                                    })
                            })
                            .then(user => done(null, user))
                            .catch(err => done(err, false))
                    }
                })
        }
    ));

    passport.serializeUser((user, done) => {
        done(null, user.id)
    })

    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => { done(err, user) })
            .lean()
        // .then(user => done(null, user))
        // .catch(err => done(err, false))

    });
}