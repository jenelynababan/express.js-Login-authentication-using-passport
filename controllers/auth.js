//all login authentication. local/social
var passport     	  = require('passport'),
	LocalStrategy	  = require('passport-local').Strategy;
var FacebookStrategy  = require('passport-facebook').Strategy;
var GithubStrategy    =  require('passport-github').Strategy;
var InstagramStrategy = require('passport-instagram').Strategy;
var bcrypt 			  = require('bcryptjs');
var model   	 	  = require('../models/user_model');
var connection	      = require('../config/db');
var social		      = require('../models/social_model');

// local authentication
// login
passport.use('login', new LocalStrategy(
	// get values from form
	function(username, password, done) {
		// check if username exist			 
		model.authenticate(username, function(err, rows) {
			var exist = rows.length > 0 ? true : false; 
			if(exist) {
				var user    = rows[0];
				var value = bcrypt.compareSync(password, user.password_sn); //if username and password match
				if(value) {
					return done(null, user);
				}
			} 
			return done(null, false);
		});
	}
));

//register
passport.use('register', new LocalStrategy(
	function(username, password, done) {
		// check if username already exist 
		model.authenticate(username, function(err, rows) {
			var exist = rows.length > 0 ? true : false;
			if (exist) {
            	return done(null, false);
			} else {
				//password hashing
				var salt = bcrypt.genSaltSync(10);
				var hash = bcrypt.hashSync(password, salt); 
				// insert to table
				var user 	  = {};
				user.username = username;
				user.password = hash;
				model.register(user, function(err, rows) {
					done(null, true);
				});
			}
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
}, function(accessToken, refreshToken, profile, done) {
		process.nextTick(function () {
			return done(null, profile);
		});
	}
));
// github authentication
passport.use(new GithubStrategy({
	clientID	 : social.github.clientID,
	clientSecret : social.github.clientSecret,
	callbackURL	 : social.github.callbackURL
}, function(accessToken, refreshToken, profile, done) {
		process.nextTick(function () {
			return done(null, profile);
		});
	}
));
//instagram authentication
passport.use(new InstagramStrategy({
	clientID     : social.instagram.clientID,
	clientSecret : social.instagram.clientSecret,
	callbackURL  : social.instagram.callbackURL
}, function(accessToken, refreshToken, profile, done) {
		process.nextTick(function () {
			return done(null, profile);
		});
	}
));

passport.serializeUser(function(user, done) {
	done(null, user);
	console.log(user);
});

passport.deserializeUser(function(username, done) {
	done(null, {username: username});
});

module.exports = passport;


