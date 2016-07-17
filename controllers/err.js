function err() {
	data 	= {};
	tomodel = {};
};
 
err.prototype.constructor = err;

//Function to show if route not existing
err.prototype.viewPageNotFound =  function(req, res) {
	data.message = 'Page Not Found';
	res.render('../views/html/pagenotfound.html',data);
}


//exports err
module.exports = new err();