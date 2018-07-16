const Schema = require('mongoose').Schema;

// const passportLocalMongoose = require('passport-local-mongoose');

const mealSchema = new Schema ({
    mealType: {
        type: String,
        enum: ['Breakfast', 'Lunch', 'Dinner', 'Snack']
    },
    foods: [String],
    calories: Number,
    carbs: Number,
    protein: Number,
    user:{
        type:Schema.Types.ObjectId,
        ref: 'User'
    },},
    {
        timestamps:{
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        }
    });

//change default usernameField to email type
userSchema.plugin(passportLocalMongoose, {usernameField:'email'})

//create model with Mongoose library
module.exports = require('mongoose'). model('Meal', mealSchema);
