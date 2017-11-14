/*

	File: app.js
	Author: Rich Cherngchaosil

*/


const EXPRESS = require('express');
// const HTTP = require('http');
const ROUTER = require('./router.js');
const BODY_PARSER = require('body-parser');

let port = 80;

const app = EXPRESS();

app.use(
	BODY_PARSER.urlencoded({
		parameterLimit: 100000000,
		limit: '10000kb',
		extended: true,
	})
);

// app.use(EXPRESS.static(__dirname));
// app.use(EXPRESS.bodyParser());

ROUTER(app);

// app.get('/', (req, res) => {
// 	res.send('Hello World!');
// });

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