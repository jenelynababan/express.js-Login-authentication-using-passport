module.exports = function(app) {

	var err				= require('../controllers/err');
	// jen was here
	var usercontroller  = require('../controllers/user');
	
	// jen was here
	// working on passport
	app.get('/', usercontroller.login);
	app.get('/login', usercontroller.viewLogin);
	app.get('/create-account', usercontroller.viewRegistration);
	app.get('/home', usercontroller.login);
	app.get('/failed', usercontroller.failed);
	app.post('/register', passport.authenticate('register', {
		failureRedirect: '/failed',
		successRedirect: '/login'
	}));
	app.post('/login', passport.authenticate('login', {
		failureRedirect: '/failed',
		successRedirect: '/home'
	}));
	app.get('/logout', usercontroller.logout);

	// Socialmedia login with passport
	app.get('/auth/facebook',
		passport.authenticate('facebook'),
		function(req, res){});
	app.get('/auth/facebook/callback',
	passport.authenticate('facebook', { failureRedirect: '/login' }),
		function(req, res) {
		res.redirect('/home');
	});

	//Routes for not initialize
	app.get('*',err.viewPageNotFound);
}
		