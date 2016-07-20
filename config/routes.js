module.exports = function(app) {

	var err				= require('../controllers/err');
	var usercontroller  = require('../controllers/user');
	
	app.get('/', usercontroller.Login);
	app.get('/Login', usercontroller.ViewLogin);
	app.get('/Create-account', usercontroller.ViewRegistration);
	app.get('/Home', usercontroller.Login);
	app.get('/Failed', usercontroller.Failed);
	app.get('/Logout', usercontroller.Logout);
	// working on passport
	app.post('/Register', passport.authenticate('register', {
		failureRedirect: '/Failed',
		successRedirect: '/Login'
	}));
	app.post('/Login', passport.authenticate('login', {
		failureRedirect: '/Failed',
		successRedirect: '/Home'
	}));

	// Socialmedia login with passport
	app.get('/auth/Facebook',
		passport.authenticate('facebook'), function(req, res){});
	app.get('/auth/Facebook/callback', passport.authenticate('facebook', 
		{ failureRedirect: '/Login' }), function(req, res) {
		res.redirect('/Home');
	});

	app.get('/auth/github',
	  passport.authenticate('github'), function(req, res){});
	app.get('/auth/github/callback', passport.authenticate('github', 
		{ failureRedirect: '/Login' }), function(req, res) {
	    res.redirect('/Home');
	  });

	app.get('/auth/instagram',
	  passport.authenticate('instagram'), function(req, res){});
	app.get('/auth/instagram/callback', passport.authenticate('instagram', 
	  { failureRedirect: '/Login' }), function(req, res) {
	    res.redirect('/Home');
	  });

	//Routes for not initialize
	app.get('*',err.viewPageNotFound);
}
		