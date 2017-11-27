


let expect = require('chai').expect;
let server = require('../app');
let request = require('request');



const URL = "http://localhost:3000/"

describe('Server' ,() =>{

	let date_start = Date.now();

	describe("Test Server Up", () =>{

		it("returns status 200", (done) =>{
			request(URL, (error, response, body) =>{
				console.log(response.statusCode);
				expect(response.statusCode).to.equal(200);
				done();
			});
		})

		it("returns default message", (done) =>{
			request(URL, (error, response, body) => {
				// console.log(response.body);
				expect(response.body).to.equal('{"message":"This is the REST API"}');
				// expect(response.statusCode).to.equal(0);
				done();
			});
		})
	})



	// Close the server
	describe("close server", ()=>{
		it('shuts down the test server', ()=>{
			server.closeServer();
			console.log("Test Duration: %s", `${(Date.now() - date_start) / 1000} seconds` )
		})
	}) // End close server

});