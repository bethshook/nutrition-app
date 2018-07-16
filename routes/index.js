const express = require('express');
const router  = express.Router();
const fetch = require('node-fetch');

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

router.get('/foods', (req,res,next)=>{
  fetch('https://api.edamam.com/api/food-database/parser?ingr=apple&app_id=ac3de265&app_key=60cd20dfc55a216360c3f54521f9bef4')
  .then(results => results.json())
  //foods =  results.json
  .then(foods=> {
    res.render('foods', foods);
    console.log(foods.hints[0])
    //we're passing an object and then using array in view
  }) 
})




module.exports = router;
