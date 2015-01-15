var mongoose = require('mongoose');
var UserData = mongoose.model('UserData');
var GoogleSpreadsheet = require("google-spreadsheet");


exports.search = function(req,res){
	var my_sheet = new GoogleSpreadsheet('<spreadsheet key>');

	// without auth -- read only
	// # is worksheet id - IDs start at 1
	my_sheet.getRows( 1, function(err, row_data){
	    console.log( 'pulled in '+row_data.length + ' rows ')
	})

	// set auth to be able to edit/add/delete
	my_sheet.setAuth('<google email/username>','<google pass>', function(err){
	    my_sheet.getInfo( function( err, sheet_info ){
	        console.log( sheet_info.title + ' is loaded' );
	        // use worksheet object if you want to forget about ids
	        sheet_info.worksheets[0].getRows( function( err, rows ){
	            rows[0].colname = 'new val';
	            rows[0].save();
	            rows[0].del();
	        }
	    }

	    // column names are set by google based on the first row of your sheet
	    my_sheet.addRow( 2, { colname: 'col value'} );

	    my_sheet.getRows( 2, {
	        start: 100,            // start index
	        num: 100            // number of rows to pull
	    }, function(err, row_data){
	        // do something...
	    });
	})
	        
	res.render('info',{
		user : req.UserData,
		message : req.UserData
	})

}