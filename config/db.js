var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var UserData = new Schema({
	school_id : String,
	name : String,
	create_at: {type : Date, default: Date.now}
})


var UserData = mongoose.model('UserData',UserData);
mongoose.connect('mongodb://admin:admin@ds060977.mongolab.com:60977/econgrad',function(req,res){
	console.log('DB connect')
})