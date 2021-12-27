const express = require("express");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const app = express();
const sequelize = require("./database/sequelize");

app.use(helmet());

//gestion du cors

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.use(bodyParser.json());

sequelize.initDb();

//ici nous placerons les points de terminaison

require("./routes/signup")(app);
require("./routes/login")(app);

module.exports = app;
