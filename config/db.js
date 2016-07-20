var mysql	= 	require('mysql');
var pool 	=  	mysql.createPool({
    connectionLimit : 1000,
    host     : 'localhost',
    user     : 'Priume',
    password : 'Teampriume18!',
    database : 'priume'
});   

 pool.getConnection(function(err, connection) {
    if (err) {
     console.error('Error connecting: ' + err.stack);
        connection.release();
     return;
 }
});
 
module.exports = pool;                 
 // console.log('Connection established');
//exports connection 