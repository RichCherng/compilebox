

let app;
const router = function(_app){
	app = _app;

	app.use( (_req, _res, _next) => {
		let message = _req.method + " " + _req.url
		// log('${_req.method} ${_req.url}', _req);
		log(message, _req);
		_next();	
	});

	app.get('/', (_req, _res) => {
		// res.send('Hello World!');
		_res.json({ message: 'This is the REST API'});

	});

}

module.exports = router




function log(_message, _request) {
  console.log('router: ', _message);
}