const { chai, server, should } = require("./testConfiguration");
const UserModel = require("../models/user.model");

/**
 * Test cases to application API's
 * Covered Routes:
 * (1) Login
 * (2) Register
 */

describe("Contact Module", () => {
 	
	// Prepare data for testing
	const testData = {
        "firstName": "Deepak",
        "lastName": "Mishra",
        "phoneNumber": "1212121",
        "address": "testtest"
      };

      const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwiaWF0IjoxNjIxMTU2NjkwLCJleHAiOjE2MjEyNDMwOTB9.WC0pizEVGXG6mVPH0X-nVxuGflQEQCNespMN8FTu7LE'


	/*
	* Test the /POST route
	*/
	describe("/POST Contact without token", () => {
		it("It should send error on invalid or no token sent", (done) => {			
			chai.request(server)
				.post("/api/contact")				 
				.send(testData)
				.end((err, res) => {								
					res.should.have.status(403);
					done();
				});
		});
	});

    /*
	* Test the /GET route
	*/
	describe("/GET contacts", () => {
		it("It should send error on invalid or no token sent", (done) => {			
			chai.request(server)
				.get("/api/contact")				 
				.send(testData)
				.end((err, res) => {								
					res.should.have.status(403);
					done();
				});
		});
	});

    /*
	* Test the /GET route
	*/
	describe("/GET contacts", () => {
		it("It should send error on invalid or no token sent", (done) => {			
			chai.request(server)
				.get("/api/contact")
                .set({ "Authorization": `Bearer ${token}` })				 
				.send(testData)
				.end((err, res) => {								
					res.should.have.status(200);
					done();
				});
		});
	});

    describe("/POST contacts", () => {
		it("It should return success result", (done) => {			
			chai.request(server)
				.get("/api/contact")
                .set({ "Authorization": `Bearer ${token}` })				 
				.send(testData)
				.end((err, res) => {								
					res.should.have.status(200);
					done();
				});
		});
	});

});