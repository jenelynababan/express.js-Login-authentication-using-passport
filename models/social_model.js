var host = "http://localhost:8080/";
var ids  = {
  facebook: {
	  clientID       : '1026341530748830',
	  clientSecret   : '1e1e2d341568528045a6dd74d66f7d15',
	  callbackURL    : host+'auth/facebook/callback',
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
  },
};

module.exports = ids;