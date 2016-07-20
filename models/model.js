var Model = function() {
	db = require('../config/db');
};

//execution
Model.prototype.execute = function(sql,callback) { 	
	console.log('databse establish');

	//query execution
	db.query(sql, function(err,rows) {
		callback(err, rows);
	});

	//checking for database connection release
	db.getConnection(function(err, connection) {
	  console.log('database release');
	  connection.release();
	});
};

//exports new model
module.exports = new Model();
