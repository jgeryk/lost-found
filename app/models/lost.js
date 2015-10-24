// load the things we need
var mongoose = require('mongoose');

// define the schema for our user model
var lostSchema = mongoose.Schema({
    title: String,
    description: String,
    category: String,
    lostLocation: String,
    startLostTime: Date,
    endLostTime: Date,
    userID: String
});


// create the model for users and expose it to our app
module.exports = mongoose.model('lostItem', lostSchema);

