// load the things we need
var mongoose = require('mongoose');

// define the schema for our user model
var lostSchema = mongoose.Schema({

    title: String
		description: String
		category: String
		lostLocation: String

		lostTime: Date
});


// create the model for users and expose it to our app
module.exports = mongoose.model('lostItem', lostSchema);

