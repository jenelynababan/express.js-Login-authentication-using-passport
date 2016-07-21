function User() {
	data 	  = {};
	tomodel   = {};
	model 	  = require('../models/User_model');
    passport  = require('./auth');
};
 
User.prototype.constructor = User;

User.prototype.ViewLogin =  function(req, res) {
	data.title  = 'Login';	
	var session = req.session.passport;
	if (session != undefined ) {
		var session = req.session.passport.user;
		if (session === undefined) {
			res.render('../views/html/login.html',data);
		} else {
			res.redirect('/');
		}
	} else {
		res.render('../views/html/login.html',data);
	}
}

User.prototype.ViewRegistration =  function(req, res) {
	data.title = 'Registration Form';
	res.render('../views/html/registration.html', data);
}

// login
User.prototype.Failed =  function(req, res) {
	res.send('failed to login/register');
}

User.prototype.Login = function(req, res){
	var session   	= req.session.passport;
	var title     	= 'Welcome';
	var key 	  	= {displayName : 'Visitor'};
	var unverified	= {title : title, user : key, choice : 'Login', link : '/Login' };
	if (session === undefined) {
			res.render('../views/html/profile.html', unverified);
		} else {
			var user  = req.session.passport.user;
			if (user === undefined) {
				res.render('../views/html/profile.html', unverified);
			} else {
				// social media login
				var dName = user.displayName;
				if (dName != undefined) {
					res.render('../views/html/profile.html', {title : title, user : user, choice : 'Logout', link : '/Logout'});
				} else {
					//local login
					user = {displayName : user.firstname_sn + ' ' + user.lastname_sn}; //overide displayName
					res.render('../views/html/profile.html', {title : title, user : user, choice : 'Logout', link : '/Logout'});
				}
				// console.log("review data:" , user);
			}
		} 
}
// logout
User.prototype.Logout =  function(req, res) {
	console.log('logging out..');
	req.logout();
	res.redirect('/home');
}

module.exports = new User();