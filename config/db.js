var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var UserData = new Schema({
	school_id : String,
	name : String,
	create_at: {type : Date, default: Date.now}
})


var UserData = mongoose.model('UserData',UserData);
mongoose.connect('mongodb://localhost/econ',function(req,res){
	console.log('DB connect')
})