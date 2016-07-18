//all login authentication. local/social
var passport     	  = require('passport'),
	LocalStrategy	  = require('passport-local').Strategy;
var FacebookStrategy  = require('passport-facebook').Strategy;
var GithubStrategy    =  require('passport-github').Strategy;
var InstagramStrategy = require('passport-instagram').Strategy;
var model   	 	  = require('../models/user_model');
var connection	      = require('./db');
var social		      = require('../models/social_model');

// local authenticate
// login
passport.use('login', new LocalStrategy(
	// get values from form
	function(username, password, done) {
		var data = { username : username ,
					 password : password };
		// check if username exist			 
		model.authenticate(data, function(err, rows){
			var exist = rows.length > 0 ? true : false; 
			if(exist) {
				var user = rows[0];
				return done(null, user);
				console.log('Username found!');
			} 
			return done(null, false);
		});

	}
));

//register
passport.use('register', new LocalStrategy(
	// get values from form
	function(username, password, done) {
		var data = { username : username ,
					 password : null
					  };
			console.log(data);		  
		// check if username already exist			 
		model.authenticate(data, function(err, rows){
			var exist = rows.length > 0 ? true : false;
			if(exist) {
            	return done(null, false);
			} else{
				// insert to table
				var user = {};
				user.username 	 = username;
				user.password	 = password;
				model.register(user, function(err, rows) {
					done(null, true);
				});
			}

		});
	}
));


// social media authenticate
passport.use(new FacebookStrategy({

    // pull in our app id and secret
    clientID      : social.facebook.clientID,
    clientSecret  : social.facebook.clientSecret,
    callbackURL   : social.facebook.callbackURL,
    profileFields : social.facebook.profileFields,
    enableProof   : true

    },
function(accessToken, refreshToken, profile, done) {
	var user = profile; 
	return done(null, user);
	}
));



passport.use(new GithubStrategy({
  clientID		: social.github.clientID,
  clientSecret	: social.github.clientSecret,
  callbackURL	: social.github.callbackURL
},
function(accessToken, refreshToken, profile, done) {
  process.nextTick(function () {
    return done(null, profile);
  });
}
));


passport.use(new InstagramStrategy({
  clientID     : social.instagram.clientID,
  clientSecret : social.instagram.clientSecret,
  callbackURL  : social.instagram.callbackURL
},
function(accessToken, refreshToken, profile, done) {
  process.nextTick(function () {
    return done(null, profile);
  });
}
));

passport.serializeUser(function(user, done) {
	done(null, user);
	// console.log(user);
});

passport.deserializeUser(function(username, done) {
	done(null, {username: username});
});

module.exports = passport;


