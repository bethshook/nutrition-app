const express = require('express');
const router  = express.Router();
const fetch = require('node-fetch');


router.get('/signup', (req, res, next)=>{
    res.render('auth/signup')
})

router.get('/login', (req, res, next)=>{
    res.render('auth/login')
})



module.exports = router;
