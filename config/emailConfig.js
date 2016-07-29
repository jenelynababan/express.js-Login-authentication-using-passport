var host = "http://localhost:8080";
    primaryEmail ='your email';
    password     = 'xxxxxxxx';
    smtpHost     = 'smtp.gmail.com';

var ids  = {

    email : {
        primaryEmail : primaryEmail,
        password     : password
      },   
      
     smtpConfig : {
        host: smtpHost,
        port: 465,
        secure: true, // use SSL
        auth: {
            user: primaryEmail,
            pass: password
        }
    },

    poolConfig : {
        pool: true,
        host: smtpHost,
        port: 465,
        secure: true, // use SSL
        auth: {
            user: primaryEmail,
            pass: password
        }
    },

    directConfig : {
        name: host
    },

};

module.exports = ids;