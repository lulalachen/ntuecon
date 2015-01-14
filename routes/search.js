var mongoose = require('mongoose');
var UserData = mongoose.model('UserData');

exports.search = function(req,res){

	res.render('info',{
		user : req.UserData,
		message : req.UserData
	})
}