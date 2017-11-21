/*
	File: DockerSandbox.js
*/


/**
	@Constructor
	@variable DockerSandbox
	@description This contructor stores all the arguments needed to prepare and execute a Docker Sandbox
	
*/


let FS = requrie('fs');
let EXEC = require('child_process');




/* Configuration */
const timeout_vale = 20000;



let DockerSandbox = function(){


}


DockerSandbox.prototype.run = function(success){

	let sandbox = this;

	this.prepare(()=>{

		sandbox.execute(success);
	});
}



Docker.Sandbox.prototype.prepare = function(success){


	let sandbox = this;
}
