/*

	File: app.js
	Author: Rich Cherngchaosil

*/


const EXPRESS = require('express');
// const HTTP = require('http');
// const ROUTER = require('./router.js');
const BODY_PARSER = require('body-parser');
const EXPRESSBRUTE = require('express-brute'); 
const FORMIDABLE = require('formidable');


let port = 3000;
let store = new EXPRESSBRUTE.MemoryStore(); // stores state locally, don't use this in production 
let bruteforce = new EXPRESSBRUTE(store, {
	freeRetries: 50,
	lifetime:3600
});


const app = EXPRESS();


/** bodyParser.urlencoded(options)
 * Parses the text as URL encoded data (which is how browsers tend to send form data from regular forms set to POST)
 * and exposes the resulting object (containing the keys and values) on req.body
 */
app.use(
	BODY_PARSER.urlencoded({
		parameterLimit: 100000000,
		limit: '10000kb',
		extended: true,
	})
);


/**bodyParser.json(options)
 * Parses the text as JSON and exposes the resulting object on req.body.
 */
app.use(BODY_PARSER.json());


app.use( (_req, _res, _next) => {
	let message = _req.method + " " + _req.url
	// log('${_req.method} ${_req.url}', _req);
	log('use',message, _req);
	_next();	
});



app.get('/', (_req, _res) => {
	_res.json({ message: 'This is the REST API'});

});


app.post('/compile', bruteforce.prevent, (_req, _res)=>{

	console.log(_req.body);
	/** Handling File Upload **/
	let form = new FORMIDABLE.IncomingForm();
	let language;
	form.encoding = 'utf-8';
	form.uploadDir = "/tmp/"
	form.parse(_req, (err, fields, file) => {
		log('form.parse', "Parsing file", _req);
		language = _req.body.language
		console.log(file.source.name)
		console.log(file.source.path)
		// console.log(_req.body)
		// console.log(language);
	})

	// console.log("Reach")
	// console.log(_req.body);
	// let language = _req.body.language
	_res.send({test:{
		language
	}})
});



let server = app.listen(port, (error)=>{

	if (error === undefined) {
		console.log('=====> app listening on port %d', port);
	}
	else {
		console.log('Server connection error: %s', error);
	}

});


exports.closeServer = function(){
	server.close();
}




function log(_function,_message, _request) {
  // console.log('app: ', _message);
  console.log('app: [%s]: %s', _function, _message);
}