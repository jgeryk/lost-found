// load the things we need
var mongoose = require('mongoose');

// define the schema for our user model
var userSchema = mongoose.Schema({

    title: String
		category: String
		foundLocation:{
			lat: float,
			long: float
		}

		foundTime:{
			year: int,
			month: int,			
			day: int,
			hour: int,
			minute: int
		}

		pickUpLocation:{
			lat: float,
			long: float
		}

		pickUpName: String
});


// create the model for users and expose it to our app
module.exports = mongoose.model('foundSchema', foundSchema);

