var host = "http://localhost:8080";
var ids  = {

  facebook: {
    clientID      : '144818812612321',
    clientSecret  : '3e4828da71ce3ec45c6d3f0dc02264ec',
	  callbackURL   : host+'/auth/facebook/callback',
    profileFields : ['id', 'displayName', 'photos', 'email', 'name', 'age_range','birthday']
  },
  google: {
    clientID     : '90760352671-mb7uhgj7l0fljaoo0tsq3bvb1713d6p4.apps.googleusercontent.com',
    clientSecret : 'ZYvZzj-V9QQzxGXgCazD6NzT',
    callbackURL  : host+"/auth/google/callback",

  }   
};

module.exports = ids;