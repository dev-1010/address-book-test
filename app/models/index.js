'use strict'

const config = require("../config/db.config.js");
const Sequelize = require("sequelize");
/* SETUP POSTGRES CONNECTION */
const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  {
    host: config.HOST,
    dialect: config.dialect,
    operatorsAliases: config.operatorsAliases,

    pool: {
      max: config.pool.max,
      min: config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle
    }
  }
);

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.user = require("../models/user.model.js")(sequelize, Sequelize);

/* SETUP FIREBASE CONNECTION */
const firebase = require('firebase/app');
require('firebase/database');
firebase.initializeApp(config.firebase);
const firebaseDB = firebase.database();

module.exports = { db,firebaseDB };
