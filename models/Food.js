const Schema = require('mongoose').Schema;

const foodSchema = new Schema ({
    name: String,
    calories: Number,
    // carbs: Number,
    // protein: Number,
    meal:{
        type:Schema.Types.ObjectId,
        ref: 'Meal'
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
