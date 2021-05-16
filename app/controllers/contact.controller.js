'use strict'

const {	Validator } = require('node-input-validator');
const { firebaseDB } = require("../models");

/**
 * Get all contacts of user
 *
 * @param {id} userId id of the user 
 * @return {Array of Objects<Contacts>}
 */
exports.getAllContacts = (req, res) => {
	// get firebase contacts
	const addressBookCollection = firebaseDB.ref('/contacts');
	addressBookCollection.orderByChild("userId").equalTo(req.userId).limitToFirst(2).on("value", function(snapshot) {
		res.status(200).send({ data:snapshot.val() });
	  }, function (errorObject) {
		res.status(400).send({ error:errorObject.code });
	});
};

/**
 * Save user contacts on firebase
 *
 * @param {String} firstName User first name
 * @param {String} lastName User last name
 * @param {String} phoneNumber User phone number
 * @param {String} address User address
 * @return boolean
 */
exports.addContact = async (req, res) => {
	// store contact on firebase
	const {firstName, lastName, phoneNumber, address} = req.body
	const data = {firstName,lastName,phoneNumber,address};
	const validate = new Validator(data, {
		firstName:"required", 
		lastName:"required", 
		phoneNumber:"required", 
		address:"required",
	});

	const matched = await validate.check();
	if (!matched) {
		return res.status(400).json(validate.errors);
	}

	data['userId'] = req.userId;
	const addressBookCollection = firebaseDB.ref('/contacts');
	//Here Naming format is used, we can use  push() function also that generates a unique key for each new child.
	addressBookCollection.child(`strv-addressbook-${data.lastName.toLowerCase()}-${data.firstName.toLowerCase()}`)
	.set(data, function(error) {
		if(error) {
			res.status(400).send({message: "User Contact could not be saved." + error});
		} else {
			res.status(200).send({message: "User Contact saved successfully."});
		}
	})
  	
};
