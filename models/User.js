const Schema = require('mongoose').Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new Schema ({
    username: {
        type: String},
    firstname: String,
    lastname: String,
    email: String,
    password: String,
    gender: String,
    height: String,
    weight: String,
    age: String,
    activity: {
        type: String,
        enum: ['Low', 'Average', 'High']
    },
    role: {
        type: String,
        enum: ['Patient', 'Dietitian'],
        default: 'Patient'
    },
    profile: {
        type:Schema.Types.ObjectId,
        ref: 'Profile'
    },
    meals: [{
        type: Schema.Types.ObjectId,
        ref: 'Meal'
    }],
    // habits: [{
    //     type: Schema.Types.ObjectId,
    //     ref: 'Habit'
    // }]
},
    {
        timestamps:{
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        }
    });

//change default usernameField to email type
userSchema.plugin(passportLocalMongoose, {usernameField:'email'})

//create model with Mongoose library
module.exports = require('mongoose'). model('User', userSchema);

//why have separate user and perfil models