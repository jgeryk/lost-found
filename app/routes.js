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
	newFound.pickupDetails = fields.pickupDetails;
	
	newFound.foundLocation.lat = fields.lat;
	newFound.foundLocation.lng = fields.lng;
	newFound.foundDate = new Date().getTime();
	newFound.retreived = false;

	newFound.userID = req.user._id;

	newFound.save(function (err, newFound) {
	    if (err) return res.send(err);

	    res.redirect('/submittedFound');
	});
    });

    app.get('/lost', isLoggedIn, function(req, res) {
	Found.find(function(err, founds) {
	    if(err) return console.error(err);
	    res.render('lost.ejs', {founds: founds});
	});
    });

    app.post('/lost', isLoggedIn, function(req, res) {
	var query = {};
	query.$query={};
	
	if (!isNullOrWhitespace(req.body.category) || !(isNullOrWhitespace(req.body.beginDate) && isNullOrWhitespace(req.body.endDate)))
	    query.$query.$and=[];

	if (!isNullOrWhitespace(req.body.category)){
	    var json = {};
	    json.category = req.body.category;
	    console.log(json);
	    console.log(query);
	    query.$query.$and.push(json);
	    console.log(query);
	}
	if (!isNullOrWhitespace(req.body.beginDate) && !isNullOrWhitespace(req.body.endDate)) {
	    var beginDate = req.body.beginDate.setHours(0, 0, 0, 0);
	    var endDate = req.body.endDate.setHours(24, 0, 0, 0);

	    query.$query.$and.push({$gte : beginDate, $lte : endDate});
	}
	
	query.$orderby=[];
	query.$orderby.push({ foundDate : -1 });

	console.log(query);

	Found.find(query, function(err, searchResults) {
	    if (err) console.log(err);
	    else {
		res.render('lostSearch.ejs', {searchResults: searchResults});
	    }		
	});
    });

    app.post('/lostSearch', isLoggedIn, function(req, res) {
	res.redirect('/lost');
    });

    app.get('/submittedFound', isLoggedIn, function(req, res){
	res.render('submittedFound.ejs');
    });

    app.post('/submittedFound', isLoggedIn, function(req, res){
	res.redirect('/profile');
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

function isNullOrWhitespace(input) {
    if (typeof input === 'undefined' || input === null) return true;
    return input.replace(/\s/g, '').length < 1;
}
