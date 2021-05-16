'use strict'
require('dotenv').config();

const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();

const cors = require("cors");
const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');
const { swaggeroptions } = require("./app/config/swagger.config.js");
const swaggerSpec = swaggerJSDoc(swaggeroptions);

var corsOptions = {
  origin: "*"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// database
const { db } = require("./app/models");
db.sequelize.sync();

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to test node application." });
});
// swagger route
app.get('/api/v1/swagger.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));    

//module routes
require('./app/routes/auth.routes')(app);
require('./app/routes/contact.routes')(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

module.exports = app;
