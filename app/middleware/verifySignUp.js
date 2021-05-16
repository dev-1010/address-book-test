const db = require("../models");
const dataBase = db.db;
const User = dataBase.user;
const {  Validator } = require('node-input-validator');

checkDuplicateUsernameOrEmail = async (req, res, next) => {
  const {email, password} = req.body
  const data = {email, password};
  const validate = new Validator(data, {
    email:"required", 
    password:"required"
  });

  let matched = await validate.check();
  if (!matched) {
    return res.status(400).json(validate.errors);
  }

  const user = await User.findOne({ where: { email: req.body.email } });
  if (user) {
      res.status(400).send({
        message: "Failed! Username is already in use!"
      });
      return;
    }
    next();
};



const verifySignUp = {
  checkDuplicateUsernameOrEmail: checkDuplicateUsernameOrEmail  
};

module.exports = verifySignUp;
