var Found = require('../app/models/found');

module.exports = function(app, passport) {
    // route for home page
    app.get('/', function(req, res) {
        res.render('index.ejs'); // load the index.ejs file
    });

    // route for showing the profile page
    app.get('/profile', isLoggedIn, function(req, res) {
        res.render('profile.ejs', {
            user : req.user // get the user out of session and pass to template
        });
	Found.find({ 'userID' : req.user._id}, function(err, document) {
	    console.log(document);
	});
    });

    app.get('/found', isLoggedIn, function(req, res) {
    	res.render('found.ejs');
    });

    app.post('/logfound', isLoggedIn, function(req, res) {
	var fields = req.body;

	var newFound = new Found();

	newFound.title = fields.title;
	newFound.category = fields.category;
	newFound.pickUpName = fields.pickUpName;
	console.log("about to have fields");	
	console.log(fields.lat);
	console.log(fields.lng);
	newFound.foundLocation.lat = fields.lat;
	newFound.foundLocation.lng = fields.lng;
	newFound.foundDate = new Date().getTime();

	newFound.userID = req.user._id;

	newFound.save(function (err, newFound) {
	    if (err) return res.send(err);

	    res.redirect('/submittedFound');
	});
    });

    app.get('/lost', isLoggedIn, function(req, res) {
	Found.find(function(err, founds) {
	    if(err) return console.error(err);
	    console.log(founds);
	    console.log(founds[0].title);
	    res.render('lost.ejs', {founds: founds});
	});
    });

    app.post('/lost', isLoggedIn, function(req, res) {
	Found.find({ $text : { $search : req.body.query }}, function(err, document) {
	    console.log(document);
	});
    });

    // =====================================
    // FACEBOOK ROUTES =====================
    // =====================================
    // route for facebook authentication and login
    app.get('/auth/facebook', passport.authenticate('facebook'));

    // handle the callback after facebook has authenticated the user
    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', {
            successRedirect : '/profile',
            failureRedirect : '/'
        }));

    // route for logging out
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}
