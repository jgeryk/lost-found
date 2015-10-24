// load the things we need
var mongoose = require('mongoose');

// define the schema for our user model
var userSchema = mongoose.Schema({

    title: String
		category: String
		foundLocation:{
			lat: Number,
			long: Number
		}

		foundTime: Date

		pickUpLocation:{
			lat: Number,
			long: Number
		}

		pickUpName: String
});


// create the model for users and expose it to our app
module.exports = mongoose.model('foundSchema', foundSchema);

