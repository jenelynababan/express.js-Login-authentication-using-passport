var nodemailer = require('nodemailer');
    bcrypt 	   = require('bcryptjs');
function User() {
	data 	  = {};
	tomodel   = {};
	model 	  = require('../models/User_model');
	social	  = require('../models/social_model');
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
		model.Authenticate(username, function(err, rows) {
			var exist = rows.length > 0 ? true : false;//if email exist
				if (exist) {

						var	date = Date.now();
							// Generate code
							str1 	   = date.toString();
							sliceCoode = str1.slice(8);
							genCode    = parseInt(sliceCoode); //to convert string to integer
							//update field
							model.GetCode(genCode, username, function(err, rows) {
								var	user = {};
									user.generatedCode_sn = genCode;
									user.emailaddress_sn  = username;
						});
						//sending code to email
						var primaryEmail = social.email.primaryEmail;
							password 	 = social.email.password;
						
						var smtpConfig = {
						    host: 'smtp.gmail.com',
						    port: 465,
						    secure: true, // use SSL
						    auth: {
						        user: primaryEmail,
						        pass: password
						    }
						};

						var poolConfig = {
						    pool: true,
						    host: 'smtp.gmail.com',
						    port: 465,
						    secure: true, // use SSL
						    auth: {
						        user: primaryEmail,
						        pass: password
						    }
						};

						var directConfig = {
						    name: 'http://localhost:8080/'
						};
					    var transporter = nodemailer.createTransport({
					        service: 'Gmail',
					        auth: {
					            user : primaryEmail, 
					            pass : password
					        }
					    });

						var text = 'Your Generated code is ' + genCode;
							mailOptions = {
							    from 	: primaryEmail,
							    to 		: username,
							    subject : 'Password Reset', 
							    text	: text //, // plaintext body
						    // html: '<b>Hello world ✔</b>' // You can choose to send an HTML body instead
						};

						console.log(genCode);
						transporter.sendMail(mailOptions, function(error, info){
						    if(error){
						        console.log(error);
						        res.json({yo: 'error'});
						    } else {
						    	var title = 'Recover';
						        console.log('Message sent: ' + info.response);
						        res.render('../views/html/recover.html', {title : title, email : username});
						    };
						});
				} else {
					res.send("email doesn't exist");
				}
		});
}
//check if code inputed match
User.prototype.SendCode = function(req, res, next) {
	var code = req.body.generatedCode_sn;
	model.VerifyCode(code, function(err, rows) {
	var exist = rows.length > 0 ? true : false; 
		if(exist) {
				// res.send("code sent");
				console.log('valid code');
		} else {
				res.send("invalid code");
		}
	}); 
};
// Reset password if code inputed matched
User.prototype.ResetPassword = function(req, res) {
	var username = req.body.username;
		password = req.body.password;
		model.Authenticate(username, function(err, rows) { 
			var exist = rows.length > 0 ? true : false; //Selecting email to change pass
			if(exist) {
					// hash password
					var	salt 	 = bcrypt.genSaltSync(10);
						password = bcrypt.hashSync(password, salt); 
				model.ResetPassword(password, username, function(err, rows) { //reset password
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

// failed
User.prototype.Failed = function(req, res) {
	res.send('failed');
}
//success login
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
				console.log(user);
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