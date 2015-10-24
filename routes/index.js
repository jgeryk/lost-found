var express = require('express');
var router = express.Router();

module.exports = function(app, passport) {
    app.get('/', function(req, res) {
	res.render('index', { title: 'Express' });
    });

    app.get('/login', function(req, res) {

// /* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

// module.exports = router;
