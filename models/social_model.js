var host = "http://localhost:8080";
var ids  = {

  facebook: {
    clientID      : 'get your own',
    clientSecret  : 'get your own',
	  callbackURL   : host+'/auth/facebook/callback',
    profileFields : ['id', 'displayName', 'photos', 'email', 'name', 'age_range','birthday']
  },
  google: {
    clientID     : 'get your own',
    clientSecret : 'get your own',
    callbackURL  : host+"/auth/google/callback",
  }
  email : {
    primaryEmail : 'email@mail.com',
    password     : 'xxxxxxxxxxx'
  }      
  
};

module.exports = ids;