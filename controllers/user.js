var nodemailer = require('nodemailer');
    bcrypt 	   = require('bcryptjs');
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
// cheching email if exist
User.prototype.CheckEmail = function(req, res) {
	var username = req.body.username;
		model.authenticate(username, function(err, rows) {
			var exist = rows.length > 0 ? true : false;//if email exist
				if (exist) {
						var	date = Date.now();
							// Generate code
							str1 	= date.toString();
							genCode = str1.slice(8);
							//update field
							model.getCode(genCode, username, function(err, rows) {
								var	user = {};
									user.generatedCode_sn = genCode;
									user.emailaddress_sn  = username;
						});
						var smtpConfig = {
						    host: 'smtp.gmail.com',
						    port: 465,
						    secure: true, // use SSL
						    auth: {
						        user: 'ababanjen@gmail.com',
						        pass: 'nejdagreat121095'
						    }
						};

						var poolConfig = {
						    pool: true,
						    host: 'smtp.gmail.com',
						    port: 465,
						    secure: true, // use SSL
						    auth: {
						        user: 'ababanjen@gmail.com',
						        pass: 'nejdagreat121095'
						    }
						};

						var directConfig = {
						    name: 'http://localhost:8080/'
						};
					    var transporter = nodemailer.createTransport({
					        service: 'Gmail',
					        auth: {
					            user : 'ababanjen@gmail.com', 
					            pass : 'nejdagreat121095'
					        }
					    });
						var text = 'Your Generated code is ' + genCode;

						var mailOptions = {
						    from 	: '<ababanjen@gmail.com>',
						    to 		: username,
						    subject : 'Email Example', 
						    text	: text //, // plaintext body
					    // html: '<b>Hello world ✔</b>' // You can choose to send an HTML body instead
						};
						console.log(genCode);
						transporter.sendMail(mailOptions, function(error, info){
						    if(error){
						        console.log(error);
						        res.json({yo: 'error'});
						    } else {
						        console.log('Message sent: ' + info.response);
						        res.json({yo: info.response});
						    };
						});
				} else {
					res.send("email doesn't exist");
				}
		});
}
//check if match
User.prototype.SendCode = function(req, res, next) {
	var code = req.body.generatedCode_sn;
	model.verifyCode(code, function(err, rows) {
	var exist = rows.length > 0 ? true : false; 
		if(exist) {
				// res.send("code sent");
				console.log('valid code');
		} else {
				res.send("invalid code");
		}
	}); 
};

User.prototype.ResetPassword = function(req, res) {
	var username = req.body.username;
		password = req.body.password;		 
		model.authenticate(username, function(err, rows) {
			var exist = rows.length > 0 ? true : false; 
			if(exist) {
					// hash password
					var	salt = bcrypt.genSaltSync(10);
						password = bcrypt.hashSync(password, salt); 
				model.resetPassword(password, username, function(err, rows) {
						user = {};
						user.password_sn 	 = password;
						user.emailaddress_sn = username;
						res.redirect('/home');
				});
			} else {
				res.send('failed');
			}
			
		});
}

// User.prototype.ViewRegistration =  function(req, res) {
// 	data.title = 'Registration Form';
// 	res.render('../views/html/registration.html', data);
// }

// failed
User.prototype.Failed = function(req, res) {
	res.send('failed');
}
//success
User.prototype.Login = function(req, res){
	var session    = req.session.passport;
		title      = 'Welcome';
		key 	   = {displayName : 'Visitor'};
		unverified = {title : title, user : key, choice : 'Login', link : '/Login' };
	if (session === undefined) {
			res.render('../views/html/profile.html', unverified);
		} else {
			var user = req.session.passport.user;
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