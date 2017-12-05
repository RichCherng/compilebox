
/*
*	Purpose of this test file is to help with the development of the project by running a simple test run such as making sure the server is running and uploading file for compile.
* 	- This test will evolve over time depend on what the development need
*/


let expect = require('chai').expect;
let server = require('../app');
let request = require('request');
let fs = require('fs');


const URL = "http://localhost:3000/"

describe('Server' ,() =>{

	let date_start = Date.now();

	describe("Test Server Up", () =>{

		it("returns status 200", (done) =>{
			request(URL, (error, response, body) =>{
				//console.log(response.statusCode);
				expect(response.statusCode).to.equal(200);
				done();
			});
		})

		it("returns default message for POST", (done) =>{
			request(URL, (error, response, body) => {
				// console.log(response.body);
				expect(response.body).to.equal('{"message":"This is the REST API"}');
				// expect(response.statusCode).to.equal(0);
				done();
			});
		})


		let requestParams
		beforeEach( (done)=> {
			requestParams = {
				url: `${URL}`,
			}
			// done();

			let file = './test/BinarySearch.java';
			fs.stat(file, function(err, stat){
				if(err == null){
					console.log('File Exists');

					requestParams = {
						url: `${URL}`,
					}
				} else {
					console.log("Test File does not exists");
				}
				done();
			});
		});

		it("returns default message", (done) =>{
			request.post(requestParams, (error, response, body) => {
				// console.log(response.body);
				expect(response.body).to.equal('{"message":"This is the REST API"}');
				// expect(response.statusCode).to.equal(0);
				done();
			});
		})
	})

	// Upload file for to compile
	describe('Test Compile', () => {
		describe('Test Java', ()=> {


			let options;
			beforeEach( (done)=>{
				let file = "./test/BinarySearch.java";

				options = {
					method: 'POST',
					url: `${URL}compile/java`,
					headers: {
						'cache-control' : 'no-cache',
						'content-type': 'multipart/form-data'
					},
					formData: {
						source:{
							value: 'fs.createReadStream("BinarySearch.java")',
							options: { filename: 'BinarySearch.java', contentType: null}
						}
					}
				};
				done();
			});
			
			it('upload java file and returns status code 200', (done)=> {
				request(options, (error, response, body) => {
					expect(response.statusCode).to.equal(200);
					done();
				});
			});


			// beforeEach( (done)=>{
			// 	let file = './test/BinarySearch.java';

			// 	fs.stat(file, (err, stat) => {
			// 		if(err == null){
			// 			console.log(file + " exists");
			// 			requestParams = {
			// 				url: `${URL}compile/java`,
			// 				formData: { source: fs.readFileSync(file) },

			// 			};
			// 		} else {
			// 			console.log("Test File does not exists");
			// 		}
			// 		done();
			// 	});
			// });

			// it('upload java file and returns status code 200', (done)=> {

			// 	request.post(requestParams, (error, response, body) => {
			// 		console.log("Check");
			// 		console.log("Test first");
			// 		expect(response.statusCode).to.equal(200);
			// 		done();	
			// 	});
			// });


			// 	// doRequest(requestParams).then( (succ)=>{
			// 	// 	console.log("Test");
			// 	// 	console.log(succ.body);
			// 	// 	expect(succ.res.statusCode).to.equal(200);
			// 		done();
			// 	// });

			// });	
		});

	}); // End upload file



	// Close the server
	describe("close server", ()=>{
		it('shuts down the test server', ()=>{
			server.closeServer();
			console.log("Test Duration: %s", `${(Date.now() - date_start) / 1000} seconds` )
		})
	}) // End close server

});



function doRequest(param){
	console.log("Making Promise");
	return new Promise(function(resolve, reject) {
		console.log("Making Request");
		request.post(param, function(error, res, body) {
			// if(!error && res.statusCode == 200) {
			if(!error){
				console.log("===============================Resolve");
				// console.log(body);
				let success = {
					res,
					body,
				}
				resolve(success);
			} else {
				reject(error);
			}
		})
	})
}