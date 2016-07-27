module.exports = function(app) {

	var err				= require('../controllers/err');
	var usercontroller  = require('../controllers/user');
	
	app.get('/', usercontroller.Login);
	app.get('/Login', usercontroller.ViewLogin);
	// app.get('/Create-account', usercontroller.ViewRegistration);
	app.get('/Home', usercontroller.Login);
	app.get('/Failed', usercontroller.Failed);
	app.get('/Logout', usercontroller.Logout);
	app.post('/Check-email', usercontroller.CheckEmail);
	app.post('/Reset-password', usercontroller.ResetPassword);
	// nodemailer
	app.post('/Send-code', usercontroller.SendCode);
	// local auth with passport
	app.post('/Login', passport.authenticate('login', {
		failureRedirect: '/Failed',
		successRedirect: '/Home'
	}));
	// app.post('/Register', passport.authenticate('register', {
	// 	failureRedirect: '/Failed',
	// 	successRedirect: '/Create-account'
	// }));
	// Socialmedia auth with passport
	app.get('/auth/facebook',
		passport.authenticate('facebook', { scope: ['email', 'public_profile', 'user_birthday'] }), function(req, res){});
	app.get('/auth/facebook/callback', passport.authenticate('facebook', 
		{ failureRedirect: '/Login' }), function(req, res) {
		res.redirect('/Home');
	});

	app.get('/auth/google',
	  passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login', 'https://www.googleapis.com/auth/plus.profile.emails.read'] }), function(req, res){});
	app.get('/auth/google/callback', passport.authenticate('google', 
	  { failureRedirect: '/Failed' }), function(req, res) {
	    res.redirect('/Home');
	  });

	//Routes for not initialize
	app.get('*',err.viewPageNotFound);
}
		