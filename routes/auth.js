const express = require('express');
const router  = express.Router();
const fetch = require('node-fetch');
const passport = require('passport')
const passportFacebook = require('../helpers/facebook');
const ensureLogin = require("connect-ensure-login");

//User model
const User = require('../models/User') 

// Bcrypt to encrypt passwords
const bcrypt = require("bcrypt");
const bcryptSalt = 10;

router.get('/signup', (req, res, next)=>{
    res.render('auth/signup')
})

router.post("/signup", (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const gender = req.body.gender;
    const email = req.body.email;

  
    if (username === "" || password === "") {
      res.render("auth/signup", { message: "Indicate username and password" });
      return;
    }
  
    User.findOne({ username })
    .then(user => {
      if (user !== null) {
        res.render("auth/signup", { message: "The username already exists" });
        return;
      }
  
      const salt = bcrypt.genSaltSync(bcryptSalt);
      const hashPass = bcrypt.hashSync(password, salt);
  
      const newUser = new User({
        username,
        firstname,
        lastname,
        email,
        password: hashPass,
        gender
      });
  
      newUser.save((err) => {
        if (err) {
          res.render("auth/signup", { message: "Something went wrong" });
        } else {
          res.redirect("/");
        }
      });
    })
    .catch(error => {
      next(error)
    })
  });

router.get('/login', (req, res, next)=>{
    res.render('auth/login', {'message': req.flash('error')})
})

router.post('/login', passport.authenticate('local', {
    // successredirect: '/private',
    failureRedirect: "/login",
    failureFlash: true,
    passReqToCallback: true
}),
  function(req, res) {
    res.redirect('/private')
  })

router.get('/logout', function(req, res, next){
    req.logout();
    res.redirect('/');
  });


router.get('/facebook', passportFacebook.authenticate('facebook'));

router.get('/facebook/callback',
  passportFacebook.authenticate('facebook', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/private');
  });


router.get("/private", ensureLogin.ensureLoggedIn(), (req, res) => {
    res.render("private", { user: req.user });
  });


module.exports = router;
