// load the things we need
var mongoose = require('mongoose');

// define the schema for our user model
var foundSchema = mongoose.Schema({
    title: String,
    category: String,
    foundLocation: {
	lat: Number,
	lng: Number
    },
    foundDate: Date,
    pickUpName: String,
    userID: String
});


// create the model for users and expose it to our appo
module.exports = mongoose.model('foundItem', foundSchema);
