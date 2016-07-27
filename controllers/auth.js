//all login authentication. local/social
var passport     	  = require('passport'),
	LocalStrategy	  = require('passport-local').Strategy;
    FacebookStrategy  = require('passport-facebook').Strategy;
    GithubStrategy    = require('passport-github').Strategy;
    InstagramStrategy = require('passport-instagram').Strategy;
    GoogleStrategy 	  = require('passport-google-oauth2').Strategy;
    bcrypt 			  = require('bcryptjs');
    model   	 	  = require('../models/user_model');
    connection	      = require('../config/db');
    social		      = require('../models/social_model');

// local authentication
// login
passport.use('login', new LocalStrategy(
	// get values from form
	function(username, password, done) {
		// check if username exist			 
		model.authenticate(username, function(err, rows) {
			var exist = rows.length > 0 ? true : false; 
			if(exist) {
				var user  = rows[0];
					value = bcrypt.compareSync(password, user.password_sn); //if username and password match
				if(value) {
					return done(null, user);
				}
			} 
			return done(null, false);
		});
	}
));

// social media authentication
// facebook authentication
passport.use(new FacebookStrategy({
    // pull in our app id and secret
    clientID      : social.facebook.clientID,
    clientSecret  : social.facebook.clientSecret,
    callbackURL   : social.facebook.callbackURL,
    profileFields : social.facebook.profileFields
}, function(res,accessToken, refreshToken, profile, done) {
	var username = profile._json.email;
	model.authenticate(username, function(err, rows) { 
		var exist = rows.length > 0 ? true : false; //if email already exist
			if (profile._json.email === undefined) {
				return done(null, false);
			}
			if (exist) {
            	return done(null, profile);
			} else {
				process.nextTick(function () {
					var user = {};
					// getting values
					user.firstname = profile._json.first_name;
					user.lastname  = profile._json.last_name;
					user.username  = profile._json.email;
					user.password  = '';
					//insert social media information to local db
					model.register(user, function(err, rows) {
						return done(null, profile);
					});		
				});
			}
		});
	}
));
//google authentication
passport.use(new GoogleStrategy({
	// pull in our app id and secret
	clientID     : social.google.clientID,
	clientSecret : social.google.clientSecret,
	callbackURL  : social.google.callbackURL
}, function(res, accessToken, refreshToken, profile, done) {
	var age = profile._json.ageRange.max < 18 ? true : false; //check age if valid to login
		if (age) {
			return done(null, false);
		} else {
		var username = profile.email;
		model.authenticate(username, function(err, rows) { 
			var exist = rows.length > 0 ? true : false; //if email already exist
				if (exist) {
	            	return done(null, profile);
				} else {
					process.nextTick(function () {
						var user = {};
						// getting values
						user.firstname = profile.name.givenName;
						user.lastname  = profile.name.familyName;
						user.username  = profile.email;
						user.password  = '';
						//insert social media information to local db
						model.register(user, function(err, rows) {
							return done(null, profile);
						});		
					});
				}
			});
		}
	}
));
// serialize and deserialize
passport.serializeUser(function(user, done) {
	done(null, user);
});

passport.deserializeUser(function(username, done) {
	done(null, {username: username});
});

module.exports = passport;