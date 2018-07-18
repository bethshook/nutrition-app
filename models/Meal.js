const Schema = require('mongoose').Schema;


const mealSchema = new Schema ({
    mealType: {
        type: String,
        enum: ['Breakfast', 'Lunch', 'Dinner', 'Snack']
    },
    foods: {
        name: String,
        calories: Number
    },
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

//create model with Mongoose library
module.exports = require('mongoose'). model('Meal', mealSchema);
