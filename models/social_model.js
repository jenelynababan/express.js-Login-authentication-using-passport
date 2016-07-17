var host = "http://localhost:8080/";
var ids  = {
  facebook: {
	  clientID        : '1026341530748830',
	  clientSecret    : '1e1e2d341568528045a6dd74d66f7d15',
	  callbackURL     : host+'auth/facebook/callback',
    profileFields   : ['id', 'displayName', 'photos', 'email']
  },
  twitter: {
    consumerKey     : 'get_your_own',
    consumerSecret  : 'get_your_own',
    callbackURL     : host+"auth/twitter/callback"
  }
  // github: {
  //   clientID     : 'get_your_own',
  //   clientSecret : 'get_your_own',
  //   callbackURL  : host+"auth/github/callback"
  // },
  // linkedin: {
  //   clientID     : 'get_your_own',
  //   clientSecret : 'get_your_own',
  //   callbackURL  : host+"auth/linkedin/callback"
  // },
};

module.exports = ids;