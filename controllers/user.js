function User() {
	data 	  = {};
	tomodel   = {};
	model 	  = require('../models/User_model');
    passport  = require('../config/auth');

};
 
User.prototype.constructor = User;

User.prototype.viewLogin =  function(req, res) {
		// var session = req.session.passport;
		// console.log(session);
		// if (session != undefined) {
		// 	res.redirect('/');
		// }
		data.title = 'Login';
		res.render('../views/html/login.html',data);
	}
	

//register
User.prototype.register =  function(req, res) {
	var username  	= req.body.username;
	var password  	= req.body.password;
	// var displayName = req.body.displayName;
	// var email  		= req.body.email;
	console.log(username);
}

User.prototype.viewRegistration =  function(req, res) {
		data.title = 'Registration Form';
		res.render('../views/html/registration.html', data);
	
	}


// login
User.prototype.failed =  function(req, res) {
	res.send('failed to login/register');
}

User.prototype.login = function(req, res){
	var session = req.session.passport;
	var title   = 'Welcome Visitor';
	var content = 'This is the homepage';
	var user_v 	= 'Visitor';
	var choice	= 'Login';
	if (session === undefined) {
		res.render('../views/html/profile.html', {title : title , user : user_v, choice : choice, content : content});
	} else {
		var user  = req.session.passport.user;
		if (user === undefined) {
			res.render('../views/html/profile.html', {title : title , user : user_v , choice : choice, content : content});
		} else {
			res.render('../views/html/profile.html', {title :'Welcome', user : user, choice : 'Logout', content : content});
			console.log("review data:" , user);
		}
		
	} 

}

// logout
User.prototype.logout =  function(req, res) {
	console.log('logging out..');
	req.logout();
	res.redirect('/home');
}


module.exports = new User();