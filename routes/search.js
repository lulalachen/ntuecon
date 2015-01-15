var Spreadsheet = require('edit-google-spreadsheet');

exports.search = function(req,res){
	Spreadsheet.load({
		debug: true,
		spreadsheetId: "1v4ro0pdBzmDQGfmu7W7dVEnnrEFWMZi_iSwUlmQ6NAU",
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
					res.render('info',{
						student_id 			: rows[i][1],
						name 				: rows[i][2],
						cell 				: rows[i][3],
						email				: rows[i][4],
						gradBook 			: rows[i][5],
						gradBookQuantity 	: rows[i][6],	
						gradBookPay			: rows[i][7],
						yearBookPhoto		: rows[i][8],
						classBookPhoto		: rows[i][9],
						classBookGroupPhoto	: rows[i][10],
						groupShot			: rows[i][11],
						groupShotBuy		: rows[i][12],
						groupShotPay		: rows[i][13],
						groupShotAdd		: rows[i][14],
						groupShotAddPay		: rows[i][15],
						groupShotEPhoto		: rows[i][16],
						groupShotEPhotoPay	: rows[i][17],
						groupShotPS			: rows[i][18],
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

