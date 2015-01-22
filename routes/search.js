var Spreadsheet = require('edit-google-spreadsheet');
var mongoose = require('mongoose');
var Suggestion = mongoose.model('Suggestion');
var session = require('express-session')
var QA = mongoose.model('QA')

exports.search = function(req,res){
	if (req.body.input === 'admin'){
		Suggestion.find(function(err, suggestion){
			QA.find(function(err, qa){
			res.render('admin',{
				suggestion : suggestion,
				qa : qa
			})
			})
		})
	}else{

		Spreadsheet.load({
			debug: true,
			spreadsheetId: "10S23BxOtkqicM4qkF-MVQ3j94r6UsgmUynae3wlHySQ",
			worksheetId : 'od6',
			//spreadsheetName: 'econ',
			//worksheetName: 'data',
			// Choose from 1 of the 3 authentication methods:
			//    1. Username and Password
				username: 'lulalachen',
				password: 'ntu231465',
				/*
			// OR 2. OAuth
			oauth : {
			  email: 'my-name@google.email.com',
			  keyFile: 'my-private-key.pem'
			},
			// OR 3. Token
			accessToken : {
			  type: 'Bearer',
			  token: 'my-generated-token'
			}
			*/
			}, function sheetReady(err, spreadsheet) {
			    if(err) throw err;
			    console.log(req.body.input)

			    spreadsheet.receive(function(err, rows, info) {
					if(err) throw err;
					var input = req.body.input;
					input = input.toUpperCase();
					console.log('Input: '+input)			
					for (i = 1; i < info.totalRows; i++) {
						if( rows[i][1] === input || rows[i][2] === input ){
							// Search for specific person
							console.log('Hello ' + rows[i][2])
							//console.log(rows)
							res.render('info',{
								student_id 			: rows[i][1],
								name 				: rows[i][2],
								cell 				: rows[i][3],
								email				: rows[i][4],
								
								gradBook 			: rows[i][5],
								gradBookQuantity 	: rows[i][6],	
								gradBookPay			: rows[i][7],
								gradBookTotal		: rows[i][8],
								
								yearBookPhoto		: rows[i][9],
								classBookPhoto		: rows[i][10],
								classBookGroupPhoto	: rows[i][11],
								
								groupShot			: rows[i][12],
								groupShotBuy		: rows[i][13],
								groupShotPay		: rows[i][14],
								groupShotTotal		: rows[i][15],

								groupShotAdd		: rows[i][16],
								groupShotAddPay		: rows[i][17],
								groupShotAddTotal	: rows[i][18],
								
								groupShotEPhoto		: rows[i][19],
								groupShotEPhotoPay	: rows[i][20],
								groupShotEPhotoTotal: rows[i][21],
								
								groupShotPS			: rows[i][22],
								groupTotal			: rows[i][23],
								message : 'Hello' + rows[i][2]
							})
						}else{
							//Nothing keep searching
						}
			  		}
			  		res.render('wrong',{
			  			message : '沒有這個人唷！'+'\n再試試吧～'
			  		})
		    });

	  	});

	}
}



exports.suggestPost = function(req,res,next){
	console.log('suggest Post')
	new Suggestion ({
		name : req.body.name,
		student_id : req.body.student_id,
		subject : req.body.subject,
		contact : req.body.contact,
		comment : req.body.comment
	}).save(function(err,suggest,count){
		if(err) return next(err)

		console.log(suggest.name + "'s suggestion : " + suggest.commment + " Saved!")
		//next()
		res.redirect('/',{
			name : req.body.name
		})
	})
}

exports.admin = function(req,res){
	Suggestion.find(function(err,suggestion){
		QA.
		find().
		sort('que').
		exec(function(err,qa){
			res.render('admin',{
				suggestion : suggestion,
				qa : qa
			})
		})
	})
}
exports.readPost = function(req,res,next){
	Suggestion.findById(req.params.id,function(err,post){
		if(err) next(err)
		if (post.read === false) {
			post.read = true; 
		}else{
			post.read = false;
		}
		console.log(post)
		post.save(function(err,post,count){
			console.log(post+'toggled')
			res.redirect('/admin')
		})
	})
}


exports.qa = function(req,res){
	console.log('Q&A'+ req.body.name)
	QA.
	find().
	sort( 'que' ).
	exec(function(err,qa){	
		res.render('qa',{
			qa : qa,
			name : req.body.name
		})
	})
}

exports.createQA = function(req,res){
	new QA ({
		question : req.body.question,
		answer : req.body.answer,
		que : req.body.que
	}).save(function(err,qa){
		res.redirect('/admin')
	})
}

exports.editQA = function(req,res){
	QA.find(function(err, qa){
		Suggestion.find(function(err,suggestion){
			console.log(req.params.id + " " + qa)
			res.render('editQA',{
				qa : qa,
				suggestion : suggestion,
				current : req.params.id
			})
		})
	})
}

exports.updateQA = function(req,res){
	QA.findById(req.params.id,function(err,qa){
		qa.question = req.body.question
		qa.answer = req.body.answer
		qa.que = req.body.que

		qa.save(function(err,qa){
			res.redirect('/admin')
		})
	})

}

exports.deleteQA = function(req,res){
	QA.findById(req.params.id,function(err,qa){
		console.log(req.params.id)
		console.log(qa)
		qa.remove(function(err,qa){
			res.redirect('/admin')
		})
	})

}


