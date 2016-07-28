//Initializing variables
var mysql      		= require('mysql');
model 				= require('./model');
var UserModel 		= function(){ };
UserModel.prototype = model;

// inserting data
UserModel.prototype.Register = function(data,callback) {
	sql = "INSERT INTO user(emailaddress_sn, password_sn, firstname_sn, lastname_sn) VALUES (" + mysql.escape(data.username) 
		+ "," + mysql.escape(data.password) + "," + mysql.escape(data.firstname) + "," + mysql.escape(data.lastname) + ")";	
	this.execute(sql,callback);
};
//check username
UserModel.prototype.Authenticate = function(username, callback) {
	sql = "SELECT * FROM user where emailaddress_sn  = '" + username + "'";
	this.execute(sql, callback);
	};
// update code for reseting password	
UserModel.prototype.GetCode = function(genCode, username, callback) {
	sql = "UPDATE user SET generatedCode_sn = " + genCode + " WHERE emailaddress_sn = " + "'" +username + "'" ;	
	this.execute(sql, callback);

};
// verify code if match (reset password)
UserModel.prototype.VerifyCode = function(code, callback) {
	sql = "SELECT * FROM user where generatedCode_sn  = '" + code +"'";
	this.execute(sql, callback);
};
// Creating new password	
UserModel.prototype.ResetPassword = function(password, username, callback) {
	sql = "UPDATE user SET password_sn = " + "'" + password + "'" + " WHERE emailaddress_sn = " + "'" + username + "'";
	this.execute(sql, callback);

};

//exports ContactModel
module.exports = new UserModel();