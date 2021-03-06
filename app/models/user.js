// models/userSchema.js
// load the things we need
var mongoose = require('mongoose');

// define the schema for our user model
var userSchema = mongoose.Schema({

    facebook         : {
        id           : String,
        token        : String,
        name         : String
    },
    google           : {
        id           : String,
        token        : String,
        email        : String,
        name         : String
    }

});

// create the model for users and expose it to our app
module.exports = mongoose.model('user', userSchema);

