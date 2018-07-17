const express = require('express');
const router  = express.Router();
const fetch = require('node-fetch');
const ensureLogin = require("connect-ensure-login");


/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

router.get('/foods', ensureLogin.ensureLoggedIn(), (req,res,next)=>{
  fetch('https://api.edamam.com/api/food-database/parser?ingr=apple&app_id=ac3de265&app_key=60cd20dfc55a216360c3f54521f9bef4')
  .then(results => results.json())
  //foods =  results.json
  .then(foods=> {
    res.render('foods', foods);
    //we're passing an object and then using array in view
  }) 
})

router.get('/meals', ensureLogin.ensureLoggedIn(), (req,res,next)=>{
  res.render('meals')
})

router.get('/breakfast', ensureLogin.ensureLoggedIn(), (req,res,next)=>{
  fetch('https://api.edamam.com/api/food-database/parser?ingr=apple&app_id=ac3de265&app_key=60cd20dfc55a216360c3f54521f9bef4')
  .then(results => results.json())
  .then(foods=> {
    res.render('breakfast', foods);
  }) 
})

router.get('/lunch', ensureLogin.ensureLoggedIn(), (req,res,next)=>{
  fetch('https://api.edamam.com/api/food-database/parser?ingr=apple&app_id=ac3de265&app_key=60cd20dfc55a216360c3f54521f9bef4')
  .then(results => results.json())
  .then(foods=> {
    res.render('lunch', foods);
  }) 
})

router.get('/dinner', ensureLogin.ensureLoggedIn(), (req,res,next)=>{
  fetch('https://api.edamam.com/api/food-database/parser?ingr=apple&app_id=ac3de265&app_key=60cd20dfc55a216360c3f54521f9bef4')
  .then(results => results.json())
  .then(foods=> {
    res.render('dinner', foods);
  }) 
})

router.get('/snack', ensureLogin.ensureLoggedIn(), (req,res,next)=>{
  fetch('https://api.edamam.com/api/food-database/parser?ingr=apple&app_id=ac3de265&app_key=60cd20dfc55a216360c3f54521f9bef4')
  .then(results => results.json())
  .then(foods=> {
    res.render('snack', foods);
  }) 
})




module.exports = router;
