//Require the dev-dependencies
let chai = require("chai");
let chaiHttp = require("chai-http");
let should = chai.should();
chai.use(chaiHttp);

let server = require('../../server');

module.exports = {
	chai: chai,
	server: server,
	should: should
};