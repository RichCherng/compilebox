/*
	Handling file upload
*/

const FORMIDABLE = require('formidable');
const PATH = require('path');
const FS = require('fs');


let FileHandler = function() {
	this.fileName;
}

FileHandler.prototype.parse = function(_req){

	console.log("parse");
}


FileHandler.prototype.parse = function(_req){

	console.log("parse");	

	return new Promise( (resolve, rejct) => {

		// create an incoming form object
		let form = new FORMIDABLE.IncomingForm();

		// store all uploads in the /uploads directory
		form.uploadDir = PATH.join(__dirname, '../uploads');

		// Include the extensions of the original files
		form.type = true;

		// Reference to file-handler object
		let self = this;

		form.parse(_req, (err, fields, file) => {
			
			if(err){
				console.log(err);
				reject(err);
			} else {

				FS.rename(file.source.path, PATH.join(form.uploadDir, file.source.name), (err) => {
					if(err){
						reject(err);
					}else {
						console.log('renamed completed');
						resolve(PATH.join(form.uploadDir, file.source.name));
					}

				})
			}

		})
	});
	
}

// let parse = function(_req){

// 	console.log("parse");	
// 	// create an incoming form object
// 	let form = new FORMIDABLE.IncomingForm();
	
// 	// store all uploads in the /uploads directory	
// 	form.uploadDir = PATH.join(__dirname, '/uploads');

// 	// Include the extensions of the original files
// 	form.type = true;

	
// 	form.parse(_req, (err, fields, file) => {

// 		// console.log(_req.body);	
// 		// console.log(file.language);
// 		console.log(file.source.name);
// 		console.log(file.source.path);

// 		console.log(file.input.name);
// 		console.log(file.input.path);
	
// 		FS.rename(file.source.path, PATH.join(form.uploadDir, file.source.name), (err)=>{
			
// 			if (err) throw err;
// 			console.log('renamed completed');
// 		});
// 	});
	
// }

// exports.parse = parse;


module.exports = FileHandler;

