var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var Suggestion =new Schema({
	name : String,
	student_id : String,
	subject : String,
	contact : String,
	comment : String,
	Date : {type:Date,default:Date.now()},
	read : {type:Boolean,default:false}
})

var QA = new Schema({
	question : String,
	answer : String,
	Date : {type:Date,default:Date.now()}
})



var Post = new Schema({
	title : String,
	link : String,
	upvotes : {type:Number, default:0},
	comment : [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }]
})
Post.methods.upvote = function(cb) {
  this.upvotes += 1;
  this.save(cb);
};

var Comment = new Schema({
  body: String,
  author: String,
  upvotes: {type: Number, default: 0},
  post: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' }
})

var Suggestion = mongoose.model('Suggestion',Suggestion);
var QA = mongoose.model('QA',QA);
var Post = mongoose.model('Post',Post);
var Comment = mongoose.model('Comment',Comment);
/*
mongoose.connect('mongodb://localhost/econgrad',function(){
	console.log('Local DB connected')
})
*/
mongoose.connect('mongodb://admin:admin@ds060977.mongolab.com:60977/econgrad',function(){
	console.log("Remote DB connected");
})
