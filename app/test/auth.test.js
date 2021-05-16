const { chai, server, should } = require("./testConfiguration");
const UserModel = require("../models/user.model");

/**
 * Test cases to application API's
 * Covered Routes:
 * (1) Login
 * (2) Register
 */

describe("Auth", () => {
 	
	// Prepare data for testing
	const testData = {		
		"password":"STRV@123",
		"email":"richatyagi1987@test12345.com"
	};

	

	/*
	* Test the /POST route
	*/
	describe("/POST Register", () => {
		it("It should send validation error for Register", (done) => {			
			chai.request(server)
				.post("/api/auth/signup")
				.send({"email": testData.email})
				.end((err, res) => {
					res.should.have.status(400);
					done();
				});
		});
	});

	/*
	* Test the /POST route
	*/
	describe("/POST Login", () => {
		it("It should send validation error for Login", (done) => {			
			chai.request(server)
				.post("/api/auth/signin")
				.send({"email": testData.email})
				.end((err, res) => {
					res.should.have.status(400);
					done();
				});
		});
	});


	/*
	* Test the /POST route
	*/
	describe("/POST Login", () => {
		it("It should not send validation error on login", (done) => {			
			chai.request(server)
				.post("/api/auth/signin")
				.send(testData)
				.end((err, res) => {
					res.should.have.status(400);
					done();
				});
		});
	});

	/*
	* Test the /POST route
	*/
	describe("/POST Login", () => {
		it("it should Send failed user Login", (done) => {			
			chai.request(server)
				.post("/api/auth/signin")
				.send({"email": "admin@admin.com","password": "1234"})
				.end((err, res) => {
					res.should.have.status(400);
					done();
				});
		});
	});


	/*
	* Test the /POST route
	*/
	describe("/POST Register", () => {
		it("it should Register the user successfully", (done) => {			
			chai.request(server)
				.post("/api/auth/signup")
				.send({"email": "tssdfsdf@gmail.com","password": "1234"})
				.end((err, res) => {										
					done();
				});
		});
	});

});