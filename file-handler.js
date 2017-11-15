/*
	Handling file upload
*/

const FORMIDABLE = require('formidable');
const PATH = require('path');
const FS = require('fs');

let parse = function(_req){

	console.log("tets");	
	// create an incoming form object
	let form = new FORMIDABLE.IncomingForm();
	
	// store all uploads in the /uploads directory	
	form.uploadDir = PATH.join(__dirname, '/uploads');

	// Include the extensions of the original files
	form.type = true;

	
	form.parse(_req, (err, fields, file) => {

		console.log(_req.body);	
		console.log(file.source.name);
		console.log(file.source.path);

		console.log(file.input.name);
		console.log(file.input.path);
	
		FS.rename(file.source.path, PATH.join(form.uploadDir, file.source.name), (err)=>{
			
			if (err) throw err;
			console.log('renamed completed');
		});
	});

	
}


exports.parse = parse;
