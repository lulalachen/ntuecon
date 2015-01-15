exports.index = function(req,res){
	res.render('index',{
		message : {}
	});
}

exports.reload = function(req,res){
	res.redirect('/')
}
