// load the things we need
var mongoose = require('mongoose');

// define the schema for our user model
var foundSchema = mongoose.Schema({

    title: String
		category: String
		foundLocation:{
			lat: Number,
			lng: Number
		}

		foundTime: Date

		pickUpLocation:{
			lat: Number,
			lng: Number
		}

		pickUpName: String
});


// create the model for users and expose it to our app
module.exports = mongoose.model('foundItem', foundSchema);

