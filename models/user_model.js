//Initializing variables
var mysql      		= require('mysql');
model 				= require('./model');
var UserModel 		= function(){ };
UserModel.prototype = model;

// insert
UserModel.prototype.register = function(data,callback) {

	sql = "INSERT INTO user(emailaddress_sn, password_sn) VALUES (" + mysql.escape(data.username) 
		+ "," + mysql.escape(data.password) + ")";	
	this.execute(sql,callback);
};
//check username
UserModel.prototype.authenticate = function(username, callback) {
	sql = "SELECT * FROM user where emailaddress_sn  = '"+username+"'";
	this.execute(sql, callback);
	console.log(sql);
	};
//exports ContactModel
module.exports = new UserModel();