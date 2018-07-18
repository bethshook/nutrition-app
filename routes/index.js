const express = require('express');
const router  = express.Router();
const fetch = require('node-fetch');
const ensureLogin = require("connect-ensure-login");
const Message = require('../models/Message');
const Meal = require('../models/Meal');
const Food = require('../models/Food');

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

router.get('/foods', ensureLogin.ensureLoggedIn(), (req,res,next)=>{
  fetch('https://api.edamam.com/api/food-database/parser?ingr=burger&app_id=ac3de265&app_key=60cd20dfc55a216360c3f54521f9bef4')
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
  fetch('https://api.edamam.com/api/food-database/parser?ingr=burger&app_id=ac3de265&app_key=60cd20dfc55a216360c3f54521f9bef4')
  .then(results => results.json())
  .then(foods=> {
    res.render('breakfast', foods);
  }) 
})

router.get('/lunch', ensureLogin.ensureLoggedIn(), (req,res,next)=>{
  fetch('https://api.edamam.com/api/food-database/parser?ingr=burger&app_id=ac3de265&app_key=60cd20dfc55a216360c3f54521f9bef4')
  .then(results => results.json())
  .then(foods=> {
    res.render('lunch', foods);
  }) 
})

router.get('/dinner', ensureLogin.ensureLoggedIn(), (req,res,next)=>{
  fetch('https://api.edamam.com/api/food-database/parser?ingr=burger&app_id=ac3de265&app_key=60cd20dfc55a216360c3f54521f9bef4')
  .then(results => results.json())
  .then(foods=> {
    res.render('dinner', foods);
  }) 
})

router.get('/snack', ensureLogin.ensureLoggedIn(), (req,res,next)=>{
  fetch('https://api.edamam.com/api/food-database/parser?ingr=burger&app_id=ac3de265&app_key=60cd20dfc55a216360c3f54521f9bef4')
  .then(results => results.json())
  .then(foods=> {
    res.render('snack', foods);
  }) 
})

//messages

router.get('/messages', (req,res,next)=>{
  Message.find({user:req.user})
  .then(messages=>{
      res.render('messages', {messages})
  })
  .catch(e=>next(e))
})

router.post('/message', (req,res,next)=>{
  const subject = req.body.subject;
  const date = req.body.date;
  const body = req.body.body;
  const user = req.user;

  const newMessage = new Message({
    subject,
    body,
    date,
    user,
  });

  newMessage.save((err) => {
    if (err) {
      res.render("/messages", { message: "Something went wrong" });
    } else {
      res.redirect("/messages");
    }
  });

})

//adding API foods to db

//  NEED TO ADD POST ROUTE HERE TO ADD TO DB
router.get('/lunch/:id', (req,res,next)=>{
  fetch('https://api.nal.usda.gov/ndb/V2/reports?ndbno=' + req.params.id + '&type=b&format=json&api_key=OTwkyRvnOJpgdJE1q0DDJbJmkb3CouAZAH8ev4yp')
  .then(results => results.json())
  
  .then(food =>{
    const name = food.name;
    const user = req.user;
    const meal = 'Lunch';
    
    const newFood = new Food({
      name,
      meal,
      user
    });

    newFood.save((err)=> {
      if (err) {
        res.render('lunch', { message: "Something went wrong" });
      } else {
        res.redirect('lunch');
      }
    })
  })
})

// router.get('/:id', (req,res,next)=>{
//   fetch('https://api.edamam.com/api/food-database/parser?ingr=&app_id=ac3de265&app_key=60cd20dfc55a216360c3f54521f9bef4')
// })
//   .then(foods => {
//     const
//   })
  

module.exports = router;
