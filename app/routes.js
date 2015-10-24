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
    });

    app.get('/found', isLoggedIn, function(req, res) {
    	res.render('found.ejs');
    });

    app.post('/logfound', isLoggedIn, function(req, res) {
	var fields = req.body;

	var Found = require('../app/models/found');

	var newFound = new Found();

	console.log(fields);
	newFound.title = fields.title;
	newFound.category = fields.category;
	newFound.pickUpName = fields.pickUpName;

	newFound.foundLocation.lat = 0;
	newFound.foundLocation.lng = 0;
	newFound.foundDate = new Date().getTime();

	newFound.userID = req.user._id;
	console.log(req.user._id);
	console.log(newFound);

	newFound.save(function (err, newFound) {
	    if (err) return res.send(err);

	    res.redirect('/submittedFound');
	});
    });

		app.get('/lost', isLoggedIn, function(req, res) {
				var Found = require('../app/models/found');
				Found.find(function(err, founds) {
					if(err) return console.error(err);
					console.log(founds);
					console.log(founds[0].title);
					res.render('lost.ejs', {founds: founds});

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
