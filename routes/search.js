var mongoose = require('mongoose');
var UserData = mongoose.model('UserData');
var GoogleSpreadsheet = require("google-spreadsheet");


exports.search = function(req,res){
	

	res.render('info',{
		user : req.UserData,
		message : req.UserData
	})

}