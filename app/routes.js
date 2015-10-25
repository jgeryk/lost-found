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
	newFound.retrieved = false;

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
	
	if ((!isNullOrWhitespace(req.body.category) && req.body.category !== "All") || !(isNullOrWhitespace(req.body.beginDate) && isNullOrWhitespace(req.body.endDate)) ||
	    !req.body.showRetrieve || !isNullOrWhitespace(req.body.search))
	    query.$query.$and=[];

	if (!isNullOrWhitespace(req.body.search)) {
	    var searchjson = {};
	    searchjson.$text = { $search : req.body.search };
	    query.$query.$and.push(searchjson);
	}
	if (!isNullOrWhitespace(req.body.category) && req.body.category !== "All") {
	    var categoryjson = {};
	    categoryjson.category = req.body.category;
	    query.$query.$and.push(categoryjson);
	}
	if (!isNullOrWhitespace(req.body.beginDate) && !isNullOrWhitespace(req.body.endDate)) {
	    var beginDate = req.body.beginDate.setHours(0, 0, 0, 0);
	    var endDate = req.body.endDate.setHours(24, 0, 0, 0);

	    var daterangejson = {};
	    daterangejson.$gte = beginDate;
	    daterangejson.$let = endDate;
	    query.$query.$and.push(daterange);
	}
	if (!req.body.showRetrieve) {
	    var retrievedjson = {};
	    retrievedjson.retrieved = false;
	    query.$query.$and.push(retrievedjson);
	}
	
	query.$orderby=[];
	query.$orderby.push({ foundDate : -1 });

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
    // GOOGLE ROUTES =======================
    // =====================================
    // send to google to do the authentication
    // profile gets us their basic information including their name
    // email gets their emails
    app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));

    // the callback after google has authenticated the user
    app.get('/auth/google/callback',
            passport.authenticate('google', {
                    successRedirect : '/profile',
                    failureRedirect : '/'
            }));

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
