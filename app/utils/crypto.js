'use strict'

const crypto = require('crypto')
const bcrypt = require('bcrypt')

const config = require("../config/auth.config");

module.exports = {

    hashPassword(password) {
        return bcrypt.hash(peperify(password), parseInt(config.saltRounds))
    },
    
    comparePasswords(plaintext, ciphertext) {
       return bcrypt.compare(peperify(plaintext), ciphertext)
    }
}

function peperify(password) {
    return crypto.createHmac('sha1', config.secret)
        .update(password)
        .digest('hex')
}