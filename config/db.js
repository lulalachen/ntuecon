var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var Price = new Schema({


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

var Post = mongoose.model('Post',Post);
var Comment = mongoose.model('Comment',Comment);
var Price = mongoose.model('Price',Price);

mongoose.connect('mongod://localhost/econgrad',function(){
	console.log('Local DB connected')
})

/*
mongoose.connect('mongodb://admin:admin@ds060977.mongolab.com:60977/econgrad',function(){
	console.log("Remote DB connected");
})
*/