var Spreadsheet = require('edit-google-spreadsheet');
var mongoose = require('mongoose');


exports.search = function(req,res){
	if (req.body.input === 'admin'){
		res.render('admin')
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
							console.log(rows)
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


var Suggestion =  mongoose.model("Suggestion");
exports.suggest = function(req,res){
	console.log(req.body.name);
	console.log(req.param.name)
	res.render('form',{
		name : req.body.name
	})
}

exports.suggestPost = function(req,res,next){
	new Suggestion ({
		name : req.body.name,
		student_id : req.body.student_id,
		subject : req.body.subject,
		title : req.body.title,
		comment : req.body.comment
	}).save(function(err,suggest,count){
		if(err) return next(err)

		console.log(suggest.name + "'s suggestion : " + suggest.commment + " Saved!")
		res.redirect('/search')
	})
}







