// load the things we need
var mongoose = require('mongoose');

// define the schema for our user model
var userSchema = mongoose.Schema({

    title: String
		description: String
		category: String
		lostLocation: String

		lostTime:{
			year: int,
			month: int,			
			day: int,
			hour: int,
			minute: int
		}
});


// create the model for users and expose it to our app
module.exports = mongoose.model('lostSchema', lostSchema);

