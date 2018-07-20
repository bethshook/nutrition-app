const express = require('express');
const router  = express.Router();
const fetch = require('node-fetch');
const ensureLogin = require("connect-ensure-login");
const Message = require('../models/Message');
const Food = require('../models/Food');
const User = require('../models/User')

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

//meals

router.get('/foods', ensureLogin.ensureLoggedIn(), (req,res,next)=>{
  fetch('https://api.edamam.com/api/food-database/parser?ingr=burger&app_id=ac3de265&app_key=60cd20dfc55a216360c3f54521f9bef4')
  .then(results => results.json())
  //foods =  results.json
  .then(foods=> {
    res.render('foods', foods);
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

router.get('/delete/:id', (req,res,next)=>{
  Message.findByIdAndRemove(req.params.id)
  .then(message=>{
    res.redirect('/messages')
  })
  .catch(err=>next())
})

//fetch indiv API food views and add foods to db

router.get('/breakfast/:id', (req,res,next)=>{
  let id = req.params.id
  fetch(`https://api.nal.usda.gov/ndb/V2/reports?ndbno=${id}&type=b&format=json&api_key=OTwkyRvnOJpgdJE1q0DDJbJmkb3CouAZAH8ev4yp`)
  .then(results => results.json())
  .then(food => {
    
    res.render('food-detail-breakfast', food)
  })
})

router.post('/breakfast/add', (req,res,next)=>{

    let newfood = {
      name: req.body.foodname,
      user: req.user,
      calories: req.body.calories,
      proteins: req.body.proteins,
      carbs: req.body.carbs,
      sugars: req.body.sugars,
      meal: 'Breakfast'
    }

    Food.create(newfood)
    .then(food => {
      res.redirect('/breakfast');
    })

    let currentId = req.user._id;
    console.log(currentId)

    User.findByIdAndUpdate({_id:req.user._id}, { $push: { foods: newfood } })
    .then(result=>{
      console.log(result);
    })
    .catch((error) => {
      console.log(error)
    })
  })


router.get('/lunch/:id', (req,res,next)=>{
  let id = req.params.id
  fetch(`https://api.nal.usda.gov/ndb/V2/reports?ndbno=${id}&type=b&format=json&api_key=OTwkyRvnOJpgdJE1q0DDJbJmkb3CouAZAH8ev4yp`)
  .then(results => results.json())
  .then(food => {
    
    res.render('food-detail-lunch', food)
  })
})

router.post('/lunch/add', (req,res,next)=>{

    let newfood = {
      name: req.body.foodname,
      user: req.user,
      calories: req.body.calories,
      proteins: req.body.proteins,
      carbs: req.body.carbs,
      sugars: req.body.sugars,
      meal: 'Lunch'
    }

    Food.create(newfood)
    .then(food => {
      res.redirect('/lunch');
    })

    let currentId = req.user._id;
    console.log(currentId)

    User.findByIdAndUpdate({_id:req.user._id}, { $push: { foods: newfood } })
    .then(result=>{
      console.log(result);
    })
    .catch((error) => {
      console.log(error)
    })
  })

  router.get('/dinner/:id', (req,res,next)=>{
    let id = req.params.id
    fetch(`https://api.nal.usda.gov/ndb/V2/reports?ndbno=${id}&type=b&format=json&api_key=OTwkyRvnOJpgdJE1q0DDJbJmkb3CouAZAH8ev4yp`)
    .then(results => results.json())
    .then(food => {
      console.log('api', food)
      res.render('food-detail-dinner', food)
    })
  })
  
  router.post('/dinner/add', (req,res,next)=>{
  
      let newfood = {
        name: req.body.foodname,
        user: req.user._id,
        calories: req.body.calories,
        proteins: req.body.proteins,
        carbs: req.body.carbs,
        sugars: req.body.sugars,
        meal: 'Dinner'
      }
  
      Food.create(newfood)
      .then(food => {
        User.findByIdAndUpdate({_id:req.user._id}, { $push: { foods: food._id } })
        // req.user.foods.push(food._id)
        return req.user.save()
      })
      .then(user=>{
        console.log('bliss', user)
        res.redirect('/dinner')
      })
      .catch(e=>{
        console.log(e)
      })
  
      // // User.findByIdAndUpdate({_id:req.user._id}, { $push: { foods: newfood } })
      // .then(result=>{
      //   console.log(result);
      // })
      // .catch((error) => {
      //   console.log(error)
      // })
    })
  
  
    router.get('/snack/:id', (req,res,next)=>{
      let id = req.params.id
      fetch(`https://api.nal.usda.gov/ndb/V2/reports?ndbno=${id}&type=b&format=json&api_key=OTwkyRvnOJpgdJE1q0DDJbJmkb3CouAZAH8ev4yp`)
      .then(results => results.json())
      .then(food => {
        
        res.render('food-detail-lunch', food)
      })
    })
    
    router.post('/snack/add', (req,res,next)=>{
    
        let newfood = {
          name: req.body.foodname,
          user: req.user,
          calories: req.body.calories,
          proteins: req.body.proteins,
          carbs: req.body.carbs,
          sugars: req.body.sugars,
          meal: 'Snack'
        }
    
        Food.create(newfood)
        .then(food => {
          res.redirect('/snack');
        })
    
        let currentId = req.user._id;
        console.log(currentId)
    
        User.findByIdAndUpdate({_id:req.user._id}, { $push: { foods: newfood } })
        .then(result=>{
          console.log(result);
        })
        .catch((error) => {
          console.log(error)
        })
      })
    

//show meals for a given user

router.get('/meal-record', ensureLogin.ensureLoggedIn(), (req,res,next)=>{
  Food.find({user:req.user})
  .then(foods=>{
    console.log(foods)
    res.render('meal-record', {foods:foods})
  }) 
})

//dietitians

router.get('/dietitians', ensureLogin.ensureLoggedIn(), (req,res,next)=>{
  User.find({role: 'DIETITIAN'})
  .then(dietitians =>{
    res.render('dietitians', {dietitians: dietitians})
  })
})

//connect user with dietitian

router.get('/dietitian/:id', (req,res,next)=>{
  //need to get dietitian name (and email?) to link with user
  // var docName = User.findById({_id: req.params.id});
  // console.log(docName)
  User.findByIdAndUpdate({_id:req.user._id}, {dietitian: req.params.id})
  //.populate('dietitian')
  .then(user=>{
    User.findByIdAndUpdate(req.params.id,{$push:{patients: user._id}})    
    .then(user => {
        req.user.dietitian=user
      //add this user's ID to the doc's patients array
        console.log(req.user)
        console.log(user, 'nutri')
        res.render('private', { user: req.user })
      })
  })
  
})

// router.get('/dietitian/:id', (req,res,next)=>{
//   User.find({_id:req.params.id})
//   .then(dietitian=>{
//     // console.log(dietitian)
//     res.render('dietitian-detail', {dietitian})
//   })
//   .catch(e=>{e})
// })

// router.post('/dietitian/add', (req,res,next)=>{
//   let docId = req.body.id; //dietitian's ID
//   let patientId = req.user._id;
//   User.findById(patientId)
//   .then(patient=>{
//   User.findByIdAndUpdate({_id:docId}, {$push:{patients:patientId}}, { 'new': true})
//   User.findById(docId)
//   .then(dietitian=>{
//     User.findByIdAndUpdate({_id:patientId}, {dietitian: dietitian})
//     .then(user=>{
//       res.render('private', {user: req.user})
//     })
//   })
//   })
// })


//dietition view of patient  

router.get('/patient/:id', (req,res,next)=>{
  Promise.all([User.findById(req.params.id), Food.find({user:req.params.id}), Message.find({user:req.params.id})])
  .then(results=>{
    const ctx = {
      user: results[0],
      foods: results[1],
      messages: results[2]
    }
    res.render('patient-detail', ctx)
  })
})

module.exports = router;
