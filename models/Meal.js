const Schema = require('mongoose').Schema;


const mealSchema = new Schema ({
    mealType: {
        type: String,
        enum: ['Breakfast', 'Lunch', 'Dinner', 'Snack']
    },
    foods: [String],
    calories: Number,
    // carbs: Number,
    // protein: Number,
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

//foods could be array of IDs associated with this meal
//bring to other view when you click on food

//submit from id page 
