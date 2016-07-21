var host = "http://localhost:8080/";
var ids  = {

  facebook: {
    clientID       : '144818812612321',
    clientSecret   : '3e4828da71ce3ec45c6d3f0dc02264ec',
	  callbackURL    : host+'auth/facebook/callback',
    profileFields  : ['id', 'displayName', 'photos', 'emails', 'name', 'birthday']
  },
  github: {
    clientID     : '4feef71d61ffe4fa4f0a',
    clientSecret : 'da0f99b70ca0ebbb1571bc80a5fcfeb74055a347',
    callbackURL  : host+"auth/github/callback"
    },
  instagram: {
    clientID       : '38ea71c7b5374b3fbe1b6bed00f7f403',
    clientSecret   : 'c66af764456b46058d9004f3c42383f4',
    callbackURL    : host+"auth/instagram/callback"
  }  
};

module.exports = ids;