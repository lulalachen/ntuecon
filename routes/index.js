exports.index = function(req,res){
	res.render('index',{
		message : {}
	});
}

exports.reload = function(req,res){
	res.redirect('/')
}

exports.comment = function(req,res){

	res.render('comment')

}


var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Post = mongoose.model('Post');
var Comment =mongoose.model('Comment');

router.param('post', function(req, res, next, id) {
  var query = Post.findById(id);
  console.log('router post')
  query.exec(function (err, post){
    if (err) { return next(err); }
    if (!post) { return next(new Error("can't find post")); }

    req.post = post;
    return next();
  });
});


exports.getPosts = function(req,res,next){
	console.log('getPost')
	Post.find(function(err,posts){
		if(err) return next(err)
			console.log('reqre')
		res.json({
			posts : posts
		})
	})
	var test = new Post();
	test.save(function(err,test,count){
		if(err) next(err)
			console.log('test')
	})

}

exports.postPosts = function(req,res,next){
	var newPost	 = new Post({
		title : req.body.title,
		link : req.body.link
	})
	console.log(newPost)
	newPost.save( function(err,posts,count){
		console.log(posts)
		if(err) return next(err);
		console.log("POST posts saved")

		res.json(posts)
	})


}

exports.getPostsId = function(req,res){
	res.json(req.post)
}

exports.putPostsUpvotes = function(req,res,next){
	req.post.upvote(function(err, post){
		if (err) { return next(err); }

		res.json(post);
	  });
}

exports.postComments = function(req,res){
  var comment = new Comment(req.body);
  comment.post = req.post;

  comment.save(function(err, comment){
    if(err){ return next(err); }

    req.post.comments.push(comment);
    req.post.save(function(err, post) {
      if(err){ return next(err); }

      res.json(comment);
    });
  });
}

exports.putCommentsUpvotes = function(req,res){
	req.post.populate('comments', function(err, post) {
	    res.json(post);
	});
}

