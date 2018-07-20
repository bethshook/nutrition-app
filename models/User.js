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
    dietitian: {
        type: Schema.Types.ObjectId,
        ref: 'User'
        },
        //messages: [{
        //    type: Schema.Types.ObjectId,
        //    ref: 'Message'}],
    patients: [{
        type: Schema.Types.ObjectId,
        ref: 'User',
        unique:true
        }],
    activity: {
        type: String,
        enum: ['low', 'average', 'high', ''],
        default: 'average'
    },
    role: {
        type: String,
        enum: ['PATIENT', 'DIETITIAN'],
        default: 'PATIENT'
    },
    specialty: String,
    location: String,
    foods: [{
        type: Schema.Types.ObjectId,
        ref: 'Food'
    }]
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
