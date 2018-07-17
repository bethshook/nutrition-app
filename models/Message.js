const Schema = require('mongoose').Schema;

const messageSchema = new Schema ({
    subject: String,
    body: String,
    date: String,
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
module.exports = require('mongoose'). model('Message', messageSchema);
