// load the things we need
var mongoose = require('mongoose');

// define the schema for our user model
var foundSchema = mongoose.Schema({
    title: { type: String, index: 'text'},
    category: String,
    foundLocation: {
	lat: Number,
	lng: Number
    },
    foundDate: Date,
    pickupDetails: String,
    userID: String,
    retrieved: Boolean
});

foundSchema.index({title : 'index'});

// create the model for users and expose it to our app
module.exports = mongoose.model('foundItem', foundSchema);
