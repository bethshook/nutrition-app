const express = require('express');
const router  = express.Router();
const fetch = require('node-fetch');

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

router.get('/foods', (req,res,next)=>{
  fetch('https://api.nal.usda.gov/ndb/list?format=json&lt=f&sort=n&api_key=OTwkyRvnOJpgdJE1q0DDJbJmkb3CouAZAH8ev4yp')
  .then(results => results.json())
  //movies =  results.json
  .then(foods=> {
    res.render('foods', foods);
    //we're passing an object and then using array in view
  }) 
})


module.exports = router;
