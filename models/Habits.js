const Schema = require('mongoose').Schema;

// const passportLocalMongoose = require('passport-local-mongoose');

const habitSchema = new Schema ({
    water: String,
    fruit: String,
    vegetables: String,
    exercise: String,
    user:{
        type:Schema.Types.ObjectId,
        ref: 'User'
    },
    sleep: String,
    mindfulness: String
    });


//create model with Mongoose library
module.exports = require('mongoose'). model('Habit', habitSchema);
