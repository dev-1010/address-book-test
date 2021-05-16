'use strict'

const { db }= require("../models");
const config = require("../config/auth.config");
const User = db.user;
const {  Validator } = require('node-input-validator');

const jwt = require("jsonwebtoken");
const crypto = require('../utils/crypto')


/**
 * Register user on application
 *
 * @param {String} email User email
 * @param {password} email User email
 * @return true or false
 */
exports.signup = async (req, res) => {

  const {email, password} = req.body;

  const data = {email, password};

  const validate = new Validator(data, {
    email:"required", 
    password:"required"
  });

  const matched = await validate.check();
  if (!matched) {
    return res.status(400).json(validate.errors);
  }
  // Save User to Database
  User.create({    
    email: req.body.email.toLowerCase(),
    password: await crypto.hashPassword(req.body.password),
  }).then(user => {
    if (user) {
      createAuthResponse(user, 'User registered successfully!').then(userresponse => {
        res.status(201).send(userresponse);
      }).catch(err => {
        console.log(err)
        res.status(400).send({ message: err.message || "Error! While registering user!" });
      });
    } else {
      res.status(400).send({ message: "Error! While registering user!" });
    }
  }).catch(err => {
    console.log(err)
    res.status(400).send({ message: err.message || "Error! While registering user!" });
  });

};

/**
 * Signin user on application
 *
 * @param {String} email User email
 * @param {password} email User email
 * @return {userId, email, token}
 */
exports.signin = async (req, res) => {
  const {email, password} = req.body;

  const data = {email, password};

  const validate = new Validator(data, {
    email:"required", 
    password:"required"
  });

  const matched = await validate.check();
  if (!matched) {
    return res.status(400).json(validate.errors);
  }

  const user = await User.findOne({ where: { email: req.body.email.toLowerCase() } });
  
  if (!user) {
    return res.status(400).send({ message: "User Not found." });
  }

  const verified = await crypto.comparePasswords(req.body.password, user.password)


  if (!verified) {
    return res.status(400).send({
      message: "Invalid login credentials!"
    });
  }

  createAuthResponse(user, 'User logged-in successfully!').then(userresponse => {
    res.status(200).send(userresponse);
  }).catch(err => {
    console.log(err)
    res.status(400).send({ message: err.message || "Error! While registering user!" });
  });

};

/**
 * Method created to manage the common response for login and signup
 *
 * @param {Object} user Object of user
 * @param {string} responseMessage message that will given in response
 * @return {userId, email, token}
 */
async function createAuthResponse(user, responseMessage) {
  const token = await jwt.sign({ id: user.id }, config.secret, {
    expiresIn: 86400 // 24 hours
  });

  return {
    id: user.id,          
    email: user.email,          
    tokenType:"Bearer",
    accessToken: token,
    message: responseMessage,
  };
}

