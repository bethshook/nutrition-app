const Schema = require('mongoose').Schema;

const foodSchema = new Schema ({
    name: String,
    calories: String,
    carbs: String,
    proteins: String,
    sugars: String,
    user: {
        type:Schema.Types.ObjectId,
        ref: 'User'
    },
    meal:{
        type: String,
        enum: ['Breakfast', 'Lunch', 'Dinner', 'Snack']
        },
    },
    {
        timestamps:{
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        }
    });


//create model with Mongoose library
module.exports = require('mongoose'). model('Food', foodSchema);
